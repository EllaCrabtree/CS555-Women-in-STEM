import React from "react";

const People = () => {
    return (
        <main className="content-container">
            <div className="searchbar">
                <img src="/search.png" alt="searchpic" />
                <input type="text" placeholder="Search for People..." />
            </div>
            <h1>People</h1>
            <div>No people available.</div>
        </main>
    );
};

export default People;
