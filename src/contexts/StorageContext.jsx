import React, { createContext, useContext, useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../config/firestore";
import { useUser } from "./UserContext"

const StorageContext = createContext();

export function useStorage() {
    return useContext(StorageContext);
}

export const StorageProvider = ({ children }) => {
    
    const [loading, setLoading] = useState(false);
    const {updatePhotoURL} = useUser();

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
