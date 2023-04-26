import { useEffect, useState } from "react";
import Router from "next/router";
import {
    query,
    or,
    where,
    collection,
    getDocs,
    addDoc,
} from "firebase/firestore";
import { Rating } from "react-simple-star-rating";

import { db } from "@libs/firebase.mjs";
import { useAuth } from "@contexts/authUserContext";
import Header from "@components/Header";
import Footer from "@components/Footer";

const Reviews = () => {
    const [review, setReview] = useState({
        projectID: "",
        review: "",
        rating: 0,
        created_at: new Date().toISOString(),
    });
    const [projectOptions, setProjectOptions] = useState([]);
    const [loading, setLoading] = useState(true);
    const auth = useAuth();

    useEffect(() => {
        setLoading(auth.loading);
        if (auth.loading) return;

        if (!auth.authUser) {
            Router.push("/login");
        }

        async function getProjects(uuid) {
            try {
                const q = query(
                    collection(db, "Projects"),
                    or(
                        where("OwnerID", "==", uuid),
                        where("Sales_Team", "array-contains", uuid),
                        where("Construction_Team", "array-contains", uuid)
                    )
                );
                const querySnapshot = await getDocs(q);
                let dataArray = [];

                querySnapshot.forEach((doc) => {
                    dataArray.push(doc.data());
                });
                setProjectOptions(dataArray);
            } catch (error) {
                console.error(error);
            }
        }

        getProjects(auth.authUser.uid);
    }, [auth]);

    if (loading) {
        return (
            <div className="whitePageWrapper">
                <Header type="header" />
                <main className="content">
                    <h1>Reviews</h1>
                    <div>Loading...</div>
                </main>
                <Footer type="footer" />
            </div>
        );
    }

    return (
        <div className="whitePageWrapper">
            <Header type="header" />
            <main className="content">
                <h1>Reviews</h1>
                <div>Please leave a review and rating for us here.</div>
                <br />
                <form
                    onSubmit={async (e) => {
                        e.preventDefault();
                        if (review.projectID === "" || review.review === "") {
                            alert("Please fill out all fields.");
                            return;
                        }

                        try {
                            await addDoc(collection(db, "Reviews"), review);
                            Router.push("/dashboard");
                        } catch (error) {
                            console.error("Error adding document: ", error);
                        }
                    }}
                >
                    <label htmlFor="ProjectID">Project:</label>
                    <br />
                    <select
                        name="ProjectID"
                        id="ProjectID"
                        required
                        defaultValue="none"
                        onChange={(e) => {
                            setReview({
                                ...review,
                                projectID: e.target.value,
                            });
                        }}
                    >
                        <option disabled value="none">
                            Select a project
                        </option>
                        {projectOptions.map((project) => (
                            <option
                                key={project.ProjectID}
                                value={project.ProjectID}
                            >
                                {project.Project_Name}
                            </option>
                        ))}
                    </select>
                    <Rating
                        onClick={(rating) => {
                            setReview({
                                ...review,
                                rating: rating,
                            });
                        }}
                    />
                    <br />
                    <label htmlFor="review">Review:</label>
                    <textarea
                        id="review"
                        name="review"
                        rows="4"
                        cols="30"
                        value={review.review}
                        onChange={(e) => {
                            setReview({
                                ...review,
                                review: e.target.value,
                            });
                        }}
                    ></textarea>
                    <br />
                    <input
                        style={{
                            marginTop: "0.5rem",
                        }}
                        type="submit"
                        value="Submit"
                    />
                </form>
            </main>
            <Footer type="footer" />
        </div>
    );
};

export default Reviews;
