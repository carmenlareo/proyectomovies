import React from 'react';
// 1. Importamos el hook de nuestro contexto global (comprueba que no tenga 's' al final)
import { useFavorites } from '../../context/FavoriteContext';
// 2. Importamos el átomo del botón favorito para poder desmarcar películas
import FavoriteButton from '../../components/atoms/FavoriteButton/FavoriteButton';
// 3. Importamos los mismos estilos modulares de las tarjetas populares para reutilizar la cuadrícula
import styles from '../../components/organisms/PopularMovies/PopularMovies.module.css';

export const Likes = () => {
  // 4. Extraemos el array 'favorites' del estado global
  const { favorites } = useFavorites();

  return (
    <div className={styles.organismContainer}>
      {/* Título de la sección estilizado */}
      <h2 className={styles.organismTitle}>Mis Películas Favoritas</h2>

      {/* 5. Si la lista está vacía, mostramos un mensaje alternativo */}
      {favorites.length === 0 ? (
        <div style={emptyStyles.messageContainer}>
          <p style={emptyStyles.text}>
            Aún no has guardado ninguna película. ¡Haz clic en el corazón de cualquier portada para agregarla aquí!
          </p>
        </div>
      ) : (
        /* 6. Si contiene películas, las renderizamos en una rejilla idéntica a la Home */
        <div className={styles.grid}>
          {favorites.map((movie) => (
            <article key={movie.id} className={styles.card}>
              
              {/* Contenedor del póster con el corazón absoluto */}
              <div className={styles.imageContainer}>
                <img 
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                  alt={movie.title} 
                  className={styles.image}
                  loading="lazy"
                />
                
                {/* Capa superpuesta para posicionar el FavoriteButton */}
                <div className={styles.favoriteOverlay}>
                  <FavoriteButton movie={movie} />
                </div>
              </div>

              {/* Contenido inferior con la info de la película */}
              <div className={styles.cardContent}>
                <h3 className={styles.movieTitle}>{movie.title}</h3>
                <div className={styles.meta}>
                  <span className={styles.rating}>⭐ {movie.vote_average.toFixed(1)}</span>
                  <span style={{ fontSize: '0.85rem', color: '#808080' }}>
                    {movie.release_date ? movie.release_date.split('-')[0] : ''}
                  </span>
                </div>
              </div>

            </article>
          ))}
        </div>
      )}
    </div>
  );
};

// Pequeños estilos en línea para el contenedor cuando no hay películas seleccionadas
const emptyStyles = {
  messageContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '50vh',
  },
  text: {
    color: '#808080',
    fontSize: '1.2rem',
    textAlign: 'center',
    maxWidth: '450px',
    lineHeight: '1.6',
    fontFamily: 'system-ui, -apple-system, sans-serif'
  }
};