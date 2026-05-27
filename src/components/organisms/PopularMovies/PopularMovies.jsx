import { useEffect, useState, useRef, useCallback } from 'react';
import tmdbClient from '../../../api/tmdb'; 
import FavoriteButton from '../../atoms/FavoriteButton/FavoriteButton';
import styles from './PopularMovies.module.css'; 

const GENRE_MAP = {
  'All': null,
  'Action': 28,
  'Comedy': 35,
  'Drama': 18,
  'Sci-Fi': 878
};

function PopularMovies({ activeCategory = 'All' }) {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [selectedMovie, setSelectedMovie] = useState(null);

  // Referencia para el Intersection Observer
  const observer = useRef();

  // Resetear estados cuando cambia la categoría activa
  useEffect(() => {
    setMovies([]);
    setPage(1);
    setHasMore(true);
    setError(null);
  }, [activeCategory]);

  // Petición a la API basada en la página y la categoría actual
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError(null);
        
        let response;
        const genreId = GENRE_MAP[activeCategory];

        if (activeCategory === 'All' || !genreId) {
          response = await tmdbClient.get('/movie/popular', {
            params: { page: page }
          });
        } else {
          response = await tmdbClient.get('/discover/movie', {
            params: {
              with_genres: genreId,
              sort_by: 'popularity.desc',
              page: page
            }
          });
        }
        
        const newMovies = response.data.results;
        
        // Acumular películas anteriores con las nuevas distribuidas por TMDB
        setMovies(prevMovies => [...prevMovies, ...newMovies]);
        
        // Verificar si llegamos al límite de páginas que ofrece TMDB
        if (newMovies.length === 0 || response.data.page >= response.data.total_pages) {
          setHasMore(false);
        }
      } catch (err) {
        console.error(err);
        setError('Error al conectar con TMDB.');
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [activeCategory, page]);

  // Callback ref para interceptar el scroll en la última tarjeta del grid
  const lastMovieElementRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => prevPage + 1);
      }
    });

    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  return (
    <section className={styles.organismContainer}>
      <h2 className={styles.organismTitle}>
        {activeCategory === 'All' ? 'Películas Más Populares' : `Películas de ${activeCategory}`}
      </h2>
      
      <div className={styles.grid}>
        {movies.map((movie, index) => {
          const isLastElement = movies.length === index + 1;
          
          return (
            <article 
              key={`${movie.id}-${index}`} // Combinación segura por si TMDB duplica un ID en respuestas adyacentes
              ref={isLastElement ? lastMovieElementRef : null}
              className={styles.card}
              onClick={() => setSelectedMovie(movie)}
              style={{ cursor: 'pointer' }}
            >
              <div className={styles.imageContainer}>
                <img 
                  src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://via.placeholder.com/500x750?text=No+Poster'} 
                  alt={movie.title} 
                  className={styles.image}
                  loading="lazy"
                />
                
                <div className={styles.favoriteOverlay} onClick={(e) => e.stopPropagation()}>
                  <FavoriteButton movie={movie} />
                </div>
              </div>

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
          );
        })}
      </div>

      {/* Feedback de carga en la parte inferior */}
      {loading && <div className={styles.center}>Cargando más películas...</div>}
      
      {/* Mensaje de error controlado */}
      {error && <div className={styles.center} style={{ color: '#ff4a4a' }}>{error}</div>}

      {/* Detalle de película en pantalla completa (Modal) */}
      {selectedMovie && (
        <div className={styles.modalOverlay} onClick={() => setSelectedMovie(null)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeButton} onClick={() => setSelectedMovie(null)}>✕</button>
            
            <div className={styles.modalLayout}>
              <div className={styles.modalImageWrapper}>
                <img 
                  src={selectedMovie.poster_path ? `https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}` : 'https://via.placeholder.com/500x750?text=No+Poster'} 
                  alt={selectedMovie.title} 
                  className={styles.modalImage}
                />
              </div>

              <div className={styles.modalInfo}>
                <h3 className={styles.modalTitle}>{selectedMovie.title}</h3>
                <div className={styles.modalMeta}>
                  <span className={styles.rating}>⭐ {selectedMovie.vote_average ? selectedMovie.vote_average.toFixed(1) : '0.0'}</span>
                  <span className={styles.modalDate}>Año: {selectedMovie.release_date ? selectedMovie.release_date.split('-')[0] : 'N/A'}</span>
                </div>
                <h4 className={styles.descriptionTitle}>Descripción / Sinopsis</h4>
                <p className={styles.modalDescription}>
                  {selectedMovie.overview || 'Esta película no cuenta con una descripción disponible en este momento.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default PopularMovies;
