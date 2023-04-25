import { useAuth } from "@contexts/authUserContext";
import { useEffect, useState } from "react";
// import Link from 'next/link';
import { Card, Text, Link } from "@nextui-org/react";
import { initializeApp } from "firebase/app";
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

import Header from "@components/Header";
import Footer from "@components/Footer";
import styles from "@styles/Dashboard.module.css";

export default function Projects() {
	const [projectData, setProjectData] = useState();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const [db, setDB] = useState();
	const [spanish, setSpanish] = useState(false);

	const auth = useAuth();
	useEffect(() => {
		// if (!auth.authUser) {
		//     // Router.push("/");
		// } else {
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

			// let data = [
			//     {
			//         ProjectID: 1,
			//         ProjectName: "Stephanie's Project",
			//         Description: "This is a test project!",
			//         OwnerID: 123,
			//         SalesTeam: [],
			//         ConstructionTeam: [],
			//         ProjectClass: "Installation",
			//         CurrentStage: 2,
			//         NumberOfStages: 5,
			//         Tasks: []
			//     },
			//     {
			//         ProjectID: 2,
			//         ProjectName: "Ella's Project",
			//         Description: "This is a test project!",
			//         OwnerID: 456,
			//         SalesTeam: [],
			//         ConstructionTeam: [],
			//         ProjectClass: "Installation",
			//         CurrentStage: 2,
			//         NumberOfStages: 5,
			//         Tasks: []
			//     }
			// ]
		}

		// }
	}, [auth, projectData]);

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

	if (error) {
		if (!spanish) {
			return <h1>Error ocurred</h1>;
		} else {
			return <h1>Se produjo un error</h1>;
		}
	} else if (loading) {
		if (!spanish) {
			return <h1>Loading...</h1>;
		} else {
			return <h1>Cargando...</h1>;
		}
	} else {
		let cardElements = null;
		console.log(projectData);
		if (projectData) {
			console.log(projectData);
			cardElements = projectData.map((proj) => {
				return BuildProjectCard(proj);
			});
			if (!spanish) {
				return (
					<div>
						<h1>All Projects</h1>

						<ul>{cardElements}</ul>
					</div>
				);
			} else {
				return (
					<div>
						<h1>Todos los proyectos</h1>

						<ul>{cardElements}</ul>
					</div>
				);
			}
		}
	}
}
