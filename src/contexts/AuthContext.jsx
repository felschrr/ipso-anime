import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../config/firestore";
import {
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const toastSettings = {
    position: "bottom-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "colored",
};

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (userAuth) => {
            if (userAuth) {
                const userData = await getUserData(userAuth.uid);
                setUser(userData);
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    async function getUserData(uid) {
        const userRef = doc(db, "users", uid);
        const userSnapshot = await getDoc(userRef);
        if (userSnapshot.exists()) {
            return userSnapshot.data();
        } else {
            // Logically, you may not find user data immediately after sign up before the document is created.
            // Consider handling this case gracefully.
            return null;
        }
    }

    async function createUserDocument(uid, email, username) {
        const userRef = doc(db, "users", uid);
        const userData = {
            uid,
            email,
            username,
            preferences: [],
            register_date: new Date().toLocaleDateString("fr-FR"),
            photoURL: `https://ui-avatars.com/api/?background=random&name=${username}`,
        };
        await setDoc(userRef, userData);
        return userData;
    }

    async function signup(username, email, password) {
        try {
            const { user: userAuth } = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            const userData = await createUserDocument(
                userAuth.uid,
                email,
                username
            );
            setUser(userData);
            toast.success("Inscription réussie !", toastSettings);
        } catch (error) {
            console.error(error);
            toast.error(
                `Echec de l'inscription : ${error.message}`,
                toastSettings
            );
        } finally {
            setLoading(false);
        }
    }

    async function login(email, password) {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            toast.success("Connexion réussie !", toastSettings);
        } catch (error) {
            console.error(error);
            toast.error(
                `Echec de la connexion : ${error.message}`,
                toastSettings
            );
        } finally {
            setLoading(false);
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
                await Swal.fire({
                    title: "Déconnexion!",
                    text: "Vous êtes déconnecté.",
                    icon: "success",
                    willClose: () => {
                        window.location.reload();
                    },
                });
            }
        } catch (error) {
            console.error(error);
            Swal.fire(
                "Erreur",
                `Echec de la déconnexion : ${error.message}`,
                "error"
            );
        }
    }

    const value = {
        user,
        signup,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
