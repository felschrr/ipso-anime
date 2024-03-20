import React, { createContext, useContext } from "react";
import { auth, db } from "../config/firestore";
import { updateEmail, updatePassword } from "firebase/auth";

const UserContext = createContext();

export function useUser() {
    return useContext(UserContext);
}

export const UserProvider = ({ children }) => {

    async function updateUsername(newUsername) {
        try {
            await updateProfile(auth.currentUser, { username: newUsername });
        } catch (error) {
            console.error("Erreur lors de la mise à jour du nom d'utilisateur :", error);
        }
    }

    async function updateEmail(newEmail) {
        try {
            await updateEmail(auth.currentUser, newEmail);
        } catch (error) {
            console.error("Erreur lors de la mise à jour de l'email :", error);
        }
    }

    async function updatePassword(newPassword) {
        try {
            await updatePassword(auth.currentUser, newPassword);
        } catch (error) {
            console.error("Erreur lors de la mise à jour du mot de passe :", error);
        }
    }

    const value = {
        updateUsername,
        updateEmail,
        updatePassword,
    };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};
