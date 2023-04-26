import { useAuth } from "@contexts/authUserContext";
import React, { useEffect, useState } from "react";
import { Router, useRouter } from "next/router";
import { Card, Text, Link, Button } from "@nextui-org/react";
import Header from "@components/Header";
import Footer from "@components/Footer";
import { initializeApp } from "firebase/app";
import styles from "@styles/ProjectIndex.module.css";
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

// import { getStorage, ref, uploadString } from "firebase/storage";

const Project = () => {
	const router = useRouter();
	const { projectId } = router.query;

	const [projectData, setProjectData] = useState();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const [db, setDB] = useState();
	const [storage, setStorage] = useState();
	const [userData, setUserData] = useState();
	const [addTask, setAddTask] = useState();
	const [imageData, setImageData] = useState();
	const [spanish, setSpanish] = useState(false);

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
					let q2;
					try {
						q2 = query(
							collection(db, "Tasks"),
							where("TaskID", "in", dataArray[0].Tasks)
						);
					} catch (e) {
						console.log("no tasks found");
					}

					let querySnapshot2;
					let taskDataArray = [];
					try {
						querySnapshot2 = await getDocs(q2);
						querySnapshot2.forEach((doc) => {
							taskDataArray.push(doc.data());
						});
					} catch (e) {
						console.log("no tasks found cont.");
					}
					console.log(taskDataArray);

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

					const q4 = query(
						collection(db, "Images"),
						where("ProjectID", "==", projectId)
					);
					const querySnapshot4 = await getDocs(q4);

					let imageArray = [];
					querySnapshot4.forEach((doc) => {
						imageArray.push(doc.data());
					});

					project.images = imageArray;

					// setImageList(imageArray)

					// console.log(project)

					// console.log(taskDataArray)

					setProjectData(project);

					if (dataArray[0].Construction_Team.includes(auth.authUser.uid)) {
						setAddTask(
							<Link
								href="/createTask"
								onClick={async () => {
									router.push({
										pathname: "/createTask",
										query: { data: projectId },
									});
								}}
							>
								<img
									src="/add.png"
									className={styles.addPic}
									alt="createprojectpic"
								/>
							</Link>
						);
					} else setAddTask(<></>);
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
	}, [auth, projectData, addTask]);

	const handleImageChange = (img) => {
		console.log(img.target.files[0]);
		const reader = new FileReader();
		reader.readAsDataURL(img.target.files[0]);

		reader.onloadend = () => {
			// console.log('hi')
			// console.log(reader.result)
			setImageData({ img: reader.result });
		};
	};

	const UploadImage = async () => {
		const image = {
			ProjectID: projectId,
			Base64URL: imageData.img,
		};

		try {
			let imageResult = await addDoc(collection(db, "Images"), image);
			console.log(imageResult);
		} catch (e) {
			console.log(e);
		}
	};

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

	const BuildImageList = (image) => {
		return <img src={image.Base64URL} alt="KikiMonster" />;
	};

	if (error) {
		if (!spanish) {
			return <h1> Error Ocurred </h1>;
		} else {
			return <h1> Se Produjo un Error </h1>;
		}
	} else if (loading) {
		if (!spanish) {
			return <h1> Loading... </h1>;
		} else {
			return <h1> Cargando... </h1>;
		}
	} else if (projectData) {
		const taskElements_NotCompleted = projectData.Tasks.filter(
			(task) => task.Completion_Status == 0
		).map((task) => {
			return BuildTaskCard(task);
		});

		const taskElements_Completed = projectData.Tasks.filter(
			(task) => task.Completion_Status == 1
		).map((task) => {
			return BuildTaskCard(task);
		});

		const imageElements = projectData.images.map((img) => {
			return BuildImageList(img);
		});

		let taskContent_NotCompleted = null;
		if (taskElements_NotCompleted.length == 0) {
			if (!spanish) {
				taskContent_NotCompleted = "No tasks available to complete.";
			} else {
				taskContent_NotCompleted = "No hay tareas disponibles para completar.";
			}
		} else {
			taskContent_NotCompleted = (
				<ul className={styles.taskContent}> {taskElements_NotCompleted} </ul>
			);
		}

		let taskContent_Completed = null;
		if (taskElements_Completed.length == 0) {
			if (!spanish) {
				taskContent_Completed = "No tasks completed.";
			} else {
				taskContent_Completed = "Sin tareas completadas.";
			}
		} else {
			taskContent_Completed = (
				<ul className={styles.taskContent}> {taskElements_Completed} </ul>
			);
		}

		let imageContent = null;
		if (imageElements.length == 0) {
			if (!spanish) {
				imageContent = "No Images for this Project";
			} else {
				imageContent = "No hay imágenes para este proyecto";
			}
		} else {
			imageContent = <ul> {imageElements} </ul>;
		}

		if (!spanish) {
			return (
				<div className="whitePageWrapper">
					<Header type="header" />
					<main className="content">
						<Button
							onPress={() => {
								setSpanish(true);
							}}
						>
							Cambiar a Español
						</Button>
						<h1 className={styles.projectName}> {projectData.Project_Name} </h1>
						<p className={styles.projectId}>ID: {projectData.ProjectID}</p>
						<h2 className={styles.projectProgress}>
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
						<Link href={`/projects`}>Go Back to All Projects </Link>
						<h1>Tasks</h1>
						<div className="tasklist" id="activetasklist">
							{taskContent_NotCompleted}
						</div>
						<h1>Completed Tasks</h1>
						<div className="tasklist" id="completedtasklist">
							{taskContent_Completed}
						</div>
						<div className={styles.boxtabContainer} id="photos-container">
							<img
								className={styles.boxtabIcon}
								id="photos-icon"
								src="/photos.png"
								alt="photos-icon"
							/>
							<p className={styles.boxtabLabel} id="photoslabel">
								Photos
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
						{/* <label>
                Choose a photo to upload
            </label>
            <input 
                onChange={(e) => handleImageChange(e)}
                type="file" 
                id="img" 
                name="img" 
                accept="image/*"
                encType="multipart/form-data" />
            
            <button onClick={UploadImage}>Upload Image</button> */}
						<div className={styles.boxtabContainer} id="membercount-container">
							<img
								className={styles.boxtabIcon}
								id="membercount-icon"
								src="/people.png"
								alt="membercount-icon"
							/>
							<p className={styles.boxtabLabel} id="membercount">
								People
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
		} else {
			return (
				<div className="whitePageWrapper">
					<Header type="header" />
					<main className="content">
						<Button
							onPress={() => {
								setSpanish(false);
							}}
						>
							Switch to English
						</Button>
						<h1 className={styles.projectName}> {projectData.Project_Name} </h1>
						<p className={styles.projectId}>ID: {projectData.ProjectID}</p>
						<h2 className={styles.projectProgress}>
							{" "}
							!!!Este proyecto está{" "}
							{Math.round(
								(Number(projectData.Current_Stage) /
									Number(projectData.NumberOfStages)) *
									100
							)}
							% hecho!!!{" "}
						</h2>
						<h2 className={styles.projectMainName} id="project-manager-name">
							Administrador: Nombre de Administrador Predeterminado
						</h2>
						<h2 className={styles.projectMainName} id="project-client-name">
							Cliente: {projectData.ProjectOwner.first_name}{" "}
							{projectData.ProjectOwner.last_name}
						</h2>
						<p className={styles.projectSubinfo}>
							Estado: Estado Predeterminado
						</p>
						<p className={styles.projectSubinfo}>
							Fecha de Inicio de Etapa: 1/01/2023 | Fecha de Inicio del
							Proyecto: 1/01/2023
						</p>
						<Link href={`/projects`}>Volver a Todos los Proyectos </Link>
						<h1>Tareas</h1>
						<div className="tasklist" id="activetasklist">
							{taskContent_NotCompleted}
						</div>
						<h1>Tareas Completadas</h1>
						<div className="tasklist" id="completedtasklist">
							{taskContent_Completed}
						</div>
						<div className={styles.boxtabContainer} id="photos-container">
							<img
								className={styles.boxtabIcon}
								id="photos-icon"
								src="/photos.png"
								alt="photos-icon"
							/>
							<p className={styles.boxtabLabel} id="photoslabel">
								Fotos
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
						{/* <label>
                        Choose a photo to upload
                    </label>
                    <input 
                        onChange={(e) => handleImageChange(e)}
                        type="file" 
                        id="img" 
                        name="img" 
                        accept="image/*"
                        encType="multipart/form-data" />
                    
                    <button onClick={UploadImage}>Upload Image</button> */}
						<div className={styles.boxtabContainer} id="membercount-container">
							<img
								className={styles.boxtabIcon}
								id="membercount-icon"
								src="/people.png"
								alt="membercount-icon"
							/>
							<p className={styles.boxtabLabel} id="membercount">
								Gente
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
	}
};

export default Project;
