import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import ModalImage from "react-modal-image";

const Serie = () => {
    const [serieData, setSerieData] = useState(null);
    const { type, id } = useParams();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get(
                    `https://api.jikan.moe/v4/${type}/${id}`
                );
                setSerieData(response.data.data);
                console.log(response.data.data)
            } catch (error) {
                console.error(
                    "Erreur lors de la récupération de la série :",
                    error
                );
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
        return () => {
            setSerieData(null);
        };
    }, [id]);

    return (
        <div className="max-w-screen-lg p-8 mx-auto">
            {isLoading ? (
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                    <div className="poster">
                        <Skeleton height={400} />
                    </div>
                    <div className="details">
                        <h2 className="mb-4 text-2xl font-bold">
                            <Skeleton />
                        </h2>
                        <p>
                            <Skeleton count={5} />
                        </p>
                    </div>
                </div>
            ) : serieData ? (
                <>
                    <div className="grid grid-cols-1 gap-8 mb-8 md:grid-cols-2">
                        <div className="poster">
                            <ModalImage
                                className="w-full rounded-lg"
                                small={serieData.images.webp.large_image_url}
                                large={serieData.images.webp.large_image_url}
                                alt={serieData.title}
                                hideDownload
                            />
                        </div>
                        <div className="details">
                            <h2 className="mb-4 text-2xl font-bold">
                                {serieData.title}
                            </h2>
                            <p>
                                {serieData.synopsis.replace(
                                    "[Written by MAL Rewrite]",
                                    ""
                                )}
                            </p>
                            <ul className="mt-8">
                                <li>
                                    <strong>Type : </strong>
                                    {serieData.type}
                                </li>
                                <li>
                                    <strong>Nombre d'épisodes</strong> :
                                    {serieData.episodes}
                                </li>
                                <li>
                                    <strong>Status </strong>: {serieData.status}
                                </li>
                                <li>
                                    <strong>Durée </strong>:{" "}
                                    {serieData.duration}
                                </li>
                                <li>
                                    <strong>Note </strong>: {serieData.score}
                                </li>
                                <li>
                                    <strong>Genres : </strong>
                                    {serieData.genres
                                        .map((genre) => genre.name)
                                        .join(", ")}
                                </li>
                            </ul>
                        </div>
                    </div>
                    {serieData.trailer.embed_url && (
                        <div className="w-3/4 h-full mx-auto trailer">
                            <h3 className="mb-4 text-xl font-bold">Trailer</h3>
                            <div className="aspect-video">
                                <iframe
                                    className="w-full h-full rounded-lg"
                                    src={
                                        serieData.trailer.embed_url.split(
                                            "?"
                                        )[0]
                                    }
                                    title={serieData.title}
                                    allowFullScreen
                                    rel="0"
                                    modestbranding="1"
                                ></iframe>
                            </div>
                        </div>
                    )}
                </>
            ) : (
                <p className="text-center">Aucune série trouvée.</p>
            )}
        </div>
    );
};

export default Serie;
