import { useEffect, useState } from "react";
import Router from "next/router";
// import { Image } from "next/image";

import { useAuth } from "@contexts/authUserContext";
import Header from "@components/Header";
import Footer from "@components/Footer";

export default function Dashboard() {
	// Check if the user isn't logged in
	// If the user isn't logged in, redirect to the home page
	const auth = useAuth();
	useEffect(() => {
		if (!auth.authUser) {
			Router.push("/");
		}
	}, [auth]);

	if (!spanish) {
		return (
			<div className="whitePageWrapper">
				<Header type="header" />
				<main className="content">
					<div class="searchbar">
						<img src="/search.png" alt="searchpic" />
						<input type="text" placeholder="Search for Tasks..." />
					</div>
					<h1>All Tasks</h1>
					<div>No tasks available.</div>
				</main>
				<Footer type="footer" />
			</div>
		);
	} else {
		return (
			<div className="whitePageWrapper">
				<Header type="header" />
				<main className="content">
					<div class="searchbar">
						<img src="/search.png" alt="searchpic" />
						<input type="text" placeholder="Buscar tareas..." />
					</div>
					<h1>Todas las Tareas</h1>
					<div>No hay tareas disponibles.</div>
				</main>
				<Footer type="footer" />
			</div>
		);
	}
}
