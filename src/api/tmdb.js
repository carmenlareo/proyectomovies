import axios from 'axios';

const tmdbClient = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  // Quitamos la cabecera 'Authorization' que daba el error 401
  params: {
    api_key: import.meta.env.VITE_TMDB_TOKEN, // TMDB v3 pide la clave como un parámetro en la URL
    language: 'es-ES'
  }
});

export default tmdbClient;