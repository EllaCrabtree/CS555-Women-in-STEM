import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useAuth } from "@contexts/authUserContext";
import { initializeApp } from "firebase/app";
import Header from "@components/Header";
import Footer from "@components/Footer";
import styles from "@styles/ProjectIndex.module.css"
import { Card, Text, Link, Row, Button } from "@nextui-org/react";


import {
    getFirestore,
    collection,
    addDoc,
    setDoc,
    getDocs,
    query,
    where,
    or,
    doc,
    updateDoc
  } from "firebase/firestore";

const Task = () => {
    const router = useRouter();
    const { projectId, taskId } = router.query;

    const [taskData, setTaskData] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [db, setDB] = useState();
    const [userData, setUserData] = useState();
    const [isCompleted, setIsCompleted] = useState();
    const [imageData, setImageData] = useState();
    const [imageError, setImageError] = useState(false)

    // const [completedSubtasks, setCompletedSubtasks] = useState();
    // const [notCompletedSubtasks, setNonCompletedSubtasks] = useState();

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

              // taskInfo.isCompleted = taskDataArray[0].Completion_Status

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

              const q4 = query(
                collection(db, "Images"),
                where("ProjectID", "==", projectId),
                where("TaskID", "==", taskId)
              );
              const querySnapshot4 = await getDocs(q4);
    
              let imageArray = [];
              querySnapshot4.forEach((doc) => {
                imageArray.push(doc.data());
              });
    
              taskInfo.images = imageArray;
    
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
              console.log('i got here')
              getData(auth.authUser.uid);
            } else {
              setLoading(false);
            }
          } catch (e) {
            console.log(e);
          }
        }
      }, [auth, taskData]);


      const BuildImageList = (image) => {
        return(<img src={image.Base64URL} alt="KikiMonster" />)
      }

      const completeSubtask = async (subtaskID) => {
        
        let tempData = {};
        tempData.Task_name = taskData.Task_name
        tempData.Task_ID = taskData.Task_ID
        tempData.DueDate = taskData.DueDate
        tempData.CompletionDate = taskData.CompletionDate
        tempData.Project_Name = taskData.Project_Name
        tempData.ProjectID = taskData.ProjectID
        tempData.images = taskData.images
        tempData.SubTasks = []
        
        let allCompleted = true;

        for (let i = 0; i < taskData.SubTasks.length; i++) {
          tempData.SubTasks.push(taskData.SubTasks[i])
          // console.log(tempData.SubTasks[i].SubTaskID)

          if (tempData.SubTasks[i].SubTaskID == subtaskID) {
            tempData.SubTasks[i].Completion_Status = (tempData.SubTasks[i].Completion_Status - 1) * -1;

            const ref = doc(db, "Subtasks", subtaskID);
            await updateDoc(ref, {
              Completion_Status: tempData.SubTasks[i].Completion_Status
            })
          }

          if (tempData.SubTasks[i].Completion_Status == 0) {
            allCompleted = false;
          }
        }

        if (taskData.isCompleted == "Not Completed" && allCompleted) {
          tempData.isCompleted = "Completed!";
          const task_ref = doc(db, "Tasks", tempData.Task_ID);
            await updateDoc(task_ref, {
              Completion_Status: 1
          })
        } else if (taskData.isCompleted == "Completed!" && !allCompleted) {
          tempData.isCompleted = "Not Completed";
          const task_ref = doc(db, "Tasks", tempData.Task_ID);
            await updateDoc(task_ref, {
              Completion_Status: 0
          })
        } else {
          tempData.isCompleted = taskData.isCompleted
        }

        setTaskData(tempData)
      }

      const handleImageChange = (img) => {
        console.log(img.target.files[0])
        setImageError(false)
        const reader = new FileReader();
        reader.readAsDataURL(img.target.files[0]);
    
        reader.onloadend = () => {
            // console.log('hi')
            // console.log(reader.result)
            setImageData({'img': reader.result});
        }
      }
    
      const UploadImage = async () => {
        
        const image = {
          ProjectID: projectId,
          TaskID: taskId,
          Base64URL: imageData.img
        }
    
        try {
          let imageResult = await addDoc(collection(db, "Images"), image);
          console.log(imageResult)
        } catch (e) {
          // console.log(e)
          setImageError(true)
        }
      }
    
 

      const BuildSubTaskCard = (subtask) => {

        let buttonText = null
        if (subtask.Completion_Status == 0) {
          buttonText = "Check Subtask"
        } else {
          buttonText = "Uncheck Subtask"
        }

        return (
          <li key={subtask.SubTaskID}>
            {/* <Link href={`/project/${projectId}/task/${subtask.SubTaskID}`}> */}
              <Card variant="bordered">
                <Card.Header>
                  <Text> {subtask.Title} </Text>
                </Card.Header>
                <Card.Divider />
                <Card.Body>
                  <Text> {subtask.Description} </Text>
                </Card.Body>
                <Card.Divider />
                <Card.Footer>
                  <Row>
                    <Button onPress={async (e) => {
                      // console.log(subtask.SubTaskID)
                      await completeSubtask(subtask.SubTaskID);
                    }}>
                      {buttonText}
                    </Button>
                  </Row>
                </Card.Footer>
              </Card>
            {/* </Link> */}
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

        const imageElements = taskData.images.map((img) => {
          return BuildImageList(img);
        })

        let imageErrorContent =null
        if (imageError) {
          imageErrorContent = <p> Please upload a smaller photo </p>
        }
        
        let imageContent = null
        if (imageElements.length == 0) {
          imageContent = "No Images for this Task"
        } else {
          imageContent = <ul> {imageElements} </ul>
        }
      
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
                <p className={styles.projectSubinfo}>Status: {taskData.isCompleted}</p>
                {/* <p className={styles.projectSubinfo}>
                  Stage Start Date: 1/01/2023 | Project Start Date: 1/01/2023
                </p> */}
                <Link href={`/project/${projectId}`}>Go Back to Project </Link>
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
                    Photos: {imageElements.length}
                  </p>
                  <div className={styles.boxtabArrowContainer}>
                    <img
                      className="boxtab-arrow"
                      src="/chevron_left.png"
                      alt="boxtab-arrow"
                    />
                  </div>
                </div>
              {imageContent}
              <label>
                    Choose a photo to upload
                </label>
                <input 
                    onChange={(e) => handleImageChange(e)}
                    type="file" 
                    id="img" 
                    name="img" 
                    accept="image/*"
                    encType="multipart/form-data" />
                
                <button onClick={UploadImage}>Upload Image</button>
                {imageErrorContent}
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
