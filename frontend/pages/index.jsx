import Head from "next/head";
import { useEffect } from "react";
import Router from "next/router";
import Link from "next/link";
import { useAuth } from "@contexts/authUserContext";

import styles from "@styles/Home.module.css";

export default function Home() {
    // Check if the user is logged in
    // If the user is logged in, redirect to the dashboard
    const auth = useAuth();
    useEffect(() => {
        if (auth.authUser) {
            Router.push("/dashboard");
        }
    }, [auth]);

    return (
        <>
            <Head>
                <title>Amaterasu</title>
                <meta name="description" content="For a solar future." />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={styles.main}>
                <p>Welcome to Amaterasu, a solar energy management platform.</p>
                <div>
                    <button>
                        <Link href="/login">Login</Link>
                    </button>
                    <button>
                        <Link href="/signup">Signup</Link>
                    </button>
                </div>
            </main>
        </>
    );
}
