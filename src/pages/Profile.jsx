import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useStorage } from "../contexts/StorageContext";
import { useUser } from "../contexts/UserContext";
import ModalImage from "react-modal-image";

function Profile() {
    const { user } = useAuth();
    const { updatePhotoURL } = useUser();
    const { uploadImage } = useStorage();
    const [activeTab, setActiveTab] = useState("series");
    const [selectedImage, setSelectedImage] = useState(null);
    const [image, setImage] = useState(null);


    // Fonction pour changer l'onglet actif
    const changeTab = (tab) => {
        setActiveTab(tab);
    };

    // Fonction appelée lorsque l'utilisateur sélectionne une image
    const handleImageChange = (e) => {
        // console.log(e.target.files);
        const file = e.target.files[0];
        // Vérifie si un fichier a été sélectionné
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setSelectedImage(reader.result);
            };
            reader.readAsDataURL(file);
            setImage(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        try{
            uploadImage(image, user.uid)
            // window.location.reload();
        } catch(e){
            console.error(e)
        }
    };

    return (
        <div className="container w-1/2 p-8 mx-auto border rounded">
            <h1 className="mb-4 text-2xl font-bold">Tableau de bord</h1>
            {user && (
                <>
                    <div className="flex items-center gap-4 mb-8">
                        <ModalImage
                            small={user.photoURL || "https://placehold.co/300"}
                            large={user.photoURL || "https://placehold.co/600"}
                            imageBackgroundColor="rgba(255, 255, 255, 0.0)"
                            alt={"Photo de profil de " + user.username}
                            className="w-20 h-20 rounded-full"
                            hideDownload
                            hideZoom
                        />
                        <p className="text-xl">Bonjour, {user.username}</p>
                    </div>

                    <div className="mb-4 border-b-2 border-gray-200">
                        <button
                            className={`mr-4 pb-2 ${
                                activeTab === "series"
                                    ? "border-b-2 border-blue-500"
                                    : ""
                            }`}
                            onClick={() => changeTab("series")}
                        >
                            Séries
                        </button>
                        <button
                            className={`mr-4 pb-2 ${
                                activeTab === "calendar"
                                    ? "border-b-2 border-blue-500"
                                    : ""
                            }`}
                            onClick={() => changeTab("calendar")}
                        >
                            Calendrier
                        </button>
                        <button
                            className={`mr-4 pb-2 ${
                                activeTab === "settings"
                                    ? "border-b-2 border-blue-500"
                                    : ""
                            }`}
                            onClick={() => changeTab("settings")}
                        >
                            Paramètres
                        </button>
                    </div>

                    {activeTab === "series" && (
                        <div>
                            <h2 className="mb-2 text-xl font-semibold">
                                Mes séries
                            </h2>
                            {/* Insérez ici la logique d'affichage des séries de l'utilisateur */}
                            <p>Liste des séries...</p>
                        </div>
                    )}

                    {activeTab === "calendar" && (
                        <div>
                            <h2 className="mb-2 text-xl font-semibold">
                                Mon calendrier
                            </h2>
                            {/* Insérez ici la logique d'affichage du calendrier de l'utilisateur */}
                            <p>Calendrier hebdomadaire...</p>
                        </div>
                    )}

                    {activeTab === "settings" && (
                        <div>
                            <h2 className="mb-2 text-xl font-semibold">
                                Paramètres
                            </h2>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label
                                        className="block mb-2 text-sm font-bold text-gray-700"
                                        htmlFor="username"
                                    >
                                        Nom d'utilisateur
                                    </label>
                                    <input
                                        className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                        id="username"
                                        type="text"
                                        placeholder="Nom d'utilisateur"
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
                                        className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                        id="email"
                                        type="email"
                                        placeholder="Email"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label
                                        className="block mb-2 text-sm font-bold text-gray-700"
                                        htmlFor="password"
                                    >
                                        Mot de passe
                                    </label>
                                    <input
                                        className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                        id="password"
                                        type="password"
                                        placeholder="Mot de passe"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label
                                        className="block mb-2 text-sm font-bold text-gray-700"
                                        htmlFor="profilePicture"
                                    >
                                        Photo de profil
                                    </label>
                                    <input
                                        className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                        id="profilePicture"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                    />
                                    {selectedImage ? (
                                        <ModalImage
                                            small={selectedImage}
                                            large={selectedImage}
                                            src={selectedImage}
                                            imageBackgroundColor="rgba(255, 255, 255, 0.0)"
                                            alt="New profile picture"
                                            className="object-cover w-20 h-20 rounded-full"
                                            hideDownload
                                            hideZoom
                                        />
                                    ) : (
                                        ""
                                    )}
                                </div>
                                <button
                                    className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                                    type="submit"
                                >
                                    Update
                                </button>
                            </form>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default Profile;
