import React, { useState } from "react";
import { useAuth } from "@context/authUserContext";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { signInWithEmailAndPassword } = useAuth();

    const onSubmit = (event) => {
        signInWithEmailAndPassword(email, password).then(() => {
            router.push("/dashboard");
        });
        event.preventDefault();
    };

    return (
        <div>
            <h1 class="login-title">Login to Amaterasu</h1>
            <h1 class="login-desc">Enter your email and password below</h1>
            <h3 class="t-op">EMAIL</h3>
            <div class="email-input">
                <input
                    type="email"
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="Email Address"
                />
            </div>
            <h3 class="t-op">PASSWORD</h3>
            <div class="password-input">
                <input
                    type="password"
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Password"
                />
            </div>
            <button class="login" onClick={onSubmit()}>
                Login
            </button>
            <h3 class="signup-desc">Don&apos;t have an account?</h3>
            <h3 class="signup">Sign up</h3>
        </div>
    );
}
