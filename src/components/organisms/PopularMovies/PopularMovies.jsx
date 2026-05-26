import { useEffect, useState } from 'react';
import tmdbClient from '../../../api/tmdb'; 
import FavoriteButton from '../../atoms/FavoriteButton/FavoriteButton';
// 1. Importamos los estilos del módulo de CSS
import styles from './PopularMovies.module.css'; 

function PopularMovies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const response = await tmdbClient.get('/movie/popular');
        setMovies(response.data.results);
      } catch (err) {
        console.error(err);
        setError('Error al conectar con TMDB.');
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) return <div className={styles.center}>Cargando películas...</div>;
  if (error) return <div className={styles.center} style={{ color: '#ff4a4a' }}>{error}</div>;

  return (
    // 2. Cambiamos 'style={styles...}' por 'className={styles...}'
    <section className={styles.organismContainer}>
      <h2 className={styles.organismTitle}>Películas Más Populares</h2>
      
      <div className={styles.grid}>
        {movies.map((movie) => (
          <article key={movie.id} className={styles.card}>
            
            {/* Contenedor con position relative para que el corazón flote */}
            <div className={styles.imageContainer}>
              <img 
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                alt={movie.title} 
                className={styles.image}
                loading="lazy"
              />
              
              {/* Contenedor flotante absoluto para el corazón */}
              <div className={styles.favoriteOverlay}>
                <FavoriteButton movie={movie} />
              </div>
            </div>

            <div className={styles.cardContent}>
              <h3 className={styles.movieTitle}>{movie.title}</h3>
              <div className={styles.meta}>
                <span className={styles.rating}>⭐ {movie.vote_average.toFixed(1)}</span>
                <span className={styles.date}>{movie.release_date ? movie.release_date.split('-')[0] : ''}</span>
              </div>
            </div>

          </article>
        ))}
      </div>
    </section>
  );
}

export default PopularMovies;