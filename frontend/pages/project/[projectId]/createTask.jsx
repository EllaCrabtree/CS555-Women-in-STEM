/*import { useEffect, useState } from "react";
import {Router, useRouter} from "next/router";
import { useAuth } from "@contexts/authUserContext";
import { doc, collection, getDoc, setDoc } from "firebase/firestore";
import { Card, Text, Link } from "@nextui-org/react";
import { db } from "@libs/firebase.mjs";
import Header from "@components/Header";
import Footer from "@components/Footer";
import styles from "@styles/createProject.module.css";

export default function Createtask() {
  // Check if the user isn't logged in
  // If the user isn't logged in, redirect to the home page
  const router = useRouter();
  const { data } = router.query;
  const projectId = data;
  const auth = useAuth();
  const [user, setUser] = useState(null);
  let form;
  useEffect(() => {
    if (!auth.authUser) {
      return;
    }

    // Get the user's profile
    const getUser = async () => {
      // Get doc with an internal id of auth.authUser.uid
      const userDoc = await getDoc(
        doc(collection(db, "Users"), auth.authUser.uid)
      );
      if (!userDoc.exists()) {
        const defaultUserDoc = {
          email: auth.authUser.email,
          firstName: "",
          lastName: "",
          userType: "",
        };
        await setDoc(doc(db, "Users", auth.authUser.uid), defaultUserDoc);
        setUser(defaultUserDoc);
      } else {
        setUser(userDoc.data());
      }
    };
    getUser();
  }, [auth]);

  const getForm = () => {
    if (user.userType !== "Operations")
      return (
        <>
          <h1>You can&apos;t create a task.</h1>
          <p>Contact an operations manager.</p>
        </>
      );
    else
      return (
        <>
          <h1>Create Project</h1>
          <form className={styles.createProjectForm}>
            <label htmlFor="taskName">Task Name</label>
            <input type="text" name="taskName" id="taskName" />
            <label htmlFor="taskDescription">Task Description</label>
            <input type="text" name="taskDescription" id="taskDescription"/>
            <button
              style={{
                marginTop: "1rem",
              }}
              type="submit"
              onClick={async (e) => {
                e.preventDefault();
                console.log(user);
                //const taskName = document.getElementById('taskName').value;
                //const taskDescription = document.getElementById('taskDescription').value;
                const projectId="wrhtw";//test purposes
                const taskName="TestTast";//test purposes
                const taskDescription="Does this work?"; //purposes
                try {
                    let data,task,project ;   
                    data = await getDoc(
                        doc(collection(db, "Projects",projectId))
                      );
                    tasks=data.Tasks;
                    numberofStages=data.NumberOfStages;
                    task = await setDoc(doc(db,"Tasks","TestTask"), {
                        Title:taskName,
                        Description:taskDescription,
                        Completion_Status:0    
                      })               
                    project = await updateDoc(doc(db, "Projects",projectId), {
                    NumberOfStages:numberofStages+1,
                    Tasks:tasks.push(taskName)
                    
                  })
                  console.log(data);
                  console.log(task);
                  console.log(project);
                  window.alert("Project Created Successfully")
                  setTimeout(()=>{},10000);
                  Router.push("/project/"+projectId);
                } catch (error) {
                  throw `Project failed to add to database! Message: ${error}`
                }
              }}
            >
              Submit
            </button>
          </form>
        </>
      );
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  form = getForm();

  return (
    <div className="whitePageWrapper">
      <Header type="header" />
      <div className="content">{form}</div>
      <Footer type="footer" />
    </div>
  );
}*/

import { useAuth } from "@contexts/authUserContext";
import React, { useEffect, useState } from "react";
import { Router, useRouter } from "next/router";
import { Card, Text, Link } from "@nextui-org/react";
import Header from "@components/Header";
import Footer from "@components/Footer";
import { initializeApp } from "firebase/app";
import styles from "@styles/ProjectIndex.module.css"
import {
  doc,
  getFirestore,
  collection,
  addDoc,
  setDoc,
  getDocs,
  updateDoc,
  query,
  where,
  or,
} from "firebase/firestore";

