import { useEffect, useState } from "react";
import Router from "next/router";

import { useAuth } from "@contexts/authUserContext";
import Header from "@components/Header";
import Footer from "@components/Footer";

const Reviews = () => {
    return (
        <div className="whitePageWrapper">
            <Header type="header" />
            <main className="content">
                <h1>Reviews</h1>

                <div>Please leave a review for us here:</div>
            </main>
            <Footer type="footer" />
        </div>
    );
};

export default Reviews;