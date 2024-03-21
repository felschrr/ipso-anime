import { useEffect } from "react";
import { useSearch } from "../contexts/SearchContext";
import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";

const Search = () => {
    const { setInputSearch, searchResults, isLoading } = useSearch();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const urlQuery = searchParams.get("query");
        if (urlQuery) {
            setInputSearch(urlQuery);
        }
    }, [searchParams, setInputSearch]);

    return (
        <div className="flex justify-center align-middle">
            <div className="max-w-4xl mx-auto">
                <div className="flex flex-col items-center justify-center w-full">
                    {isLoading ? (
                        <div className="mt-8">
                            <p className="text-white">Chargement en cours...</p>
                        </div>
                    ) : searchResults && searchResults.length > 0 ? (
                        <div className="grid gap-8 mt-12 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {searchResults.map((result, i) => (
                                <Link
                                    to={result.url.split(".net")[1]}
                                    key={i}
                                    className="overflow-hidden bg-white rounded-lg shadow-md"
                                >
                                    <img
                                        className="object-cover w-full h-96"
                                        src={result.images.jpg.large_image_url}
                                        alt={result.title}
                                    />
                                    <div className="p-4">
                                        <h3 className="text-lg font-semibold text-gray-700">
                                            {result.title}
                                        </h3>
                                        <p className="text-gray-700 line-clamp-3">
                                            {result.synopsis}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <p className="text-white">Aucun résultat trouvé.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Search;
