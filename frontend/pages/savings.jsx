import { useEffect, useState } from "react";
import Router from "next/router";
import { useAuth } from "@contexts/authUserContext";
import Header from "@components/Header";
import Footer from "@components/Footer";

export default function Savings() {
	const [spanish, setSpanish] = useState(false);
	if (!spanish) {
		return (
			<div className="whitePageWrapper">
				<Header type="header" />
				<main className="content">
					<div>
						<h1>It works!</h1>
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
					<div>
						<h1>¡Funciona!</h1>
					</div>
				</main>
				<Footer type="footer" />
			</div>
		);
	}
}
