export const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/';
export const TMDB_POSTER_SIZE = 'w500';

/**
 * Función utilitaria para construir la URL completa de un póster
 * @param {string} backdropPath - El fragmento de ruta que te da la API
 * @returns {string} URL completa lista para usar en una etiqueta <img>
 */
export const getFullPosterUrl = (backdropPath) => {
  if (!backdropPath) return 'https://via.placeholder.com/500x750?text=No+Image'; // Imagen de respaldo por si no hay póster
  return `${TMDB_IMAGE_BASE_URL}${TMDB_POSTER_SIZE}${backdropPath}`;
};