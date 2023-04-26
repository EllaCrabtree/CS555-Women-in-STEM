import { useEffect, useState } from "react";
import Router from "next/router";
import { useAuth } from "@contexts/authUserContext";
import { doc, collection, getDoc, setDoc } from "firebase/firestore";
import { Card, Text, Link, Button } from "@nextui-org/react";
import { db } from "@libs/firebase.mjs";
import Header from "@components/Header";
import Footer from "@components/Footer";
import styles from "@styles/createProject.module.css";

export default function Createproject() {
	// Check if the user isn't logged in
	// If the user isn't logged in, redirect to the home page
	const auth = useAuth();
	const [user, setUser] = useState(null);
	const [spanish, setSpanish] = useState(false);
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
			if (!spanish) {
				return (
					<>
						<h1>You can&apos;t create a project.</h1>
						<p>Contact an operations manager.</p>
					</>
				);
			} else {
				return (
					<>
						<h1>No puedes crear un proyecto..</h1>
						<p>Contactar con un gerente de operaciones.</p>
					</>
				);
			}
		else {
			if (!spanish) {
				return (
					<>
						<Button
							onPress={() => {
								setSpanish(true);
							}}
						>
							Cambiar a Español
						</Button>
						<h1>Create Project</h1>
						<form className={styles.createProjectForm}>
							<label htmlFor="projectName">Project Name</label>
							<input type="text" name="projectName" id="projectName" />
							<label htmlFor="projectName">Project ID</label>
							<input type="text" name="projectId" id="projectId" />
							<label htmlFor="customer">Customer Id</label>
							<input type="text" name="customerId" id="customerId" />
							<label htmlFor="projectDescription">Project Description</label>
							<input
								type="text"
								name="projectDescription"
								id="projectDescription"
							/>

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
									const projectName =
										document.getElementById("projectName").value;
									const projectDescription =
										document.getElementById("projectDescription").value;
									const customerIds =
										document.getElementById("customerId").value;
									const projectId = document.getElementById("projectId").value;
									const salesTeamIds =
										document.getElementById("salesTeam").value;
									const constructionTeamIds =
										document.getElementById("constructionTeam").value;
									try {
										let project;
										project = await setDoc(doc(db, "Projects", projectId), {
											ProjectID: projectId,
											Project_Name: projectName,
											Description: projectDescription,
											OwnerID: customerIds,
											Sales_Team: salesTeamIds.split(/\s+/),
											Construction_Team: constructionTeamIds.split(/\s+/),
											Current_Stage: 0,
											NumberOfStages: 0,
											Tasks: [],
										});
										let confrimation;
										console.log(project);
										window.alert("Project Created Successfully");
										setTimeout(() => {}, 10000);
										Router.push("/");
									} catch (error) {
										throw `Project failed to add to database! Message: ${error}`;
									}
								}}
							>
								Submit
							</button>
						</form>
					</>
				);
			} else {
				return (
					<>
						<Button
							onPress={() => {
								setSpanish(false);
							}}
						>
							Switch to English
						</Button>
						<h1>Crear Proyecto</h1>
						<form className={styles.createProjectForm}>
							<label htmlFor="projectName">Nombre del Proyecto</label>
							<input type="text" name="projectName" id="projectName" />
							<label htmlFor="projectName">Proyecto ID</label>
							<input type="text" name="projectId" id="projectId" />
							<label htmlFor="customer">Cliente ID</label>
							<input type="text" name="customerId" id="customerId" />
							<label htmlFor="projectDescription">
								Descripción del Proyecto
							</label>
							<input
								type="text"
								name="projectDescription"
								id="projectDescription"
							/>

							<label htmlFor="salesTeam">Equipo de Ventas IDs</label>
							<textarea
								name="salesTeam"
								id="salesTeam"
								rows="8"
								cols="40"
							></textarea>
							<label htmlFor="constructionTeam">
								Equipo de Construcción IDs
							</label>
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
									const projectName =
										document.getElementById("projectName").value;
									const projectDescription =
										document.getElementById("projectDescription").value;
									const customerIds =
										document.getElementById("customerId").value;
									const projectId = document.getElementById("projectId").value;
									const salesTeamIds =
										document.getElementById("salesTeam").value;
									const constructionTeamIds =
										document.getElementById("constructionTeam").value;
									try {
										let project;
										project = await setDoc(doc(db, "Projects", projectId), {
											ProjectID: projectId,
											Project_Name: projectName,
											Description: projectDescription,
											OwnerID: customerIds,
											Sales_Team: salesTeamIds.split(/\s+/),
											Construction_Team: constructionTeamIds.split(/\s+/),
											Current_Stage: 0,
											NumberOfStages: 0,
											Tasks: [],
										});
										let confrimation;
										console.log(project);
										window.alert("Proyecto creado con éxito");
										setTimeout(() => {}, 10000);
										Router.push("/");
									} catch (error) {
										throw `¡El proyecto no se pudo agregar a la base de datos! Mensaje: ${error}`;
									}
								}}
							>
								Entregar
							</button>
						</form>
					</>
				);
			}
		}
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
