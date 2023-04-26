import { useEffect, useState } from "react";
import Router from "next/router";
// import { Image } from "next/image";

import { useAuth } from "@contexts/authUserContext";
import Header from "@components/Header";
import Footer from "@components/Footer";
import { Button } from "@nextui-org/react";

const People = () => {
	const [spanish, setSpanish] = useState(false);
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
					<div class="searchbar">
						<img src="/search.png" alt="searchpic" />
						<input type="text" placeholder="Search people..." />
					</div>
					<h1>All People</h1>
					<div>No people available.</div>
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
					<div class="searchbar">
						<img src="/search.png" alt="searchpic" />
						<input type="text" placeholder="Busca gente..." />
					</div>
					<h1>Todos los personas</h1>
					<div>No hay personas disponibles.</div>
				</main>
				<Footer type="footer" />
			</div>
		);
	}
};

export default People;
