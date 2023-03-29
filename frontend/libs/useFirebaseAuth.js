import { useState, useEffect } from "react";
import {
    signInWithEmailAndPassword as fbSignInWithEmailAndPassword,
    createUserWithEmailAndPassword as fbCreateUserWithEmailAndPassword,
    signOut as fbSignOut,
    onAuthStateChanged,
} from "firebase/auth";

import { auth } from "@libs/firebase";

const formatAuthUser = (user) => ({
    uid: user.uid,
    email: user.email,
});

export default function useFirebaseAuth() {
    const [authUser, setAuthUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const authStateChanged = async (authState) => {
        if (!authState) {
            setLoading(false);
            return;
        }

        setLoading(true);

        var formattedUser = formatAuthUser(authState);

        setAuthUser(formattedUser);
        setLoading(false);
    };

    const clear = () => {
        setAuthUser(null);
        setLoading(true);
    };

    const signInWithEmailAndPassword = (email, password) =>
        fbSignInWithEmailAndPassword(auth, email, password);

    const createUserWithEmailAndPassword = (email, password) =>
        fbCreateUserWithEmailAndPassword(auth, email, password);

    const signOut = () => fbSignOut(auth).then(clear);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, authStateChanged);
        return () => unsubscribe();
    }, []);

    return {
        authUser,
        loading,
        signInWithEmailAndPassword,
        createUserWithEmailAndPassword,
        signOut,
    };
}
