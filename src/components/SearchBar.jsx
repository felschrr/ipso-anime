import { useEffect } from "react";
import axios from "axios";
import { useSearchContext } from "../contexts/SearchContext";
import { useDebounce } from "../hooks/";
import { useSearchParams } from "react-router-dom";

const SearchBar = () => {
    const { setSearchResults, setInputSearch, setIsLoading, inputSearch } =
        useSearchContext();
    const debouncedSearchTerm = useDebounce(inputSearch, 500);
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        // Récupère la requête de recherche à partir de l'URL lors du chargement initial du composant
        const urlQuery = searchParams.get("query");
        if (urlQuery && urlQuery !== inputSearch) {
            setInputSearch(urlQuery);
        }
    }, []); // S'exécute une seule fois à l'initialisation

    useEffect(() => {
        if (debouncedSearchTerm) {
            const fetchData = async () => {
                try {
                    setIsLoading(true);
                    const response = await axios.get(
                        `https://api.jikan.moe/v4/anime?q=${debouncedSearchTerm}`
                    );
                    setSearchResults(response.data.data);
                    setSearchParams({ query: debouncedSearchTerm });
                } catch (error) {
                    console.error("Erreur lors de la recherche :", error);
                } finally {
                    setIsLoading(false);
                }
            };

            fetchData();
        }
    }, [debouncedSearchTerm, setIsLoading, setSearchResults, setSearchParams]);

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <div className="w-1/3">
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
                    />
                    <button
                        type="submit"
                        className="absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-white"
                    >
                        Rechercher
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SearchBar;
