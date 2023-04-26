import { useEffect, useState } from "react";
import Router from "next/router";
import { useAuth } from "@contexts/authUserContext";
import Header from "@components/Header";
import Footer from "@components/Footer";
import { Button } from "@nextui-org/react";

export default function Savings() {
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
					<Button
						onPress={() => {
							setSpanish(false);
						}}
					>
						Switch to English
					</Button>
					<div>
						<h1>¡Funciona!</h1>
					</div>
				</main>
				<Footer type="footer" />
			</div>
		);
	}
}
