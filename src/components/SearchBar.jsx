import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSearch } from "../contexts/SearchContext"; // Assurez-vous que c'est le bon chemin d'import
import { useDebounce } from "../hooks/"; // Vérifiez également ce chemin
import SearchResultsDropdown from "./SearchResultsDropdown"; // Importez le composant du menu volant

const SearchBar = () => {
    const { inputSearch, setInputSearch, setSearchResults, setIsLoading } = useSearch();
    const debouncedSearchTerm = useDebounce(inputSearch, 500);
    const [isInputFocused, setIsInputFocused] = useState(false);

    useEffect(() => {
        if (debouncedSearchTerm) {
            const fetchData = async () => {
                try {
                    setIsLoading(true);
                    const response = await axios.get(
                        `https://api.jikan.moe/v4/anime?q=${debouncedSearchTerm}`
                    );
                    setSearchResults(response.data.data);
                } catch (error) {
                    console.error("Erreur lors de la recherche :", error);
                } finally {
                    setIsLoading(false);
                }
            };

            fetchData();
        }
    }, [debouncedSearchTerm, setIsLoading, setSearchResults]);

    const handleSubmit = (e) => {
        e.preventDefault();
        // La logique pour gérer la soumission du formulaire si nécessaire
    };

    const handleFocus = () => {
        setIsInputFocused(true);
    };

    const handleBlur = () => {
        setIsInputFocused(false);
    };

    return (
        <div className="relative w-full">
            <form onSubmit={handleSubmit} className="p-8">
                <label htmlFor="searchInput" className="sr-only">
                    Rechercher
                </label>
                <div className="relative flex">
                    <input
                        type="search"
                        id="searchInput"
                        className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Rechercher une série..."
                        required
                        value={inputSearch}
                        onChange={(e) => setInputSearch(e.target.value)}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                    />
                    <button
                        type="submit"
                        className="absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-white"
                    >
                        Rechercher
                    </button>
                </div>
            </form>
            {isInputFocused && inputSearch && <SearchResultsDropdown />}
        </div>
    );
};

export default SearchBar;
