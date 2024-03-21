import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../config/firestore";
import {
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    sendEmailVerification,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import toastSettings from "../config/toasts";

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [authUser, setAuthUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (userAuth) => {
            if (userAuth) {
                // Fetches user document from Firestore if the userAuth object exists
                const userData = await getUserData(userAuth.uid);
                setUser({ ...userData, emailVerified: userAuth.emailVerified }); 
                setAuthUser(userAuth);
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return unsubscribe; // Properly cleans up the subscription
    }, []);

    async function getUserData(uid) {
        const userRef = doc(db, "users", uid);
        const userSnapshot = await getDoc(userRef);
        if (userSnapshot.exists()) {
            return userSnapshot.data();
        } else {
            // Consider how to handle or notify when user data does not exist
            return null;
        }
    }

    async function createUserDocument(uid, email, displayName) {
        const userRef = doc(db, "users", uid);
        // Setting up the initial user document
        const userData = {
            uid,
            email,
            displayName,
            preferences: [], // Consider initializing with meaningful defaults if applicable
            register_date: new Date().toISOString(), // ISO string for consistent date handling
            photoURL: `https://ui-avatars.com/api/?background=random&name=${displayName}`,
        };
        await setDoc(userRef, userData);
        return userData;
    }

    async function signup(displayName, email, password) {
        try {
            const { user: userAuth } = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

            await sendNewEmailVerification(userAuth);

            const userData = await createUserDocument(
                userAuth.uid,
                email,
                displayName
            );
            setUser(userData);
            toast.success("Inscription réussie !", toastSettings);
        } catch (error) {
            console.error(error);
            toast.error(`Echec de l'inscription : ${error.message}`, toastSettings);
        } finally {
            setLoading(false); // It might be better to set loading to false only after all async operations have completed.
        }
    }

    async function sendNewEmailVerification(user) {
        try {
            await sendEmailVerification(user);
            toast.info("Un email de vérification a été envoyé à votre adresse.", toastSettings);
        } catch (error) {
            console.error("Erreur lors de l'envoi du mail de vérification :", error);
            toast.error("Echec de l'envoi de l'email de vérification.", toastSettings);
        }
    }

    async function login(email, password) {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            toast.success("Connexion réussie !", toastSettings);
        } catch (error) {
            console.error(error);
            toast.error(`Echec de la connexion : ${error.message}`, toastSettings);
        } finally {
            setLoading(false); // Adjust according to how you want the loading state to be managed
        }
    }

    async function logout() {
        try {
            const confirmLogout = await Swal.fire({
                title: "Êtes-vous sûr?",
                text: "Vous allez vous déconnecter.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Oui, me déconnecter",
            });

            if (confirmLogout.isConfirmed) {
                await signOut(auth);
                setUser(null);
                setAuthUser(null);
                // Consider handling redirection or page refresh in a more React-friendly manner, maybe using React Router
            }
        } catch (error) {
            console.error(error);
            Swal.fire("Erreur", `Echec de la déconnexion : ${error.message}`, "error");
        }
    }

    const value = {
        user,
        authUser,
        signup,
        login,
        logout,
        sendNewEmailVerification,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
