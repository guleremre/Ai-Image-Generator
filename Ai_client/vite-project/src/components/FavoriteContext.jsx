// FavoriteContext.js
import { createContext, useContext, useState } from "react";

const FavoriteContext = createContext();

export function useFavorite() {
  return useContext(FavoriteContext);
}

export function FavoriteProvider({ children }) {
  const [favoriteImages, setFavoriteImages] = useState([]);

  const addFavorite = (image) => {
    setFavoriteImages((prevFavorites) => [...prevFavorites, image]);
  };

  const removeFavorite = (imageId) => {
    setFavoriteImages((prevFavorites) =>
      prevFavorites.filter((image) => image._id !== imageId)
    );
  };

  return (
    <FavoriteContext.Provider
      value={{ favoriteImages, addFavorite, removeFavorite }}
    >
      {children}
    </FavoriteContext.Provider>
  );
}
