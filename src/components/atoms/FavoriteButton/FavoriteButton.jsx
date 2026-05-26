import { useFavorites } from '../../../context/FavoriteContext';

function FavoriteButton({ movie }) {
  const { toggleFavorite, isFavorite } = useFavorites();
  const isFav = isFavorite(movie?.id);

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation(); 
    toggleFavorite(movie);
  };

  return (
    <button 
      onClick={handleClick} 
      style={styles.button}
      title={isFav ? "Quitar de favoritos" : "Añadir a favoritos"}
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        fill={isFav ? "#ff4a4a" : "none"} 
        stroke={isFav ? "#ff4a4a" : "#ffffff"} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        style={styles.svg}
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
      </svg>
    </button>
  );
}

const styles = {
  button: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%'
  },
  svg: {
    width: '24px',
    height: '24px',
    display: 'block',
    transition: 'transform 0.2s ease, fill 0.2s ease',
  }
};

export default FavoriteButton;