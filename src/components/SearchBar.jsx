import React, { useEffect, useState } from "react";
import { useSearch } from "../contexts/SearchContext";
import { useDebounce } from "../hooks/";
import SearchResultsDropdown from "./SearchResultsDropdown";

const SearchBar = () => {
    const {
        inputSearch,
        setInputSearch,
        setSearchResults,
        setIsLoading,
        category,
        setCategory,
        search,
    } = useSearch();
    const debouncedSearchTerm = useDebounce(inputSearch, 500);
    const [isInputFocused, setIsInputFocused] = useState(false);

    useEffect(() => {
        if (debouncedSearchTerm) {
            search(debouncedSearchTerm, category);
        }
    }, [debouncedSearchTerm, category]);

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const handleFocus = () => {
        setIsInputFocused(true);
    };

    const handleBlur = () => {
        setIsInputFocused(false);
    };

    return (
        <div className="relative w-1/2">
            <form
                onSubmit={handleSubmit}
                autoComplete="off"
                className="rounded-md"
            >
                <label htmlFor="searchInput" className="sr-only">
                    Rechercher
                </label>
                <div className="relative flex items-center">
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="p-4 pr-10 text-sm text-gray-700 bg-gray-300 border-r appearance-none rounded-bl-md rounded-tl-md"
                    >
                        <option value="anime">Anime</option>
                        <option value="manga">Manga</option>
                        <option value="users">Users</option>
                    </select>
                    <input
                        type="search"
                        id="searchInput"
                        className="block w-full p-4 text-sm text-gray-900 border-none rounded-tr-md rounded-br-md bg-gray-50 "
                        placeholder="Rechercher une série..."
                        required
                        value={inputSearch}
                        onChange={(e) => setInputSearch(e.target.value)}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                    />
                </div>
            </form>
            {isInputFocused && inputSearch && <SearchResultsDropdown />}
        </div>
    );
};

export default SearchBar;
