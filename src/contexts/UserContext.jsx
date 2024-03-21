import React, { createContext, useContext } from "react";
import { verifyBeforeUpdateEmail, updatePassword } from "firebase/auth";
import { db, auth } from "../config/firestore";
import { doc, updateDoc } from "firebase/firestore";
import { useAuth } from "./AuthContext";
import { toast } from "react-toastify";
import toastSettings from "../config/toasts";

const UserContext = createContext();

export function useUser() {
    return useContext(UserContext);
}

export const UserProvider = ({ children }) => {
    const { user } = useAuth();

    async function updateDisplayName(newDisplayName) {
        if (user) {
            try {
                await updateProfile(auth.currentUser, {
                    displayName: newDisplayName,
                });
                const userDocRef = doc(db, "users", user.uid);
                await updateDoc(userDocRef, {
                    displayName: newDisplayName,
                });
                toast.success(
                    "Nom d'utilisateur mis à jour avec succès !",
                    toastSettings
                );
            } catch (error) {
                console.error(
                    "Erreur lors de la mise à jour du nom d'utilisateur :",
                    error
                );
                toast.error(
                    `Echec de la mise à jour du nom d'utilisateur : ${error.message}`,
                    toastSettings
                );
            }
        }
    }

    async function setNewEmail(newEmail) {
        try {
            await verifyBeforeUpdateEmail(auth.currentUser, newEmail);
            toast.info(
                "Un email de vérification a été envoyé à votre nouvelle adresse email.",
                toastSettings
            );
        } catch (error) {
            console.error("Erreur lors de la mise à jour de l'email :", error);
            toast.error(
                `Echec de la mise à jour de l'email : ${error.message}`,
                toastSettings
            );
        }
    }

    async function setNewPassword(newPassword) {
        try {
            await updatePassword(auth.currentUser, newPassword);
            toast.success(
                "Mot de passe mis à jour avec succès !",
                toastSettings
            );
        } catch (error) {
            console.error(
                "Erreur lors de la mise à jour du mot de passe :",
                error
            );
            toast.error(
                `Echec de la mise à jour du mot de passe : ${error.message}`,
                toastSettings
            );
        }
    }

    const updatePhotoURL = async (newPhotoURL) => {
        if (user) {
            try {
                await updateProfile(auth.currentUser, {
                    photoURL: newPhotoURL,
                });
                const userDocRef = doc(db, "users", user.uid);
                await updateDoc(userDocRef, {
                    photoURL: newPhotoURL,
                });
                toast.success(
                    "Photo de profil mise à jour avec succès !",
                    toastSettings
                );
            } catch (error) {
                console.error(
                    "Erreur lors de la mise à jour de la photo de profil :",
                    error
                );
                toast.error(
                    `Echec de la mise à jour de la photo de profil : ${error.message}`,
                    toastSettings
                );
            }
        }
    };

    const value = {
        updateDisplayName,
        setNewEmail,
        setNewPassword,
        updatePhotoURL,
    };

    return (
        <UserContext.Provider value={value}>{children}</UserContext.Provider>
    );
};
