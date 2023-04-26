import React from "react";
import { useRouter } from "next/router";
import { Button } from "@nextui-org/react";

const Subtask = () => {
	const router = useRouter();
	const { projectId, taskId, subtaskId } = router.query;
	const [spanish, setSpanish] = useState(false);

	if (!spanish) {
		return (
			<main className="content-container">
				<Button
					onPress={() => {
						setSpanish(true);
					}}
				>
					Cambiar a Español
				</Button>
				<h1 id="project-name">Default Subtask Name</h1>
				<h2 className="project-main-name" id="project-manager-name">
					Creator: Default Creator Name
				</h2>
				<p className="project-subinfo">
					Due Date: 1/01/2023 | Creation Date: 1/01/2023 Project ID: {projectId}
					Task ID: {taskId}
					Subtask ID: {subtaskId}
				</p>
				<div className="boxtab-container" id="photos-container">
					<img
						className="boxtab-icon"
						id="photos-icon"
						src="/photos.png"
						alt="photos-icon"
					/>
					<p className="boxtab-label" id="photoslabel">
						Photos: 0
					</p>
					<div className="boxtab-arrow-container">
						<img
							className="boxtab-arrow"
							src="/chevron_left.png"
							alt="boxtab-arrow"
						/>
					</div>
				</div>
				<div className="boxtab-container" id="membercount-container">
					<img
						className="boxtab-icon"
						id="membercount-icon"
						src="/people.png"
						alt="membercount-icon"
					/>
					<p className="boxtab-label" id="membercount">
						People: 0
					</p>
					<div className="boxtab-arrow-container">
						<img
							className="boxtab-arrow"
							src="/chevron_left.png"
							alt="boxtab-arrow"
						/>
					</div>
				</div>
			</main>
		);
	} else {
		return (
			<main className="content-container">
				<Button
					onPress={() => {
						setSpanish(false);
					}}
				>
					Switch to English
				</Button>
				<h1 id="project-name">Nombre de la Subtarea Predeterminada</h1>
				<h2 className="project-main-name" id="project-manager-name">
					Creador: Nombre del creador predeterminado
				</h2>
				<p className="project-subinfo">
					Fecha de Vencimiento: 1/01/2023 | Fecha de Creación: 1/01/2023
					Proyecto ID: {projectId}
					Tarea ID: {taskId}
					Subtarea ID: {subtaskId}
				</p>
				<div className="boxtab-container" id="photos-container">
					<img
						className="boxtab-icon"
						id="photos-icon"
						src="/photos.png"
						alt="photos-icon"
					/>
					<p className="boxtab-label" id="photoslabel">
						Fotos: 0
					</p>
					<div className="boxtab-arrow-container">
						<img
							className="boxtab-arrow"
							src="/chevron_left.png"
							alt="boxtab-arrow"
						/>
					</div>
				</div>
				<div className="boxtab-container" id="membercount-container">
					<img
						className="boxtab-icon"
						id="membercount-icon"
						src="/people.png"
						alt="membercount-icon"
					/>
					<p className="boxtab-label" id="membercount">
						Gente: 0
					</p>
					<div className="boxtab-arrow-container">
						<img
							className="boxtab-arrow"
							src="/chevron_left.png"
							alt="boxtab-arrow"
						/>
					</div>
				</div>
			</main>
		);
	}
};

export default Subtask;
