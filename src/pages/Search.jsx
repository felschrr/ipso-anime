import React from "react";
import {SearchBar, SearchResults} from "../components";
import { SearchProvider } from "../contexts/SearchContext";

const Search = () => {
    return (
        <SearchProvider>
            <div className="flex justify-center align-middle">
                <SearchBar />
            </div>
            <SearchResults />
        </SearchProvider>
    );
};

export default Search;
