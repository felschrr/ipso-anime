import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchContext = createContext();

export const useSearch = () => useContext(SearchContext);

export const SearchProvider = ({ children }) => {
    const [searchResults, setSearchResults] = useState([]);
    const [inputSearch, setInputSearch] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate(); 

    const updateSearchParam = (newQuery) => {
        navigate(`/search?query=${newQuery}`);
    };

    const value = {
        updateSearchParam,
        searchResults,
        setSearchResults,
        inputSearch,
        setInputSearch,
        isLoading,
        setIsLoading,
    };

    return (
        <SearchContext.Provider value={value}>
            {children}
        </SearchContext.Provider>
    );
};
