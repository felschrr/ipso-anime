import React from "react";
import { Link } from "react-router-dom";
import { useSearch } from "../contexts/SearchContext";

const SearchResultsDropdown = () => {
    const { searchResults, inputSearch, category } = useSearch();

    // Si aucun résultat n'est trouvé ou aucune recherche n'a été faite, ne rien afficher
    if (searchResults.length === 0 || !inputSearch) {
        return null;
    }

    // Rendu pour les catégories anime et manga
    if (category === "anime" || category === "manga") {
        return (
            <div className="relative">
                <div className="absolute z-10 w-full overflow-auto bg-white shadow-lg">
                    <ul>
                        {searchResults.slice(0, 5).map((result, index) => (
                            <Link
                                to={result.url.split(".net")[1]}
                                key={index}
                                onMouseDown={(e) => e.preventDefault()}
                            >
                                <li className="flex items-center p-2 text-gray-700 hover:bg-gray-200">
                                    <img
                                        className="flex-none object-cover w-12"
                                        src={result.images.webp.large_image_url}
                                        alt={result.title}
                                    />
                                    <div className="flex flex-col justify-between ml-4">
                                        <h3 className="text-lg font-semibold text-gray-700">
                                            {result.title}
                                        </h3>
                                        <p className="text-gray-700 line-clamp-3">
                                            {result.synopsis}
                                        </p>
                                    </div>
                                </li>
                            </Link>
                        ))}
                    </ul>

                    {searchResults.length > 5 && (
                        <Link
                            to={`/search?query=${inputSearch}`}
                            onMouseDown={(e) => e.preventDefault()}
                        >
                            <div className="p-2 text-center text-blue-500 hover:bg-gray-200 hover:underline">
                                Voir tous les résultats
                            </div>
                        </Link>
                    )}
                </div>
            </div>
        );
    } else if (category === "users") {
        return (
            <div className="relative">
                <div className="absolute z-10 w-full overflow-auto bg-white shadow-lg">
                    <ul>
                        {searchResults.slice(0, 5).map((result, index) => (
                            <Link
                                to={result.url.split(".net")[1]}
                                key={index}
                                onMouseDown={(e) => e.preventDefault()}
                            >
                                <li
                                    className="flex items-center p-2 text-gray-700 hover:bg-gray-200"
                                    key={index}
                                >
                                    <img
                                        className="flex-none object-cover w-12"
                                        src={result.images.webp.image_url}
                                        alt={`${result.username} profil picture`}
                                    />
                                    <div className="flex flex-col justify-between ml-4">
                                        <h3 className="text-lg font-semibold text-gray-700">
                                            {result.username}
                                        </h3>
                                    </div>
                                </li>
                            </Link>
                        ))}
                    </ul>

                    {searchResults.length > 5 && (
                        <Link
                            to={`/search?query=${inputSearch}`}
                            onMouseDown={(e) => e.preventDefault()}
                        >
                            <div className="p-2 text-center text-blue-500 hover:bg-gray-200 hover:underline">
                                Voir tous les résultats
                            </div>
                        </Link>
                    )}
                </div>
            </div>
        );
    }
};

export default SearchResultsDropdown;
