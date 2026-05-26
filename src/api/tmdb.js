const API_KEY = import.meta.env.VITE_TMDB_TOKEN;
const BASE_URL = 'https://api.themoviedb.org/3';
export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

// IDs oficiales de TMDB para los géneros que tienes en tu interfaz
export const GENRES = {
  All: null,
  Action: 28,
  Comedy: 35,
  Drama: 18,
  'Sci-Fi': 878
};

/**
 * Obtiene las películas desde TMDB.
 * Si recibe un genreId, filtra usando 'discover', si no, trae las populares.
 */
export const getMovies = async (genreId = null) => {
  let url = `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=es-ES&page=1`;

  if (genreId) {
    url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=es-ES&with_genres=${genreId}&sort_by=popularity.desc&page=1`;
  }

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Error al conectar con la API de TMDB');
    }
    const data = await response.json();
    return data.results; // Retorna el array con las 20 películas
  } catch (error) {
    console.error("Error cargando películas:", error);
    return [];
  }
};
