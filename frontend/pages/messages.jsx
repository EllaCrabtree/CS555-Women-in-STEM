import { useEffect } from "react";
import Router from "next/router";
// import { Image } from "next/image";

import { useAuth } from "@contexts/authUserContext";
import Header from "@components/Header";
import Footer from "@components/Footer";

const Messages = () => {
    return (
        <div className="whitePageWrapper">
            <Header type="header" />
            <main className="content">
                <div className="searchbar">
                    <img src="/search.png" alt="searchpic" />
                    <input type="text" placeholder="Search messages..." />
                </div>
                <h1>All Messages</h1>
                <div>No messages available.</div>
            </main>
            <Footer type="footer" />
        </div>
    );
};

export default Messages;
