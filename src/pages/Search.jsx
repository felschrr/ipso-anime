import React from "react";
import {SearchLogic, SearchResults} from "../components";
import { SearchProvider } from "../contexts/SearchContext";

const Search = () => {
    return (
        <SearchProvider>
            <SearchLogic />
            <SearchResults />
        </SearchProvider>
    );
};

export default Search;