import { db } from "@libs/firebase.mjs";
function getCurrentDate() {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0"); // add 1 because months are indexed from 0
  const year = today.getFullYear();

  const currentDate = `${day}-${month}-${year}`;
  return currentDate;
}

const CreateTask = () => {
  const router = useRouter();
  const { projectId } = router.query;
  const [projectData, setProjectData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [userData, setUserData] = useState();
  const [addTask, setAddTask] = useState();
  const [user, setUser] = useState(null);
  let form;
  const auth = useAuth();

  useEffect(() => {
    setLoading(true);

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
          console.log(queryResult[0]);
          console.log(projectId);
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
          // console.log("1"+NumberOfStages);
          // console.log("2"+Project_Name);

          // console.log(dataArray[0].Tasks)
          let q2;
          try {
            q2 = query(
              collection(db, "Tasks"),
              where("TaskID", "in", dataArray[0].Tasks)
            )
          } catch (e) {
            console.log("no tasks found")
          }


          let querySnapshot2;
          let taskDataArray = [];
          try {
            querySnapshot2 = await getDocs(q2);
            querySnapshot2.forEach((doc) => {
              taskDataArray.push(doc.data());
            });
          }
          catch (e) {
            console.log("no tasks found cont.")
          }


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

      if (!projectData) {
        getData(auth.authUser.uid)
      } else {
        setLoading(false)
        console.log('hello')
      }
    }
  }, [auth, projectData, addTask]);
  if (error) {
    return <h1> Error Ocurred </h1>;
  } else if (loading) {
    return <h1> Loading... </h1>;
  } else if (projectData) {
    const getForm = () => {
      return (
        <>
          <h1>Create Project</h1>
          <form className={styles.createProjectForm}>
            <label htmlFor="taskName">Task Name</label>
            <input type="text" name="taskName" id="taskName" />
            <label htmlFor="taskDescription">Task Description</label>
            <input type="text" name="taskDescription" id="taskDescription" />
            <label htmlFor="dueDate">Due Date</label>
            <input type="text" name="dueDate" id="dueDate" />
            <button
              style={{
                marginTop: "1rem",
              }}
              type="submit"
              onClick={async (e) => {
                e.preventDefault();
                const taskName = document.getElementById('taskName').value;
                const taskDescription = document.getElementById('taskDescription').value;
                const dueDate = document.getElementById("dueDate").value;
                //const projectId="wrhtw";//test purposes
                //const taskName="TestTast";//test purposes
                //const taskDescription="Does this work?"; //purposes
                try {
                  let task, project;

                  task = await addDoc(collection(db, "Tasks"), {
                    Title: taskName,
                    Description: taskDescription,
                    Completion_Status: 0,
                    Completion_Date: "N/A",
                    creationDate: getCurrentDate(),
                    dueDate: dueDate
                  })
                  const findTaskID = query(
                    collection(db, "Tasks"),
                    where("Description", "==", taskDescription)
                  );
                  const querySnapshot_taskId = await getDocs(findTaskID);
                  let queryResult_ID = [];
                  let newTaskID = null
                  querySnapshot_taskId.forEach((docID) => {
                    newTaskID = docID.id
                    queryResult_ID.push(docID.data());
                  });
                  console.log(queryResult_ID[0])
                  console.log(projectData.Tasks);
                  const ref = doc(db, "Projects", projectId)
                  let newTasks = projectData.Tasks
                  newTasks.push(newTaskID);
                  project = await updateDoc(ref, {
                    NumberOfStages: projectData.NumberOfStages + 1,
                    Tasks: newTasks

                  })
                  const taskRef = doc(db, "Tasks", newTaskID);
                  let taskidupdate = await updateDoc(ref,
                    {
                      TaskID: newTaskID
                    })

                  console.log(task);
                  console.log(project);
                  setTimeout(() => { }, 10000);

                  router.push(`/dashboard`);
                } catch (error) {
                  throw `Project failed to add to database! Message: ${error}`
                }
              }}
            >
              Submit
            </button>
          </form>
        </>
      );
    };
    form = getForm();
    return (
      <div className="whitePageWrapper">
        <Header type="header" />
        <div className="content">{form}</div>
        <Footer type="footer" />
      </div>
    );
  }
};

export default CreateTask;
