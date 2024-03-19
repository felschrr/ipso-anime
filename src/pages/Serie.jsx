import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';

const Serie = () => {
  const [serieData, setSerieData] = useState(null);
  const { type, id } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`https://api.jikan.moe/v4/${type}/${id}`);
        setSerieData(response.data.data);
      } catch (error) {
        console.error('Erreur lors de la récupération de la série :', error);
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
    <div className="max-w-screen-md p-8 mx-auto">
      {isLoading ? (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="poster">
            <Skeleton height={400} />
          </div>
          <div className="details">
            <h2 className="mb-4 text-2xl font-bold"><Skeleton /></h2>
            <p><Skeleton count={5} /></p>
          </div>
        </div>
      ) : serieData ? (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="poster">
            <img className="w-full rounded-lg" src={serieData.images.jpg.large_image_url} alt={serieData.title} />
          </div>
          <div className="details">
            <h2 className="mb-4 text-2xl font-bold">{serieData.title}</h2>
            <p>{serieData.synopsis}</p>
            <p className="mt-4">Type: {serieData.type}</p>
            <p>Nombre d'épisodes: {serieData.episodes}</p>
            <p>Status: {serieData.status}</p>
            <p>Durée: {serieData.duration}</p>
            <p>Note: {serieData.score}</p>
            <p>Genres: {serieData.genres.map(genre => genre.name).join(', ')}</p>
          </div>
          {serieData.trailer && (
            <div className="trailer">
              <h3 className="mb-4 text-xl font-bold">Trailer</h3>
              <div className="aspect-w-16 aspect-h-9">
                <iframe
                  className="w-full h-full rounded-lg"
                  src={serieData.trailer.embed_url}
                  title={serieData.title}
                  allowFullScreen
                  autoPlay="0"
                  rel="0"
                  modestbranding="1"
                ></iframe>
              </div>
            </div>
          )}
        </div>
      ) : (
        <p className="text-center">Aucune série trouvée.</p>
      )}
    </div>
  );
};

export default Serie;
