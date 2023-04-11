import { useEffect } from "react";
import Router from "next/router";
// import { Image } from "next/image";

import { useAuth } from "@contexts/authUserContext";
import Header from "@components/Header";
import Footer from "@components/Footer";
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
        <div className="whitePageWrapper">
            <Header type="header" />
            <main className="content">
                <div class="searchbar">
                    <img src="/search.png" alt="searchpic" />
                    <input type="text" placeholder="Search for Projects..." />
                </div>
                <h1>All Projects</h1>
                <div>No projects available.</div>
            </main>
            <Footer type="footer" />
        </div>
    );
}
