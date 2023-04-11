import React, { useState } from "react";
import Link from "next/link";
import Router from "next/router";
import { useEffect } from "react";
import { useRouter } from "next/router";

import { useAuth } from "@contexts/authUserContext";
import styles from "./Auth.module.css";

export default function Auth({ type }) {
    const { signInWithEmailAndPassword, createUserWithEmailAndPassword } =
        useAuth();
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    // Check if the user is logged in
    // If the user is logged in, redirect to the dashboard
    const auth = useAuth();
    useEffect(() => {
        if (auth.authUser) {
            Router.push("/dashboard");
        }
    }, [auth]);

    const onSubmit = (event) => {
        switch (type) {
            case "login":
                signInWithEmailAndPassword(email, password)
                    .then(() => {
                        router.push("/dashboard");
                    })
                    .catch((error) => {
                        switch (error.message) {
                            case "Firebase: Error (auth/invalid-email).":
                                setError("ERROR: Invalid email");
                                break;
                            case "Firebase: Error (auth/internal-error).":
                                setError(
                                    "ERROR: Something's wrong with your credentials. Please try again."
                                );
                                break;
                            case "Firebase: Error (auth/wrong-password).":
                                setError("ERROR: Incorrect password");
                                break;
                            case "Firebase: Error (auth/user-not-found).":
                                setError("ERROR: User not found");
                                break;
                            case "Firebase: Error (auth/user-disabled).":
                                setError(
                                    "ERROR: This account has been disabled. Please contact server admin."
                                );
                                break;
                            case "Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests).":
                                setError(
                                    "ERROR: Too many failed attempts. Account has been disabled. Please contact server admin."
                                );
                                break;
                            default:
                                setError(error.message);
                        }
                    });
                break;
            case "signup":
                createUserWithEmailAndPassword(email, password)
                    .then(() => {
                        router.push("/dashboard");
                    })
                    .catch((error) => {
                        setError(error);
                    });
                break;
        }

        if (event) event.preventDefault();
    };

    const onEnter = (event) => {
        if (event.key === "Enter") {
            // Trigger the button element with a click
            onSubmit();
        }
    };

    return (
        <div className={styles.authWrapper}>
            <div className={styles.mainHeader}>
                <img id={styles.logo} src="/logo.png" alt="Amaterasu Logo" />
                <h1 className={styles.applicationName}>Amaterasu</h1>
            </div>
            <div className={styles.mainBody}>
                <h1 className={styles.loginTitle}>
                    {type === "login" ? "Login to" : "Sign up for"} Amaterasu
                </h1>
                <h2 className={styles.loginDesc}>
                    Enter your email and password below
                </h2>
                {error && <p className={styles.error}>{error}</p>}
                <p className={styles.tOp}>Email</p>
                <div className={styles.inputDiv}>
                    <input
                        type="email"
                        onChange={(event) => setEmail(event.target.value)}
                        onKeyDown={(e) => {
                            onEnter(e);
                        }}
                        placeholder="Email Address"
                    />
                </div>
                <p className={styles.tOp}>Password</p>
                <div className={styles.inputDiv}>
                    <input
                        type="password"
                        onChange={(event) => setPassword(event.target.value)}
                        onKeyDown={(e) => {
                            onEnter(e);
                        }}
                        placeholder="Password"
                    />
                </div>
                <button
                    className={styles.login}
                    onClick={() => {
                        onSubmit();
                    }}
                >
                    {type === "login" ? "Login" : "Sign up"}
                </button>
                <div id={styles.signupContainer}>
                    {type === "login" ? (
                        <>
                            <p className={styles.signupDesc}>
                                Don&apos;t have an account?
                            </p>
                            <Link className={styles.signup} href="/signup">
                                Sign up
                            </Link>
                        </>
                    ) : (
                        <>
                            <p className={styles.signupDesc}>
                                Already have an account?
                            </p>
                            <Link className={styles.signup} href="/login">
                                Login
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
