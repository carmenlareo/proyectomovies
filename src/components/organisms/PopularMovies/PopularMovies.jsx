import { useEffect, useState } from 'react';
// Mantenemos tu importación exacta subiendo tres niveles
import tmdbClient from '../../../api/tmdb'; 
// Importación correcta del átomo con su ruta revisada
import FavoriteButton from '../../atoms/FavoriteButton/FavoriteButton';
// Tus estilos encapsulados en CSS Modules
import styles from './PopularMovies.module.css'; 

// Diccionario oficial de IDs de géneros requeridos por la API de TMDB
const GENRE_MAP = {
  'All': null,
  'Action': 28,
  'Comedy': 35,
  'Drama': 18,
  'Sci-Fi': 878
};

// Recibimos 'activeCategory' como prop con un valor por defecto seguro
function PopularMovies({ activeCategory = 'All' }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError(null); // Limpiamos errores previos al cambiar de categoría
        
        let response;
        const genreId = GENRE_MAP[activeCategory];

        // Si la categoría seleccionada es 'All' pedimos las populares normales.
        // Si es un género específico, cambiamos el endpoint a '/discover/movie'.
        if (activeCategory === 'All' || !genreId) {
          response = await tmdbClient.get('/movie/popular');
        } else {
          response = await tmdbClient.get('/discover/movie', {
            params: {
              with_genres: genreId,
              sort_by: 'popularity.desc' // Asegura traer las más populares de ese género
            }
          });
        }
        
        setMovies(response.data.results);
      } catch (err) {
        console.error(err);
        setError('Error al conectar con TMDB o cargar el contenido.');
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
    // Agregamos activeCategory como dependencia para re-ejecutar la petición automáticamente
  }, [activeCategory]); 

  if (loading) return <div className={styles.center}>Cargando películas...</div>;
  if (error) return <div className={styles.center} style={{ color: '#ff4a4a' }}>{error}</div>;

  return (
    <section className={styles.organismContainer}>
      {/* El título cambia dinámicamente según la categoría activa */}
      <h2 className={styles.organismTitle}>
        {activeCategory === 'All' ? 'Películas Más Populares' : `Películas de ${activeCategory}`}
      </h2>
      
      <div className={styles.grid}>
        {movies.length === 0 ? (
          <p style={{ color: '#808080', gridColumn: '1/-1', textAlign: 'center', padding: '40px' }}>
            No se encontraron películas disponibles para esta categoría.
          </p>
        ) : (
          movies.map((movie) => (
            <article key={movie.id} className={styles.card}>
              
              {/* Contenedor relativo para posicionar el corazón en la esquina */}
              <div className={styles.imageContainer}>
                <img 
                  src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://via.placeholder.com/500x750?text=No+Poster'} 
                  alt={movie.title} 
                  className={styles.image}
                  loading="lazy"
                />
                
                {/* Capa superpuesta absoluta para renderizar tu FavoriteButton */}
                <div className={styles.favoriteOverlay}>
                  <FavoriteButton movie={movie} />
                </div>
              </div>

              {/* Contenido textual inferior de la tarjeta */}
              <div className={styles.cardContent}>
                <h3 className={styles.movieTitle}>{movie.title}</h3>
                <div className={styles.meta}>
                  <span className={styles.rating}>⭐ {movie.vote_average ? movie.vote_average.toFixed(1) : '0.0'}</span>
                  <span className={styles.date}>
                    {movie.release_date ? movie.release_date.split('-')[0] : ''}
                  </span>
                </div>
              </div>

            </article>
          ))
        )}
      </div>
    </section>
  );
}

export default PopularMovies;