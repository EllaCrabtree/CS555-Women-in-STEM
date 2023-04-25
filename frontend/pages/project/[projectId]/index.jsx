import { useAuth } from "@contexts/authUserContext";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Card, Text, Link } from "@nextui-org/react";
import Header from "@components/Header";
import Footer from "@components/Footer";
import { initializeApp } from "firebase/app";
import styles from "@styles/ProjectIndex.module.css"
import {
  getFirestore,
  collection,
  addDoc,
  setDoc,
  getDocs,
  query,
  where,
  or,
} from "firebase/firestore";

const Project = () => {
  const router = useRouter();
  const { projectId } = router.query;

  const [projectData, setProjectData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [db, setDB] = useState();
  const [userData, setUserData] = useState();

  const auth = useAuth();

  useEffect(() => {
    setLoading(true);
    const app = initializeApp({
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    });
    setDB(getFirestore(app));

    if (auth.authUser) {
      async function getData(uuid) {
        try {
          console.log(uuid);
          //Refactor -> set user type to a token and check to establish permissions
          const userQuery = query(
            collection(db, "Users"),
            where("UserUUID", "==", uuid)
          );
          const querySnapshot_user = await getDocs(userQuery);
          let queryResult = [];
          querySnapshot_user.forEach((doc) => {
            queryResult.push(doc.data());
          });

          setUserData(queryResult[0]);

          const q1 = query(
            collection(db, "Projects"),
            where("ProjectID", "==", projectId)
          );
          const querySnapshot1 = await getDocs(q1);
          let dataArray = [];

          querySnapshot1.forEach((doc) => {
            dataArray.push(doc.data());
          });

          let project = {
            NumberOfStages: dataArray[0].NumberOfStages,
            Project_Name: dataArray[0].Project_Name,
            ProjectID: dataArray[0].ProjectID,
            Description: dataArray[0].Description,
            Current_Stage: dataArray[0].Current_Stage,
          };

          // console.log(dataArray[0].Tasks)
          const q2 = query(
            collection(db, "Tasks"),
            where("TaskID", "in", dataArray[0].Tasks)
          );

          const querySnapshot2 = await getDocs(q2);
          let taskDataArray = [];
          querySnapshot2.forEach((doc) => {
            taskDataArray.push(doc.data());
          });

          project.Tasks = taskDataArray;

          const q3 = query(
            collection(db, "Users"),
            where("UserUUID", "==", dataArray[0].OwnerID)
          );

          const querySnapshot3 = await getDocs(q3);
          let tempPeopleArray = [];
          querySnapshot3.forEach((doc) => {
            tempPeopleArray.push(doc.data());
          });

          project.ProjectOwner = {
            first_name: tempPeopleArray[0].first_name,
            last_name: tempPeopleArray[0].last_name,
          };

          // console.log(project)

          // console.log(taskDataArray)

          setProjectData(project);
        } catch (error) {
          console.log(error);
        }
      }

      try {
        if (!projectData) {
          getData(auth.authUser.uid);
        } else {
          setLoading(false);
        }
      } catch (e) {
        console.log(e);
      }
    }
  }, [auth, projectData]);

  const BuildTaskCard = (task) => {
    return (
      <li key={task.TaskID}>
        <Link href={`/project/${projectId}/task/${task.TaskID}`}>
          <Card isPressable isHoverable variant="bordered">
            <Card.Header>
              <Text> {task.Title} </Text>
            </Card.Header>
            <Card.Body>
              <Text> {task.Description} </Text>
            </Card.Body>
          </Card>
        </Link>
      </li>
    );
  };

  if (error) {
    return <h1> Error Ocurred </h1>;
  } else if (loading) {
    return <h1> Loading... </h1>;
  } else if (projectData) {
    const taskElements = projectData.Tasks.map((task) => {
      return BuildTaskCard(task);
    });

    let taskContent = null;
    if (taskElements.length == 0) {
      taskContent = "No tasks available.";
    } else {
      taskContent = <ul className = {styles.taskContent}> {taskElements} </ul>;
    }

    return (
      <div className="whitePageWrapper">
        <Header type="header" />
        <main className="content">
          <h1 className={styles.projectName}> {projectData.Project_Name} </h1>
          <p className = {styles.projectId}>ID: {projectData.ProjectID}</p>
          <h2 className = {styles.projectProgress}>
            {" "}
            This project is{" "}
            {Math.round(
              (Number(projectData.Current_Stage) /
                Number(projectData.NumberOfStages)) *
                100
            )}
            % done!!!{" "}
          </h2>
          <h2 className={styles.projectMainName} id="project-manager-name">
            Manager: Default Manager Name
          </h2>
          <h2 className={styles.projectMainName} id="project-client-name">
            Client: {projectData.ProjectOwner.first_name}{" "}
            {projectData.ProjectOwner.last_name}
          </h2>
          <p className={styles.projectSubinfo}>Status: Default Status</p>
          <p className={styles.projectSubinfo}>
            Stage Start Date: 1/01/2023 | Project Start Date: 1/01/2023
          </p>
          <h1>Tasks</h1>
          <div className="tasklist" id="activetasklist">
            {taskContent}
          </div>
          <h1>Completed Tasks</h1>
          <div className="tasklist" id="completedtasklist">
            No completed tasks available.
          </div>
          <div className={styles.boxtabContainer} id="photos-container">
            <img
              className={styles.boxtabIcon}
              id="photos-icon"
              src="/photos.png"
              alt="photos-icon"
            />
            <p className={styles.boxtabLabel} id="photoslabel">
              Photos: 0
            </p>
            <div className={styles.boxtabArrowContainer}>
              <img
                className="boxtab-arrow"
                src="/chevron_left.png"
                alt="boxtab-arrow"
              />
            </div>
          </div>
          <div className={styles.boxtabContainer} id="membercount-container">
            <img
              className={styles.boxtabIcon}
              id="membercount-icon"
              src="/people.png"
              alt="membercount-icon"
            />
            <p className={styles.boxtabLabel} id="membercount">
              People: 0
            </p>
            <div className={styles.boxtabArrowContainer}>
              <img
                className="boxtab-arrow"
                src="/chevron_left.png"
                alt="boxtab-arrow"
              />
            </div>
          </div>
        </main>
        <Footer type="footer" />
      </div>
    );
  }
};

export default Project;
