import React, { createContext, useContext, useState } from "react";

const SearchContext = createContext();

export const useSearchContext = () => useContext(SearchContext);

export const SearchProvider = ({ children }) => {
    const [searchResults, setSearchResults] = useState([]);
    const [inputSearch, setInputSearch] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    return (
        <SearchContext.Provider value={{ searchResults, setSearchResults, inputSearch, setInputSearch, isLoading, setIsLoading }}>
            {children}
        </SearchContext.Provider>
    );
};

export default SearchContext;
