import { useEffect } from "react";
import Router from "next/router";
// import { Image } from "next/image";

import { useAuth } from "@contexts/authUserContext";
import Header from "@components/Header";
import Footer from "@components/Footer";

const People = () => {
    return (
        <div className="whitePageWrapper">
            <Header type="header" />
            <main className="content">
                <div class="searchbar">
                    <img src="/search.png" alt="searchpic" />
                    <input type="text" placeholder="Search people..." />
                </div>
                <h1>All People</h1>
                <div>No people available.</div>
            </main>
            <Footer type="footer" />
        </div>
    );
};

export default People;
