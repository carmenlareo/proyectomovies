import { createContext, useState, useContext } from 'react';

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  // Función para añadir o quitar de favoritos (Toggle)
  const toggleFavorite = (movie) => {
    setFavorites((prevFavorites) => {
      const isAlreadyFav = prevFavorites.some((fav) => fav.id === movie.id);
      if (isAlreadyFav) {
        // Si ya está, lo quitamos
        return prevFavorites.filter((fav) => fav.id !== movie.id);
      } else {
        // Si no está, lo añadimos
        return [...prevFavorites, movie];
      }
    });
  };

  // Función rápida para saber si una película específica es favorita
  const isFavorite = (movieId) => favorites.some((fav) => fav.id === movieId);

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

// Hook personalizado para usarlo más fácil en los componentes
export const useFavorites = () => useContext(FavoritesContext);