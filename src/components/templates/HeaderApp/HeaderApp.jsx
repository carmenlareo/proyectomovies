import { CategoryCarousel } from '../../organisms/CategoryCarousel/CategoryCarousel';
import MovieSearch from '../../organisms/MovieSearch/MovieSearch'; 
import styles from './HeaderApp.module.css';

// 1. Asegúrate de recibir 'onSearch' dentro de las llaves de las props
export function HeaderApp({ categories, activeCategory, onCategoryChange, onSearch }) {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        
        <div className={styles.logoRow}>
          <h1 className={styles.logo}>MOVIEAPP</h1>
          <div className={styles.searchContainer}>
            {/* 2. CRÍTICO: Pásale exactamente la función 'onSearch' al organism */}
            <MovieSearch onSearch={onSearch} /> 
          </div>
        </div>

        <div className={styles.carouselRow}>
          <CategoryCarousel 
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={onCategoryChange}
          />
        </div>

      </div>
    </header>
  );
}