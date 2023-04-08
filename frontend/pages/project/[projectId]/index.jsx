import React from "react";
import { useRouter } from "next/router";

const Project = () => {
    const router = useRouter();
    const { projectId } = router.query;

    return (
        <main className="content-container">
            <h1 id="project-name">Default Project Name</h1>
            <p>ID: {projectId}</p>
            <h2 className="project-main-name" id="project-manager-name">
                Manager: Default Manager Name
            </h2>
            <h2 className="project-main-name" id="project-client-name">
                Client: Default Client Name
            </h2>
            <p className="project-subinfo">Status: Default Status</p>
            <p className="project-subinfo">
                Stage Start Date: 1/01/2023 | Project Start Date: 1/01/2023
            </p>
            <h1>Tasks</h1>
            <div className="tasklist" id="activetasklist">
                No tasks available.
            </div>
            <h1>Completed Tasks</h1>
            <div className="tasklist" id="completedtasklist">
                No completed tasks available.
            </div>
            <div className="boxtab-container" id="photos-container">
                <img
                    className="boxtab-icon"
                    id="photos-icon"
                    src="/photos.png"
                    alt="photos-icon"
                />
                <p className="boxtab-label" id="photoslabel">
                    Photos: 0
                </p>
                <div className="boxtab-arrow-container">
                    <img
                        className="boxtab-arrow"
                        src="/chevron_left.png"
                        alt="boxtab-arrow"
                    />
                </div>
            </div>
            <div className="boxtab-container" id="membercount-container">
                <img
                    className="boxtab-icon"
                    id="membercount-icon"
                    src="/people.png"
                    alt="membercount-icon"
                />
                <p className="boxtab-label" id="membercount">
                    People: 0
                </p>
                <div className="boxtab-arrow-container">
                    <img
                        className="boxtab-arrow"
                        src="/chevron_left.png"
                        alt="boxtab-arrow"
                    />
                </div>
            </div>
        </main>
    );
};

export default Project;
