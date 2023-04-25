import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useAuth } from "@contexts/authUserContext";
import { initializeApp } from "firebase/app";
import Header from "@components/Header";
import Footer from "@components/Footer";
import styles from "@styles/ProjectIndex.module.css"
import { Card, Text, Link } from "@nextui-org/react";


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

const Task = () => {
    const router = useRouter();
    const { projectId, taskId } = router.query;


    const [taskData, setTaskData] = useState();
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
    
              let taskInfo = {
                // NumberOfStages: dataArray[0].NumberOfStages,
                Project_Name: dataArray[0].Project_Name,
                ProjectID: dataArray[0].ProjectID
                // Description: dataArray[0].Description,
                // Current_Stage: dataArray[0].Current_Stage,
              };
    
              // console.log(dataArray[0].Tasks)
              const q2 = query(
                collection(db, "Tasks"),
                where("TaskID", "==", taskId)
              );
    
              const querySnapshot2 = await getDocs(q2);
              let taskDataArray = [];
              querySnapshot2.forEach((doc) => {
                taskDataArray.push(doc.data());
              });
    
              taskInfo.Task_name = taskDataArray[0].Title
              taskInfo.Task_ID = taskDataArray[0].TaskID
              taskInfo.DueDate = taskDataArray[0].Due_Date
              taskInfo.CompletionDate = taskDataArray[0].Completion_Date

              if (taskDataArray[0].Completion_Status == 0) {
                taskInfo.isCompleted = "Not Completed"
              } else {
                taskInfo.isCompleted = "Completed!"
              }

            //   taskInfo.isCompleted = taskDataArray[0].Completion_Status

            //   project.Tasks = taskDataArray;
    
              const q3 = query(
                collection(db, "Subtasks"),
                where("SubTaskID", "in", taskDataArray[0].SubTasks)
              );
    
              const querySnapshot3 = await getDocs(q3);
              let subtaskArray = [];
              querySnapshot3.forEach((doc) => {
                subtaskArray.push(doc.data());
              });

              taskInfo.SubTasks = subtaskArray;
    
            //   project.ProjectOwner = {
            //     first_name: tempPeopleArray[0].first_name,
            //     last_name: tempPeopleArray[0].last_name,
            //   };
    
              // console.log(project)
    
              // console.log(taskDataArray)
    
              setTaskData(taskInfo);
              console.log(taskInfo)
            } catch (error) {
              console.log(error);
            }
          }
    
          try {
            if (!taskData) {
              getData(auth.authUser.uid);
            } else {
              setLoading(false);
            }
          } catch (e) {
            console.log(e);
          }
        }
      }, [auth, taskData]);

      const BuildSubTaskCard = (subtask) => {
        return (
          <li key={subtask.SubTaskID}>
            <Link href={`/project/${projectId}/task/${subtask.SubTaskID}`}>
              <Card isPressable isHoverable variant="bordered">
                <Card.Header>
                  <Text> {subtask.Title} </Text>
                </Card.Header>
                <Card.Body>
                  <Text> {subtask.Description} </Text>
                </Card.Body>
              </Card>
            </Link>
          </li>
        );
      };

      if (error) {

      } else if (loading) {
        return (<h1> Loading ... </h1>)
      } else if (taskData) {


        const subtaskElements_NotCompleted = taskData.SubTasks.filter(subtask => subtask.Completion_Status == 0).map((subtask) => {
            return BuildSubTaskCard(subtask);
        });

        const subtaskElements_Completed = taskData.SubTasks.filter(subtask => subtask.Completion_Status == 1).map((subtask) => {
            return BuildSubTaskCard(subtask);
        });
      
          let subtaskContent = null;
          if (subtaskElements_NotCompleted.length == 0) {
            subtaskContent = "No subtasks available to complete.";
          } else {
            subtaskContent = <ul className = {styles.taskContent}> {subtaskElements_NotCompleted} </ul>;
          }

          let completedSubtaskContent = null;
          if (subtaskElements_Completed.length == 0) {
            completedSubtaskContent = "No subtasks completed.";
          } else {
            completedSubtaskContent = <ul className = {styles.taskContent}> {subtaskElements_Completed} </ul>;
          }


        return (
            <div className="whitePageWrapper">
              <Header type="header" />
              <main className="content">
                <h1 className={styles.projectName}> {taskData.Task_name} </h1>
                <p className = {styles.projectId}>ID: {taskData.Task_ID}</p>
                {/* <h2 className = {styles.projectProgress}>
                  {" "}
                  This project is{" "}
                  {Math.round(
                    (Number(projectData.Current_Stage) /
                      Number(projectData.NumberOfStages)) *
                      100
                  )}
                  % done!!!{" "}
                </h2> */}
                {/* <h2 className={styles.projectMainName} id="project-manager-name">
                  Manager: Default Manager Name
                </h2>
                <h2 className={styles.projectMainName} id="project-client-name">
                  Client: {projectData.ProjectOwner.first_name}{" "}
                  {projectData.ProjectOwner.last_name}
                </h2> */}
                <p className={styles.projectSubinfo}>Status: {taskData.isCompleted}</p>
                {/* <p className={styles.projectSubinfo}>
                  Stage Start Date: 1/01/2023 | Project Start Date: 1/01/2023
                </p> */}
                <h1>Subtasks</h1>
                <div className="tasklist" id="activetasklist">
                  {subtaskContent}
                </div>
                <h1>Completed Subtasks</h1>
                <div className="tasklist" id="completedtasklist">
                  {completedSubtaskContent}
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

export default Task;
