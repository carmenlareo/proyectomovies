import { useState } from 'react';
import styles from './MovieSearch.module.css';

function MovieSearch({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("1. Buscador capturó el texto:", query); // <-- Para pruebas
    if (onSearch) {
      onSearch(query.trim());
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (value === '' && onSearch) {
      onSearch(''); // Si borra todo, limpia la búsqueda
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.searchForm}>
      <div className={styles.searchWrapper}>
        <button type="submit" className={styles.searchButton}>🔍</button>
        <input
          type="text"
          placeholder="Buscar películas..."
          value={query}
          onChange={handleInputChange}
          className={styles.searchInput}
        />
      </div>
    </form>
  );
}

export default MovieSearch;