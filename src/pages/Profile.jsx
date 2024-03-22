import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useStorage } from "../contexts/StorageContext";
import { useUser } from "../contexts/UserContext";
import ModalImage from "react-modal-image";

function Profile() {
    const { user, authUser, sendNewEmailVerification } = useAuth();
    const { uploadImage } = useStorage();
    const { setNewDisplayName, setNewEmail, setNewPassword } = useUser();
    const [activeTab, setActiveTab] = useState("series");
    const [formData, setFormData] = useState({
        displayName: user.displayName || "",
        email: authUser.email || "",
        password: "",
        image: null,
        selectedImage: null,
    });
    const [profileImage, setProfileImage] = useState(null);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        if (user && user.photoURL) {
            setProfileImage(user.photoURL);
        }
    }, [user]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setFormData((prevState) => ({
                    ...prevState,
                    selectedImage: reader.result,
                    image: file,
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (formData.image) {
                await uploadImage(formData.image, user.uid);
            }
            if (
                formData.displayName &&
                formData.displayName !== user.displayName
            ) {
                await setNewDisplayName(formData.displayName);
            }
            if (formData.email && formData.email !== user.email) {
                await setNewEmail(formData.email);
            }
            if (formData.password) {
                await setNewPassword(formData.password);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const togglePasswordVisibility = (e) => {
        e.preventDefault();
        setShowPassword((prevState) => !prevState);
    };

    const handleVerifyEmail = async () => {
        try {
            await sendNewEmailVerification(authUser);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container w-1/2 p-8 mx-auto border rounded">
            <h1 className="mb-4 text-2xl font-bold">Tableau de bord</h1>
            {user && (
                <>
                    <div className="flex items-center gap-4 mb-8">
                        <ModalImage
                            small={profileImage || "https://placehold.co/300"}
                            large={profileImage || "https://placehold.co/600"}
                            imageBackgroundColor="rgba(255, 255, 255, 0.0)"
                            alt={"Photo de profil de " + user.displayName}
                            className="w-20 h-20 rounded-full"
                            hideDownload
                            hideZoom
                        />
                        <p className="text-xl">Bonjour, {user.displayName}</p>
                    </div>

                    <div className="mb-4 border-b-2 border-gray-200">
                        <button
                            className={`mr-4 pb-2 ${
                                activeTab === "series"
                                    ? "border-b-2 border-blue-500"
                                    : ""
                            }`}
                            onClick={() => setActiveTab("series")}
                        >
                            Séries
                        </button>
                        <button
                            className={`mr-4 pb-2 ${
                                activeTab === "calendar"
                                    ? "border-b-2 border-blue-500"
                                    : ""
                            }`}
                            onClick={() => setActiveTab("calendar")}
                        >
                            Calendrier
                        </button>
                        <button
                            className={`mr-4 pb-2 ${
                                activeTab === "settings"
                                    ? "border-b-2 border-blue-500"
                                    : ""
                            }`}
                            onClick={() => setActiveTab("settings")}
                        >
                            Paramètres
                        </button>
                    </div>

                    {activeTab === "series" && (
                        <div>
                            <h2 className="mb-2 text-xl font-semibold">
                                Mes séries
                            </h2>
                            <p>Liste des séries...</p>
                        </div>
                    )}

                    {activeTab === "calendar" && (
                        <div>
                            <h2 className="mb-2 text-xl font-semibold">
                                Mon calendrier
                            </h2>
                            <p>Calendrier hebdomadaire...</p>
                        </div>
                    )}

                    {activeTab === "settings" && (
                        <div>
                            <h2 className="mb-2 text-xl font-semibold">
                                Paramètres
                            </h2>
                            {!user.emailVerified && (
                                <div className="mb-4">
                                    <button
                                        className="px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-700"
                                        onClick={handleVerifyEmail}
                                    >
                                        Valider mon adresse mail
                                    </button>
                                </div>
                            )}
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label
                                        className="block mb-2 text-sm font-bold text-gray-700"
                                        htmlFor="displayName"
                                    >
                                        Nom d'utilisateur
                                    </label>
                                    <input
                                        name="displayName"
                                        className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                        id="displayName"
                                        type="text"
                                        placeholder="Nom d'utilisateur"
                                        value={formData.displayName}
                                        onChange={handleChange}
                                        disabled={!user.emailVerified}
                                    />
                                </div>

                                <div className="mb-4">
                                    <label
                                        className="block mb-2 text-sm font-bold text-gray-700"
                                        htmlFor="email"
                                    >
                                        Email
                                    </label>
                                    <input
                                        name="email"
                                        className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                        id="email"
                                        type="email"
                                        placeholder="Email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        disabled={!user.emailVerified}
                                    />
                                </div>

                                <div className="mb-4">
                                    <label
                                        className="block mb-2 text-sm font-bold text-gray-700"
                                        htmlFor="password"
                                    >
                                        Mot de passe
                                    </label>
                                    <div className="relative">
                                        <input
                                            name="password"
                                            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                            id="password"
                                            type={
                                                showPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            placeholder="Mot de passe"
                                            value={formData.password}
                                            onChange={handleChange}
                                            disabled={!user.emailVerified}
                                        />
                                        <button
                                            className="absolute top-0 right-0 px-3 py-2 text-gray-500 focus:outline-none"
                                            onClick={togglePasswordVisibility}
                                            disabled={!user.emailVerified}
                                        >
                                            {showPassword
                                                ? "Masquer"
                                                : "Afficher"}
                                        </button>
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <label
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        htmlFor="profilePicture"
                                    >
                                        Photo de profil
                                    </label>
                                    <input
                                        type="file"
                                        id="profilePicture"
                                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                        onChange={handleImageChange}
                                        disabled={!user.emailVerified}
                                    />
                                    {formData.selectedImage && (
                                        <img
                                            src={formData.selectedImage}
                                            alt="Aperçu"
                                            className="w-20 h-20 mb-3 rounded-full"
                                        />
                                    )}
                                </div>

                                <div className="flex items-center justify-between">
                                    <button
                                        className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                                        type="submit"
                                        disabled={!user.emailVerified}
                                    >
                                        Sauvegarder
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default Profile;
