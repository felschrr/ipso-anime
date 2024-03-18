

import React from "react";
import axios from "axios";
import { useSearchContext } from "../contexts/SearchContext";

const SearchLogic = () => {
    const { setSearchResults, setInputSearch, setIsLoading, inputSearch } = useSearchContext();

    const fetchData = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(`https://api.jikan.moe/v4/anime?q=${inputSearch}`);
            setSearchResults(response.data.data);
        } catch (error) {
            console.error("Erreur lors de la recherche :", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchData();
    };

    return (
        <form onSubmit={handleSubmit} className="w-full md:w-3/4 lg:w-1/2">
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
                />
                <button
                    type="submit"
                    className="absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-white"
                >
                    Rechercher
                </button>
            </div>
        </form>
    );
};

export default SearchLogic;
