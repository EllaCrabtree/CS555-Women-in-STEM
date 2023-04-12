import { useAuth } from "@contexts/authUserContext";
import React, {useEffect, useState} from "react";
import { useRouter } from "next/router";

import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc ,setDoc, getDocs, query, where, or} from "firebase/firestore";

const Project = () => {
    const router = useRouter();
    const { projectId } = router.query;

    const [projectData, setProjectData] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [db, setDB] = useState();


    const auth = useAuth();

    useEffect(() => {

        setLoading(true);
        const app = initializeApp({
            apiKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY,
            authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
            projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
        });
        setDB(getFirestore(app))

        if (auth.authUser) {  
            async function getData() {
                try {
                    const q = query(collection(db, 'Projects'), 
                        where("ProjectID", "==", projectId)
                    )
                    const querySnapshot = await getDocs(q);
                    let dataArray = []

                    querySnapshot.forEach((doc) => {
                        dataArray.push(doc.data())
                    })
                    setProjectData(dataArray[0])
                } catch (error) {
                    console.log(error)
                }
            }
            
            try {
                if (!projectData) {
                    getData();
                } else {
                    setLoading(false);
                }
            } catch (e) {
             console.log(e)   
            }
        }
    }, [auth, projectData])

    if (error) {
        return(<h1> Error Ocurred </h1>)
    } else if (loading) {
        return(<h1> Loading... </h1>)
    } else if (projectData) {
        return(
            <main className="content-container">
                <h1 id="project-name"> {projectData.Project_Name} </h1>
                <p>ID: {projectData.ProjectID}</p>
                <h2> This project is {Math.round((Number(projectData.Current_Stage) /Number(projectData.NumberOfStages))*100)}% done!!! </h2>
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
    }   
};

export default Project;
