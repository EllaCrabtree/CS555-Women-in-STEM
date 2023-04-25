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

                <div>Please leave a review and rating for us here:</div>

                <input name="reviewText" required="true" />

                <p></p>

                <label><input type="radio" name="starRating" value="rating1" /> 1 </label>
                <label><input type="radio" name="starRating" value="rating2" /> 2 </label>
                <label><input type="radio" name="starRating" value="rating3" /> 3 </label>
                <label><input type="radio" name="starRating" value="rating4" /> 4 </label>
                <label><input type="radio" name="starRating" value="rating5" /> 5 </label>
            </main>
            <Footer type="footer" />
        </div>
    );
};

export default Reviews;