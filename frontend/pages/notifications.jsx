import { useEffect } from "react";
import Router from "next/router";

import { useAuth } from "@contexts/authUserContext";
import Header from "@components/Header";
import Footer from "@components/Footer";

const Notifications = () => {
    return (
        <div className="whitePageWrapper">
            <Header type="header" />
            <main className="content">
                <h1>All Notifications</h1>
                <div>No notifications available.</div>
            </main>
            <Footer type="footer" />
        </div>
    );
};

export default Notifications;
