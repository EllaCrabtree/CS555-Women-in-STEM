import React, { useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@context/authUserContext";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { signInWithEmailAndPassword } = useAuth();
    const router = useRouter();

    const onSubmit = (event) => {
        signInWithEmailAndPassword(email, password).then(() => {
            router.push("/dashboard");
        });

        if (event) event.preventDefault();
    };

    return (
        <div>
            <h1 className="login-title">Login to Amaterasu</h1>
            <h1 className="login-desc">Enter your email and password below</h1>
            <h3 className="t-op">EMAIL</h3>
            <div className="email-input">
                <input
                    type="email"
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="Email Address"
                />
            </div>
            <h3 className="t-op">PASSWORD</h3>
            <div className="password-input">
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
                Login
            </button>
            <h3 className="signup-desc">Don&apos;t have an account?</h3>
            <h3 className="signup">Sign up</h3>
        </div>
    );
}
