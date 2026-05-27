import { useEffect, useState } from 'react';
import tmdbClient from '../../../api/tmdb';
import styles from './MovieDetailModal.module.css';

export function MovieDetailModal({ movie, onClose, onSelectPerson }) {
  const [details, setDetails] = useState(null);
  const [credits, setCredits] = useState({ cast: [], crew: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!movie) return;

    const fetchExtendedData = async () => {
      try {
        setLoading(true);
        // 1. Buscamos detalles + videos (tráiler) en paralelo con los créditos
        const [detailRes, creditsRes] = await Promise.all([
          tmdbClient.get(`/movie/${movie.id}`, { params: { append_to_response: 'videos', language: 'es-ES' } }),
          tmdbClient.get(`/movie/${movie.id}/credits`, { params: { language: 'es-ES' } })
        ]);

        setDetails(detailRes.data);
        setCredits(creditsRes.data);
      } catch (err) {
        console.error("Error trayendo info extendida de la película:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchExtendedData();
  }, [movie]);

  if (!movie) return null;

  // Extraer el director
  const director = credits.crew.find(member => member.job === 'Director');
  
  // Buscar un tráiler de YouTube
  const trailer = details?.videos?.results?.find(
    video => video.site === 'YouTube' && (video.type === 'Trailer' || video.type === 'Teaser')
  );

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>✕</button>
        
        {loading ? (
          <div className={styles.loading}>Cargando detalles...</div>
        ) : (
          <div className={styles.modalLayout}>
            {/* Izquierda: Poster / Tráiler embed */}
            <div className={styles.mediaSection}>
              {trailer ? (
                <iframe
                  className={styles.trailerVideo}
                  src={`https://www.youtube.com/embed/${trailer.key}`}
                  title="Trailer"
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
              ) : (
                <img 
                  src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://via.placeholder.com/500x750?text=No+Poster'} 
                  alt={movie.title} 
                  className={styles.modalImage}
                />
              )}
            </div>

            {/* Derecha: Datos, Sinopsis, Director, Reparto */}
            <div className={styles.modalInfo}>
              <h3 className={styles.modalTitle}>{movie.title}</h3>
              
              <div className={styles.modalMeta}>
                <span className={styles.rating}>⭐ {movie.vote_average?.toFixed(1)}</span>
                <span className={styles.modalDate}>Estreno: {details?.release_date || 'N/A'}</span>
                {details?.runtime && <span className={styles.runtime}>⏱️ {details.runtime} min</span>}
              </div>

              {/* Director Clicable */}
              {director && (
                <div className={styles.crewSection}>
                  <h4>Dirección:</h4>
                  <span 
                    className={styles.linkableName} 
                    onClick={() => onSelectPerson(director.id)}
                  >
                    {director.name}
                  </span>
                </div>
              )}

              <h4 className={styles.descriptionTitle}>Sinopsis</h4>
              <p className={styles.modalDescription}>
                {movie.overview || 'Esta película no cuenta con una descripción disponible.'}
              </p>

              {/* Lista de Reparto Principal */}
              <h4 className={styles.sectionTitle}>Reparto Principal</h4>
              <div className={styles.castGrid}>
                {credits.cast.slice(0, 6).map(actor => (
                  <div 
                    key={actor.id} 
                    className={styles.actorCard}
                    onClick={() => onSelectPerson(actor.id)}
                  >
                    <img 
                      src={actor.profile_path ? `https://image.tmdb.org/t/p/w185${actor.profile_path}` : 'https://via.placeholder.com/185x278?text=No+Photo'} 
                      alt={actor.name} 
                    />
                    <p className={styles.actorName}>{actor.name}</p>
                    <p className={styles.characterName}>{actor.character}</p>
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