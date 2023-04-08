import React from "react";

const Messages = () => {
    return (
        <main className="content-container">
            <div className="searchbar">
                <img src="/search.png" alt="searchpic" />
                <input type="text" placeholder="Search for Conversations..." />
            </div>
            <h1>All Messages</h1>
            <div>No messages available.</div>
        </main>
    );
};

export default Messages;
