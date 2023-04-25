import { useEffect, useState } from "react";
import Router from "next/router";

import { useAuth } from "@contexts/authUserContext";
import Header from "@components/Header";
import Footer from "@components/Footer";

const Help = () => {
	const [spanish, setSpanish] = useState(false);
	const [option1, setOption1] = useState(false);
	const [option2, setOption2] = useState(false);
	const [option3, setOption3] = useState(false);
	const [option4, setOption4] = useState(false);

	const [text1, setText1] = useState("Issues with Solar Panel");
	const [text2, setText2] = useState("Issues with website");
	const [text3, setText3] = useState("Issues contacting support");
	const [text4, setText4] = useState("House caught fire");

	const [path, setPath] = useState("0");
	const [answer, setAnswer] = useState("");

	useEffect(() => {
		if (!spanish) {
			//path 0 results
			if (option1 && path == "0") {
				setOption1(false);
				setPath(path + "1");
				setText1("Solar panel not generating power");
				setText2("Solar panel not operating at expected efficiency");
				setText3("Solar panel analytics are incorrect");
				setText4("Its cloudy");
			}
			if (option2 && path == "0") {
				setOption2(false);
				setPath(path + "2");
				setText1("Login not working");
				setText2("Dashboard not working");
				setText3("Profile not working");
				setText4("Other");
			}
			if (option3 && path == "0") {
				setOption3(false);
				setPath(path + "3");
				setText1("Email");
				setText2("Call");
				setText3("PO Box");
				setText4("Office address");
			}
			if (option4 && path == "0") {
				setOption4(false);
				setPath(path + "4");
				setText1("Liability claims");
				setText2("Reimbursment");
				setText3("Warranty issues");
				setText4("Condolances for loved ones lost in the fire");
			}

			//Path 1 results
			if (option1 && path == "01") {
				setOption1(false);
				setAnswer("Try turning it off and on again");
			}
			if (option2 && path == "01") {
				setOption2(false);
				setAnswer(
					"Try cleaning the panel and removing any obstacles to sunlight"
				);
			}
			if (option3 && path == "01") {
				setOption3(false);
				setAnswer("Try refreshing the page");
			}
			if (option4 && path == "01") {
				setOption4(false);
				setAnswer("We don't control the weather");
			}

			//Path 2 results
			if (option1 && path == "02") {
				setOption1(false);
				setAnswer("Try contacting customer support");
			}
			if (option2 && path == "02") {
				setOption2(false);
				setAnswer("Try refreshing the page");
			}
			if (option3 && path == "02") {
				setOption3(false);
				setAnswer("Try refreshing the page");
			}
			if (option4 && path == "02") {
				setOption4(false);
				setAnswer("Try contacting customer support");
			}

			//Path 3 results
			if (option1 && path == "03") {
				setOption1(false);
				setAnswer("Email: FakeEmail@temp.com");
			}
			if (option2 && path == "03") {
				setOption2(false);
				setAnswer("Call: 555-555-5555");
			}
			if (option3 && path == "03") {
				setOption3(false);
				setAnswer("PO Box: 12345");
			}
			if (option4 && path == "03") {
				setOption4(false);
				setAnswer("Office address: 1 Castle point Terrace, Hoboken, NJ 07030");
			}

			//Path 4 results
			if (option1 && path == "04") {
				setOption1(false);
				setAnswer(
					"As per the installation contract, Amaterasu cannot be held liable for damages caused by solar panels"
				);
			}
			if (option2 && path == "04") {
				setOption2(false);
				setAnswer(
					"As per the installation contract, Amaterasu offers no compensation for damages caused by solar panels"
				);
			}
			if (option3 && path == "04") {
				setOption3(false);
				setAnswer("To activate your warranty, please contact customer support");
			}
			if (option4 && path == "04") {
				setOption4(false);
				setAnswer("Amaterasu mourns for your loss");
			}
		} else {
			//path 0 results
			if (option1 && path == "0") {
				setOption1(false);
				setPath(path + "1");
				setText1("El panel solar no genera energía");
				setText2("El panel solar no funciona con la eficiencia esperada");
				setText3("Los análisis del panel solar son incorrectos");
				setText4("Está nublado");
			}
			if (option2 && path == "0") {
				setOption2(false);
				setPath(path + "2");
				setText1("Iniciar sesión no funciona");
				setText2("Tablero no funciona");
				setText3("Perfil no funciona");
				setText4("Otro");
			}
			if (option3 && path == "0") {
				setOption3(false);
				setPath(path + "3");
				setText1("Email");
				setText2("Llamar");
				setText3("Ppartado de Correos");
				setText4("Dirección de la oficina");
			}
			if (option4 && path == "0") {
				setOption4(false);
				setPath(path + "4");
				setText1("Reclamaciones de responsabilidad");
				setText2("Reembolso");
				setText3("Problemas de Garantía");
				setText4("Condolencias por los seres queridos perdidos en el incendio");
			}

			//Path 1 results
			if (option1 && path == "01") {
				setOption1(false);
				setAnswer("Prueba a apagarlo y encenderlo de nuevo");
			}
			if (option2 && path == "01") {
				setOption2(false);
				setAnswer(
					"Intente limpiar el panel y eliminar cualquier obstáculo a la luz solar."
				);
			}
			if (option3 && path == "01") {
				setOption3(false);
				setAnswer("Intenta actualizar la página");
			}
			if (option4 && path == "01") {
				setOption4(false);
				setAnswer("Nosotros no controlamos el clima");
			}

			//Path 2 results
			if (option1 && path == "02") {
				setOption1(false);
				setAnswer(
					"Intente ponerse en contacto con el servicio de atención al cliente"
				);
			}
			if (option2 && path == "02") {
				setOption2(false);
				setAnswer("Intenta actualizar la página");
			}
			if (option3 && path == "02") {
				setOption3(false);
				setAnswer("Intenta actualizar la página");
			}
			if (option4 && path == "02") {
				setOption4(false);
				setAnswer(
					"Intente ponerse en contacto con el servicio de atención al cliente"
				);
			}

			//Path 3 results
			if (option1 && path == "03") {
				setOption1(false);
				setAnswer("Email: FakeEmail@temp.com");
			}
			if (option2 && path == "03") {
				setOption2(false);
				setAnswer("Llamar: 555-555-5555");
			}
			if (option3 && path == "03") {
				setOption3(false);
				setAnswer("Apartado de Correos: 12345");
			}
			if (option4 && path == "03") {
				setOption4(false);
				setAnswer(
					"Dirección de la Oficina: 1 Castle point Terrace, Hoboken, NJ 07030"
				);
			}

			//Path 4 results
			if (option1 && path == "04") {
				setOption1(false);
				setAnswer(
					"Según el contrato de instalación, Amaterasu no se hace responsable de los daños causados ​​por los paneles solares."
				);
			}
			if (option2 && path == "04") {
				setOption2(false);
				setAnswer(
					"Según el contrato de instalación, Amaterasu no ofrece compensación por los daños causados ​​por los paneles solares."
				);
			}
			if (option3 && path == "04") {
				setOption3(false);
				setAnswer(
					"Para activar su garantía, póngase en contacto con el servicio de atención al cliente"
				);
			}
			if (option4 && path == "04") {
				setOption4(false);
				setAnswer("Amaterasu lamenta tu pérdida");
			}
		}
	}, [option1, option2, option3, option4]);
	if (!spanish) {
		return (
			<div className="whitePageWrapper">
				<Header type="header" />
				<main className="content">
					<h1>Help</h1>

					{!answer && (
						<>
							<div>
								Please select the option that best describes your issue:
							</div>
							<button
								onClick={() => {
									setOption1(true);
								}}
							>
								{text1}
							</button>
							<button
								onClick={() => {
									setOption2(true);
								}}
							>
								{text2}
							</button>
							<button
								onClick={() => {
									setOption3(true);
								}}
							>
								{text3}
							</button>
							<button
								onClick={() => {
									setOption4(true);
								}}
							>
								{text4}
							</button>
						</>
					)}

					{answer && (
						<>
							<p>{answer}</p>
						</>
					)}
				</main>
				<Footer type="footer" />
			</div>
		);
	} else {
		return (
			<div className="whitePageWrapper">
				<Header type="header" />
				<main className="content">
					<h1>Ayuda</h1>

					{!answer && (
						<>
							<div>Seleccione la opción que mejor describa su problema:</div>
							<button
								onClick={() => {
									setOption1(true);
								}}
							>
								{text1}
							</button>
							<button
								onClick={() => {
									setOption2(true);
								}}
							>
								{text2}
							</button>
							<button
								onClick={() => {
									setOption3(true);
								}}
							>
								{text3}
							</button>
							<button
								onClick={() => {
									setOption4(true);
								}}
							>
								{text4}
							</button>
						</>
					)}

					{answer && (
						<>
							<p>{answer}</p>
						</>
					)}
				</main>
				<Footer type="footer" />
			</div>
		);
	}
};

export default Help;
