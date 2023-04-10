import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import * as dotenv from "dotenv";

const firebaseCredentials = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
};

const initDb = async () => {
    const app = initializeApp(firebaseCredentials);
    return getFirestore(app);
};

const seedDatabase = async () => {
    dotenv.config(".env.local");
    const db = await initDb();

    const client = {
        firstName: "Clienty",
        lastName: "Clientface",
        reminders: ["reminderID1"],
        userType: "Client",
        userUUID: "thisUserUUID",
    };

    await addDoc(collection(db, "Users"), client);
};

export default seedDatabase();
