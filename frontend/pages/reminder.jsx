import React, { useEffect, useState } from "react";
import Router from "next/router";
import {
    collection,
    getDocs,
    addDoc,
    or,
    where,
    query,
} from "firebase/firestore";

import { useAuth } from "@contexts/authUserContext";
import { db } from "@libs/firebase.mjs";
import Header from "@components/Header";
import Footer from "@components/Footer";

const Reminder = () => {
    const [projectID, setProjectID] = useState();
    const [projectOptions, setProjectOptions] = useState([]);
    const [taskOptions, setTaskOptions] = useState([]);
    const [reminder, setReminder] = useState({
        ProjectID: "",
        TaskID: "",
        Title: "",
        Due_Date: new Date().toISOString(),
        Creation_Date: new Date().toISOString(),
    });

    const auth = useAuth();
    useEffect(() => {
        if (!auth.authUser) {
            return;
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

    useEffect(() => {
        if (!projectID) {
            return;
        }

        async function getTasks(uuid) {
            try {
                const q = query(
                    collection(db, "Tasks"),
                    or(where("ProjectID", "==", uuid))
                );
                const querySnapshot = await getDocs(q);
                let dataArray = [];

                querySnapshot.forEach((doc) => {
                    dataArray.push(doc.data());
                });
                setTaskOptions(dataArray);
                setReminder({ ...reminder, TaskID: dataArray[0].TaskID });
            } catch (error) {
                console.error(error);
            }
        }
        getTasks(projectID);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [projectID]);

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
                    onSubmit={async (e) => {
                        e.preventDefault();
                        setReminder({
                            ...reminder,
                            Creation_Date: new Date().toISOString(),
                        });

                        if (
                            reminder.ProjectID === "" ||
                            reminder.TaskID === ""
                        ) {
                            alert("Please select a project and task");
                            return;
                        }

                        try {
                            await addDoc(collection(db, "Reminders"), reminder);
                            Router.push("/dashboard");
                        } catch (error) {
                            console.error("Error adding document: ", error);
                        }
                    }}
                >
                    <label htmlFor="ProjectID">Project</label>
                    <select
                        name="ProjectID"
                        id="ProjectID"
                        required
                        defaultValue="none"
                        onChange={(e) => {
                            setReminder({
                                ...reminder,
                                ProjectID: e.target.value,
                            });
                            setProjectID(e.target.value);
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
                    <label htmlFor="TaskID">Task</label>
                    <select
                        name="TaskID"
                        id="TaskID"
                        required
                        value={reminder.TaskID}
                        onChange={(e) =>
                            setReminder({
                                ...reminder,
                                TaskID: e.target.value,
                            })
                        }
                    >
                        {taskOptions.map((task) => (
                            <option key={task.TaskID} value={task.TaskID}>
                                {task.Title}
                            </option>
                        ))}
                    </select>
                    <label htmlFor="Title">Reminder Name</label>
                    <input
                        type="text"
                        name="Title"
                        id="Title"
                        required
                        onChange={(e) =>
                            setReminder({
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
                        required
                        min={new Date().toISOString().split("T")[0]}
                        onChange={(e) => {
                            setReminder({
                                ...reminder,
                                Due_Date: e.target.value,
                            });
                        }}
                    />
                    <button
                        style={{
                            marginTop: "1rem",
                        }}
                        type="submit"
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
