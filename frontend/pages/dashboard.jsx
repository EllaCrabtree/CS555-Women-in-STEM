import { useEffect } from "react";
import Router from "next/router";
import Image from "next/image";

import { useAuth } from "@contexts/authUserContext";
import styles from "@styles/Dashboard.module.css";

export default function Dashboard() {
    // Check if the user isn't logged in
    // If the user isn't logged in, redirect to the home page
    const auth = useAuth();
    useEffect(() => {
        if (!auth.authUser) {
            Router.push("/");
        }
    }, [auth]);

    return (
        <main className={styles.main}>
            <p>
                Welcome to the Amaterasu Dashboard. There is nothing here yet.
            </p>
            <button onClick={() => auth.signOut()}>Sign out</button>
        </main>
    );
}
