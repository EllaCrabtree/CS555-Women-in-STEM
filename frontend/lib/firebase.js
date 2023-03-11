import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseCredentials = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
};

let app, db, auth;

//If an firebase app hasn't already been created
if (!getApps().length) {
    app = initializeApp(firebaseCredentials);
    auth = getAuth(app);
    db = getFirestore(app);
}

export { app, db, auth };
