import React from "react";
import { Link } from "react-router-dom";
import { useSearch } from "../contexts/SearchContext";

const SearchResultsDropdown = () => {
    const { searchResults, inputSearch } = useSearch();

    // Si aucun résultat n'est trouvé ou aucun recherche n'a été faite, ne rien afficher
    if (searchResults.length === 0 || !inputSearch) {
        return null;
    }

    return (
        <div className="relative">
            <div className="absolute z-10 w-full mt-1 overflow-auto bg-white shadow-lg max-h-60">
                <ul>
                    {searchResults.slice(0, 5).map((result, index) => (
                        <Link to={result.url.split(".net")[1]} key={index}>
                            <li className="flex p-2 text-gray-700 hover:bg-gray-200">
                                <img
                                    className="w-16"
                                    src={result.images.jpg.large_image_url}
                                    alt={result.title}
                                />
                                <h3 className="text-lg font-semibold text-gray-700">
                                    {result.title}
                                </h3>
                                <p className="text-gray-700 line-clamp-3">
                                    {result.synopsis}
                                </p>
                            </li>
                        </Link>
                    ))}
                </ul>
                {searchResults.length > 5 && (
                    <div className="p-2 text-center">
                        <Link
                            to={`/search?query=${inputSearch}`}
                            className="text-blue-500 hover:underline"
                        >
                            Voir tous les résultats
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchResultsDropdown;
