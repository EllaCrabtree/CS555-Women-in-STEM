import { useEffect, useState } from "react";
import { query, collection, where, getDocs, or } from "firebase/firestore";

import { db } from "@libs/firebase.mjs";
import { useAuth } from "@contexts/authUserContext";
import Header from "@components/Header";
import Footer from "@components/Footer";

const Notifications = () => {
    const [reminders, setReminders] = useState([]);

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
                return dataArray;
            } catch (error) {
                console.error(error);
                return [];
            }
        }

        async function getReminders(uuid) {
            try {
                const q = query(
                    collection(db, "Reminders"),
                    where("ProjectID", "==", uuid)
                );
                const querySnapshot = await getDocs(q);
                let dataArray = [];

                querySnapshot.forEach((doc) => {
                    dataArray.push(doc.data());
                });
                return dataArray;
            } catch (error) {
                console.error(error);
                return [];
            }
        }

        getProjects(auth.authUser.uid).then((projects) => {
            if (projects.length === 0) {
                setReminders([]);
                return;
            }

            projects.forEach(async (project) => {
                setReminders([
                    ...reminders,
                    ...(await getReminders(project.ProjectID).then(
                        (reminders) => {
                            return reminders;
                        }
                    )),
                ]);
            });
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [auth]);

    useEffect(() => {
        console.log(reminders);
    }, [reminders]);

    return (
        <div className="whitePageWrapper">
            <Header type="header" />
            <main className="content">
                <h1>All Notifications</h1>
                {reminders.length === 0 && (
                    <div>No notifications available.</div>
                )}
                {reminders &&
                    reminders.map((reminder) => (
                        <div
                            key={reminder.ReminderID}
                            style={{
                                border: "1px solid lightgray",
                                padding: "1rem",
                                marginTop: "0.5rem",
                                marginBottom: "0.5rem",
                                borderRadius: "1rem",
                            }}
                        >
                            <div>{reminder.Title}</div>
                            <div>{reminder.ProjectID}</div>
                            <div>{reminder.Description}</div>
                            <div>{reminder.Due_Date}</div>
                        </div>
                    ))}
            </main>
            <Footer type="footer" />
        </div>
    );
};

export default Notifications;
