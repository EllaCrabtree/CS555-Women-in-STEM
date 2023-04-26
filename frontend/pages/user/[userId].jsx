import React, { useEffect, useState } from "react";
import { doc, collection, getDoc } from "firebase/firestore";
import { db } from "@libs/firebase.mjs";
import Header from "@components/Header";
import Footer from "@components/Footer";
import { useRouter } from "next/router";
import { Button } from "@nextui-org/react";

const Profile = () => {
	const [user, setUser] = useState(null);
	const router = useRouter();
	const { userId } = router.query;
	const [spanish, setSpanish] = useState(false);

	// Check if the user isn't logged in
	// If the user isn't logged in, redirect to the home page
	useEffect(() => {
		// Get the user's profile
		const getUser = async () => {
			if (!userId) return;

			// Get doc for user
			console.log(userId);
			const userDoc = await getDoc(doc(collection(db, "Users"), userId));
			if (!userDoc.exists()) {
				return;
			}

			setUser(userDoc.data());
		};
		getUser();
	}, [userId]);

	if (!user) {
		if (!spanish) {
			return <div>User Not Found</div>;
		} else {
			return <div>Usuario no encontrado</div>;
		}
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
					<h1>
						{user.first_name} {user.last_name}&apos;s Profile
					</h1>
					<p>
						{user.first_name} {user.last_name}
					</p>
					<p>{user.email}</p>
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
					<h1>
						Perfil de {user.first_name} {user.last_name}
					</h1>
					<p>
						{user.first_name} {user.last_name}
					</p>
					<p>{user.email}</p>
				</main>
				<Footer type="footer" />
			</div>
		);
	}
};

export default Profile;
