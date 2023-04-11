import React, { useEffect, useState } from "react";
import { useAuth } from "@contexts/authUserContext";
import { doc, collection, getDoc, setDoc } from "firebase/firestore";
import { db } from "@libs/firebase.mjs";
import Footer from "@components/Footer";

const Profile = () => {
    const [user, setUser] = useState(null);

    // Check if the user isn't logged in
    // If the user isn't logged in, redirect to the home page
    const auth = useAuth();
    useEffect(() => {
        if (!auth.authUser) {
            return;
        }

        // Get the user's profile
        const getUser = async () => {
            // Get doc with an internal id of auth.authUser.uid
            const userDoc = await getDoc(
                doc(collection(db, "Users"), auth.authUser.uid)
            );
            if (!userDoc.exists()) {
                const defaultUserDoc = {
                    email: auth.authUser.email,
                    firstName: "",
                    lastName: "",
                    userType: "",
                };
                await setDoc(
                    doc(db, "Users", auth.authUser.uid),
                    defaultUserDoc
                );
                setUser(defaultUserDoc);
            } else {
                setUser(userDoc.data());
            }
        };
        getUser();
    }, [auth]);

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="whitePageWrapper">
            <main className="content">
                <h1>Your Profile</h1>
                <form
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.5rem",
                    }}
                >
                    <label htmlFor="firstName">First Name</label>
                    <input
                        type="text"
                        name="firstName"
                        id="firstName"
                        value={user.firstName}
                        onChange={(e) =>
                            setUser({ ...user, firstName: e.target.value })
                        }
                    />
                    <label htmlFor="lastName">Last Name</label>
                    <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        value={user.lastName}
                        onChange={(e) =>
                            setUser({ ...user, lastName: e.target.value })
                        }
                    />
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={user.email}
                        onChange={(e) =>
                            setUser({ ...user, email: e.target.value })
                        }
                    />
                    <label htmlFor="userType">User Type</label>
                    <select
                        name="userType"
                        id="userType"
                        value={user.userType}
                        onChange={(e) =>
                            setUser({ ...user, userType: e.target.value })
                        }
                    >
                        <option value="">Select a user type</option>
                        <option value="Customer">Customer</option>
                        <option value="Sales">Sales</option>
                        <option value="Operations">Operations</option>
                        <option value="Construction">Construction</option>
                    </select>
                    <button
                        style={{
                            marginTop: "1rem",
                        }}
                        type="submit"
                        onClick={async (e) => {
                            e.preventDefault();
                            console.log(user);
                            await setDoc(doc(db, "Users", auth.authUser.uid), {
                                ...user,
                            });
                        }}
                    >
                        Save
                    </button>
                </form>
                <button onClick={() => auth.signOut()}>Sign out</button>
            </main>
            <Footer type="footer" />
        </div>
    );
};

export default Profile;
