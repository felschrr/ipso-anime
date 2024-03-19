// trendingContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const TrendingContext = createContext();

// Custom hook for using context in a simpler way
export const useTrendingContext = () => useContext(TrendingContext);

const TrendingProvider = ({ children }) => {
  const [animeTrending, setAnimeTrending] = useState([]);
  const [mangaTrending, setMangaTrending] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchTrending = async () => {
      setIsLoading(true);
      try {
        const [animeResponse, mangaResponse] = await Promise.all([
          axios.get('https://api.jikan.moe/v4/top/anime'),
          axios.get('https://api.jikan.moe/v4/top/manga')
        ]);
        setAnimeTrending(animeResponse.data.data);
        setMangaTrending(mangaResponse.data.data);
      } catch (error) {
        console.error('Error fetching trending:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrending();
  }, []);

  return (
    <TrendingContext.Provider value={{ animeTrending, mangaTrending, isLoading }}>
      {children}
    </TrendingContext.Provider>
  );
};

export { TrendingContext, TrendingProvider };
