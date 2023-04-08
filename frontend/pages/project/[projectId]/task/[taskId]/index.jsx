import React from "react";
import { useRouter } from "next/router";

const Task = () => {
    const router = useRouter();
    const { projectId, taskId } = router.query;

    return (
        <main className="content-container">
            <div className="searchbar">
                <img src="/search.png" alt="searchpic" />
                <input type="text" placeholder="Search for Tasks..." />
            </div>
            <h1>All Tasks</h1>
            <p>Project ID: {projectId}</p>
            <p>Task ID: {taskId}</p>
            <div>No tasks available.</div>
        </main>
    );
};

export default Task;
