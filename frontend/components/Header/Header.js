import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getDoc, doc, collection, setDoc } from "firebase/firestore";
import { db } from "@libs/firebase";

import { useAuth } from "@contexts/authUserContext";
import styles from "./Header.module.css";

export default function Auth({ type }) {
    const [user, setUser] = useState(null);
    const auth = useAuth();

    useEffect(() => {
        if (!auth.authUser) {
            return;
        }

        const getUser = async () => {
            // Get doc with an internal id of auth.authUser.uid
            const userDoc = await getDoc(
                doc(collection(db, "Users"), auth.authUser.uid)
            );
            if (!userDoc.exists()) {
                const defaultUserDoc = {
                    email: auth.authUser.email,
                    firstName: "",
                    lastName: "",
                    userType: "",
                };
                await setDoc(
                    doc(db, "Users", auth.authUser.uid),
                    defaultUserDoc
                );
                setUser(defaultUserDoc);
            } else {
                setUser(userDoc.data());
            }
        };
        getUser();
    }, [auth.authUser]);

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className={styles.headerBar}>
            <div className={styles.idContainer}>
                <img
                    src="/defProfilePic.png"
                    className={styles.profilePic}
                    alt="profilepic"
                />
                <div className={styles.idInfo}>
                    <h2 id={styles.idInfoName}>{user.firstName}</h2>
                    {user.userType && (
                        <h4 id={styles.idInfoRole}>{user.userType}</h4>
                    )}
                </div>
            </div>
            <Link href="/notifications">
                <img
                    src="/notification.png"
                    className={styles.notificationPic}
                    alt="notifpic"
                />
            </Link>
        </div>
    );
}
