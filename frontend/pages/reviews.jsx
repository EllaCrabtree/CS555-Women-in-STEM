import { useEffect, useState } from "react";
import Router from "next/router";
import { Rating } from "react-simple-star-rating";

import { useAuth } from "@contexts/authUserContext";
import Header from "@components/Header";
import Footer from "@components/Footer";

const Reviews = () => {
    const [review, setReview] = useState({
        review: "",
        rating: 0,
    });
    const [loading, setLoading] = useState(true);
    const auth = useAuth();

    useEffect(() => {
        setLoading(auth.loading);
        if (auth.loading) return;

        if (!auth.authUser) {
            Router.push("/login");
        }
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
                <div>Please leave a review and rating for us here:</div>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        console.log(review);
                    }}
                >
                    <label htmlFor="review">Review:</label>
                    <Rating
                        onClick={(rating) => {
                            setReview({
                                ...review,
                                rating: rating,
                            });
                        }}
                    />
                    <br />
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
