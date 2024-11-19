// MovieContext.js
import React, { createContext, useState } from 'react';

export const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [watched, setWatched] = useState([]);
  const [toWatch, setToWatch] = useState([]);

  const addToList = (movie, status) => {
    if (status === 'Watched') {
      setWatched(prevList => [...prevList, movie]);
      setToWatch(prevList => prevList.filter(item => item.id !== movie.id));
    } else if (status === 'To Watch') {
      setToWatch(prevList => [...prevList, movie]);
      setWatched(prevList => prevList.filter(item => item.id !== movie.id));
    }
  };

  return (
    <MovieContext.Provider value={{ watched, toWatch, addToList }}>
      {children}
    </MovieContext.Provider>
  );
};
