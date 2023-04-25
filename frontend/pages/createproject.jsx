import { useEffect, useState } from "react";
import Router from "next/router";
import { useAuth } from "@contexts/authUserContext";
import { doc, collection, getDoc, setDoc } from "firebase/firestore";
import { Card, Text, Link } from "@nextui-org/react";
import { db } from "@libs/firebase.mjs";
import Header from "@components/Header";
import Footer from "@components/Footer";
import styles from "@styles/createProject.module.css";

export default function Createproject() {
  // Check if the user isn't logged in
  // If the user isn't logged in, redirect to the home page
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
          <h1>You can't create a project.</h1>
          <p>Contact an operations manager.</p>
        </>
      );
    else
      return (
        <>
          <h1>Create Project</h1>
          <form className={styles.createProjectForm}>
            <label htmlFor="projectName">Project Name</label>
            <input type="text" name="projectName" id="projectName" />
            <label htmlFor="projectDescription">Project Description</label>
            <input
              type="text"
              name="projectDescription"
              id="projectDescription"
            />
            <label htmlFor="numStages">Number of Stages</label>
            <input type="number" name="numStages" id="numStages" />
            <label htmlFor="salesTeam">Sales Team Ids</label>
            <textarea
              name="salesTeam"
              id="salesTeam"
              rows="8"
              cols="40"
            ></textarea>
            <label htmlFor="constructionTeam">Construction Team Ids</label>
            <textarea
              name="constructionTeam"
              id="constructionTeam"
              rows="8"
              cols="40"
            ></textarea>
            <button
              style={{
                marginTop: "1rem",
              }}
              type="submit"
              onClick={async (e) => {
                e.preventDefault();
                console.log(user);
                // TODO: database interaction
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
