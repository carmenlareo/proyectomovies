import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons' // Por si quieres añadir una estrella de puntuación más adelante
import styles from './MovieCard.module.css'
import { getFullPosterUrl } from '../../../services/tmdbConfig' 


export function MovieCard({ title, genre, year, imageUrl }) {
  // Pasamos la prop imageUrl (que será el fragmento de TMDB) por nuestra función constructora
  const finalImageUrl = getFullPosterUrl(imageUrl);

  return (
    <div className={styles.cardContainer}>
      <div className={styles.imageWrapper}>
        <img src={finalImageUrl} alt={title} className={styles.poster} />
      </div>

      <div className={styles.infoWrapper}>
        <h3 className={styles.movieTitle}>{title}</h3>
        <p className={styles.movieMetadata}>
          <span>{genre}</span>
          <span className={styles.separator}>•</span>
          <span>{year}</span>
        </p>
      </div>
    </div>
  )
}