import React, { createContext, useContext, useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../config/firestore";
import { updateProfile } from "firebase/auth";
import { db, auth } from "../config/firestore";
import { doc, updateDoc } from 'firebase/firestore';

const StorageContext = createContext();

export function useStorage() {
    return useContext(StorageContext);
}

export const StorageProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);

    const updatePhotoURL = async (newPhotoURL) => {
        const user = auth.currentUser;
        if (user) {
            try {
                await updateProfile(user, { photoURL: newPhotoURL });
                const userDocRef = doc(db, user.uid, "photoURL");
                await updateDoc(userDocRef, {
                    photoURL: newPhotoURL,
                });
            } catch (error) {
                console.error(
                    "Erreur lors de la mise à jour de la photo de profil :",
                    error
                );
            }
        }
    };

    const uploadImage = async (file, id) => {
        const storageRef = ref(storage, `images/${id}/profilePicture.png`);
        setLoading(true);
        try {
            const snapshot = await uploadBytes(storageRef, file);
            const downloadURL = await getDownloadURL(snapshot.ref);
            updatePhotoURL(downloadURL);
            setLoading(false);
        } catch (error) {
            console.error("Upload error:", error);
            setLoading(false);
            throw error;
        }
    };

    const value = { uploadImage, loading };

    return (
        <StorageContext.Provider value={value}>
            {children}
        </StorageContext.Provider>
    );
};
