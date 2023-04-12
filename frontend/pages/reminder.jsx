import React, { useEffect, useState } from "react";
import { useAuth } from "@contexts/authUserContext";
import { doc, collection, getDoc, setDoc } from "firebase/firestore";
import { db } from "@libs/firebase.mjs";
import Header from "@components/Header";
import Footer from "@components/Footer";
import styles from "@styles/Form.module.css";

const Reminder = () => {
    const [user, setUser] = useState(null);
    const [dateString, setDateString] = useState(null);
    let reminder;

    // Check if the user isn't logged in
    // If the user isn't logged in, redirect to the home page
    const auth = useAuth();
    useEffect(() => {
        if (!auth.authUser) {
            return;
        }
    }, [auth]);

    useEffect(() => {
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        if (month < 10) month = `0${month}`;
        let day = date.getDate();
        setDateString(`${year}-${month}-${day}`);
        console.log(`DateString: ${dateString}`);
    }, []);

    reminder = {
        ProjectID: "Select a project",
        TaskID: "Select a task",
        Title: "",
        Due_Date: dateString,
        Creation_Date: dateString,
    };

    return (
        <div className="whitePageWrapper">
            <Header type="header" />
            <main className="content">
                <h1>Make A Reminder</h1>
                <form
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.5rem",
                    }}
                >
                    <label htmlFor="ProjectID">Project</label>
                    <select
                        name="ProjectID"
                        id="ProjectID"
                        onChange={(e) =>
                            (reminder = {
                                ...reminder,
                                ProjectID: e.target.value,
                            })
                        }
                    >
                        <option value="">Select a task</option>
                    </select>
                    <label htmlFor="TaskID">Task</label>
                    <select
                        name="TaskID"
                        id="TaskID"
                        onChange={(e) =>
                            (reminder = {
                                ...reminder,
                                TaskID: e.target.value,
                            })
                        }
                    >
                        <option value="">Select a project</option>
                    </select>
                    <label htmlFor="Title">Reminder Name</label>
                    <input
                        type="text"
                        name="Title"
                        id="Title"
                        onChange={(e) =>
                            (reminder = {
                                ...reminder,
                                Title: e.target.value,
                            })
                        }
                    />
                    <label htmlFor="Due_Date">Date to Remind</label>
                    <input
                        type="date"
                        id="Due_Date"
                        name="Due_Date"
                        value={dateString}
                        min={dateString}
                        max="2023-12-31"
                        onChange={(e) =>
                            (reminder = {
                                ...reminder,
                                Due_Date: e.target.value,
                            })
                        }
                    />
                    <button
                        style={{
                            marginTop: "1rem",
                        }}
                        type="submit"
                        onClick={async (e) => {
                            e.preventDefault();
                            console.log(reminder);
                            // await setDoc(doc(db, "Users", auth.authUser.uid), {
                            //     ...user,
                            // });
                        }}
                    >
                        Create Reminder
                    </button>
                </form>
            </main>
            <Footer type="footer" />
        </div>
    );
};

export default Reminder;
