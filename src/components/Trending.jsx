import { useTrendingContext } from "../contexts/TrendingContext";
import { TrendingList } from "../components/";

const Trending = () => {
    const { animeTrending, mangaTrending, isLoading } = useTrendingContext();
    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex flex-col items-center justify-center w-full">
                {isLoading ? (
                    <div className="mt-8">
                        <p className="text-white">Chargement en cours...</p>
                    </div>
                ) : (
                    <>
                        <h2 className="mt-8 text-2xl font-bold text-gray-700">
                            Anime Trending
                        </h2>
                        {animeTrending && animeTrending.length > 0 ? (
                            <TrendingList seriesList={animeTrending} source="anime"/>
                        ) : (
                            <p className="text-white">
                                Aucune recommandation d'anime trouvée.
                            </p>
                        )}

                        <h2 className="mt-8 text-2xl font-bold text-gray-700">
                            Manga Trending
                        </h2>
                        {mangaTrending && mangaTrending.length > 0 ? (
                            <TrendingList seriesList={mangaTrending} source="manga"/>
                        ) : (
                            <p className="text-white">
                                Aucune recommandation de manga trouvée.
                            </p>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Trending;
