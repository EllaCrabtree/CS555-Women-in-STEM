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

    return (
        <div className="main-body">
            <h1 className="login-title">
                {type === "login" ? "Login to" : "Sign up for"} Amaterasu
            </h1>
            <h2 className="login-desc">Enter your email and password below</h2>
            {error && <p className="error">{error}</p>}
            <p className="t-op">Email</p>
            <div className="input-div">
                <input
                    type="email"
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="Email Address"
                />
            </div>
            <p className="t-op">Password</p>
            <div className="input-div">
                <input
                    type="password"
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Password"
                />
            </div>
            <button
                className="login"
                onClick={() => {
                    onSubmit();
                }}
            >
                {type === "login" ? "Login" : "Sign up"}
            </button>
            <div id="signup-container">
                {type === "login" ? (
                    <>
                        <p className="signup-desc">
                            Don&apos;t have an account?
                        </p>
                        <Link className="signup" href="/signup">
                            Sign up
                        </Link>
                    </>
                ) : (
                    <>
                        <p className="signup-desc">Already have an account?</p>
                        <Link className="signup" href="/login">
                            Login
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
}
