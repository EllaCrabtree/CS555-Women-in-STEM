// ./initAuth.js
import { init } from "next-firebase-auth";

const initAuth = () => {
    init({
        loginAPIEndpoint: "/api/login",
        logoutAPIEndpoint: "/api/logout",
        firebaseAdminInitConfig: {
            credential: {
                projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
                clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
                // Using JSON to handle newline problems when storing the
                // key as a secret in Vercel. See:
                // https://github.com/vercel/vercel/issues/749#issuecomment-707515089
                privateKey: process.env.FIREBASE_PRIVATE_KEY
                    ? JSON.parse(process.env.FIREBASE_PRIVATE_KEY)
                    : undefined,
            },
            databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
        },
        firebaseClientInitConfig: {
            apiKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY,
            authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
            databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
            projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
            storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
        },
        cookies: {
            name: "ExampleApp",
            keys: [
                process.env.COOKIE_SECRET_CURRENT,
                process.env.COOKIE_SECRET_PREVIOUS,
            ],
            httpOnly: true,
            maxAge: 43200, // twelve hours
            overwrite: true,
            path: "/",
            sameSite: "lax",
            secure: process.env.NEXT_PUBLIC_COOKIE_SECURE === "true",
            signed: true,
        },
    });
};

export default initAuth;
