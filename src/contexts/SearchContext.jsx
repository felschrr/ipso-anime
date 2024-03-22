import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SearchContext = createContext();

export const useSearch = () => useContext(SearchContext);

export const SearchProvider = ({ children }) => {
    const [searchResults, setSearchResults] = useState([]);
    const [inputSearch, setInputSearch] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [category, setCategory] = useState("anime");

    const navigate = useNavigate();

    const updateSearchParam = (newQuery) => {
        navigate(`/search?query=${newQuery}`);
    };

    const search = async (searchQuery, searchCategory) => {
        try {
            setIsLoading(true);
            const response = await axios.get(
                `https://api.jikan.moe/v4/${searchCategory}?q=${searchQuery}`
            );
            setSearchResults(response.data.data);
        } catch (error) {
            console.error("Erreur lors de la recherche :", error);
        } finally {
            setIsLoading(false);
        }
    };

    const value = {
        updateSearchParam,
        searchResults,
        setSearchResults,
        inputSearch,
        setInputSearch,
        isLoading,
        setIsLoading,
        category,
        setCategory,
        search,
    };

    return (
        <SearchContext.Provider value={value}>
            {children}
        </SearchContext.Provider>
    );
};
