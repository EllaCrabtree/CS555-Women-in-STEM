import { useEffect, useState } from "react";
import Router from "next/router";
import { useAuth } from "@contexts/authUserContext";
import {
  getFirestore,
  collection,
  doc,
  addDoc,
  setDoc,
  getDoc,
  getDocs,
  query,
  where,
  or,
} from "firebase/firestore";
import { Card, Text, Link } from "@nextui-org/react";
import { initializeApp } from "firebase/app";
import { db } from "@libs/firebase.mjs";
import Header from "@components/Header";
import Footer from "@components/Footer";
import styles from "@styles/Dashboard.module.css";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [projectData, setProjectData] = useState();
  const [loading, setLoading] = useState(true);

  // Check if the user isn't logged in
  // If the user isn't logged in, redirect to the home page
  const auth = useAuth();
  useEffect(() => {
    setLoading(auth.loading);
    console.log(auth.loading);
    if (auth.loading) return;

    // Get the user's profile
    const getUser = async () => {
      // Get doc with an internal id of auth.authUser.uid
      const userDoc = await getDoc(
        doc(collection(db, "Users"), auth.authUser.uid)
      );
      if (!userDoc.exists()) {
        const defaultUserDoc = {
          UserUUID: auth.authUser.uid,
          email: auth.authUser.email,
          firstName: "",
          lastName: "",
          userType: "Customer",
        };
        await setDoc(doc(db, "Users", auth.authUser.uid), defaultUserDoc);
        setUser(defaultUserDoc);
      } else {
        setUser(userDoc.data());
      }
    };

    const getData = async (uuid) => {
      try {
        const q = query(
          collection(db, "Projects"),
          or(
            where("OwnerID", "==", uuid),
            where("Sales_Team", "array-contains", uuid),
            where("Construction_Team", "array-contains", uuid)
          )
        );
        const querySnapshot = await getDocs(q);
        let dataArray = [];

        querySnapshot.forEach((doc) => {
          dataArray.push(doc.data());
        });
        setProjectData(dataArray);
      } catch (error) {
        console.log(error);
      }
    };

    if (auth.authUser) {
      if (!user) {
        getUser();
      } else if (!projectData) {
        getData(auth.authUser.uid);
      } else {
        setLoading(false);
      }
    } else {
      Router.push("/login");
    }
  }, [auth, user]);

  const BuildProjectCard = (project) => {
    return (
      <li key={project.ProjectID}>
        <Link href={`/project/${project.ProjectID}`}>
          <Card isPressable isHoverable variant="bordered">
            <Card.Header>
              <Text> {project.ProjectName} </Text>
            </Card.Header>
            <Card.Body>
              <Text> {project.Description} </Text>
            </Card.Body>
          </Card>
        </Link>
      </li>
    );
  };

  const getProjects = () => {
    if (projectData) {
      let cardElements = projectData.map((proj) => {
        return BuildProjectCard(proj);
      });
      return cardElements;
    } else return <div>No projects available.</div>;
  };

  if (loading) {
    return <div>Loading...</div>;
  } else if (user && auth.authUser) {
    let projects = getProjects();
    let addProjectButton = <></>;
    if (user.userType === "Operations") {
      addProjectButton = (
        <Link href="/createproject">
          <img
            src="/add.png"
            className={styles.addPic}
            alt="createprojectpic"
          />
        </Link>
      );
    }

    return (
      <div className="whitePageWrapper">
        <Header type="header" />
        <main className="content">
          <div className="searchbar">
            <img src="/search.png" alt="searchpic" />
            <input type="text" placeholder="Search for Projects..." />
          </div>
          <div className={styles.projectsHeader}>
            <h1>All Projects</h1>
            {addProjectButton}
          </div>
          <ul className={styles.projects}>{projects}</ul>
        </main>
        <Footer type="footer" />
      </div>
    );
  }
}
