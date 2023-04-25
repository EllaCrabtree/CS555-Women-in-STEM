import { useEffect, useState } from "react";
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
}
