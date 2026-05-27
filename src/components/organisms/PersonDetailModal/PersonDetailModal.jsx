import { useEffect, useState } from 'react';
import tmdbClient from '../../../api/tmdb';
import styles from './PersonDetailModal.module.css';

export function PersonDetailModal({ personId, onClose, onSelectMovie }) {
  const [profile, setProfile] = useState(null);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!personId) return;

    const fetchPersonData = async () => {
      try {
        setLoading(true);
        const [profileRes, moviesRes] = await Promise.all([
          tmdbClient.get(`/person/${personId}`, { params: { language: 'es-ES' } }),
          tmdbClient.get(`/person/${personId}/movie_credits`, { params: { language: 'es-ES' } })
        ]);

        setProfile(profileRes.data);
        
        // Ordenar las películas por popularidad y tomar las 6 primeras
        const sortedMovies = (moviesRes.data.cast || moviesRes.data.crew || [])
          .sort((a, b) => b.popularity - a.popularity)
          .slice(0, 6);
        
        setMovies(sortedMovies);
      } catch (err) {
        console.error("Error trayendo créditos del artista:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPersonData();
  }, [personId]);

  if (!personId) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>✕</button>
        
        {loading ? (
          <div className={styles.loading}>Cargando perfil...</div>
        ) : (
          <div className={styles.personLayout}>
            <div className={styles.sidebar}>
              <img 
                src={profile.profile_path ? `https://image.tmdb.org/t/p/w300${profile.profile_path}` : 'https://via.placeholder.com/300x450?text=No+Photo'} 
                alt={profile.name} 
                className={styles.profileImg}
              />
              <h3>{profile.name}</h3>
              {profile.birthday && <p><strong>Nacimiento:</strong> {profile.birthday}</p>}
              {profile.place_of_birth && <p><strong>Lugar:</strong> {profile.place_of_birth}</p>}
            </div>

            <div className={styles.mainInfo}>
              <h4>Biografía</h4>
              <p className={styles.biography}>
                {profile.biography || 'No hay biografía disponible en español para este artista.'}
              </p>

              <h4>Filmografía destacada</h4>
              <div className={styles.relatedMoviesGrid}>
                {movies.map(movie => (
                  <div 
                    key={movie.id} 
                    className={styles.miniMovieCard}
                    onClick={() => onSelectMovie(movie)}
                  >
                    <img 
                      src={movie.poster_path ? `https://image.tmdb.org/t/p/w154${movie.poster_path}` : 'https://via.placeholder.com/154x231?text=No+Poster'} 
                      alt={movie.title} 
                    />
                    <p className={styles.miniMovieTitle}>{movie.title}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
