import { CategoryCarousel } from '../../organisms/CategoryCarousel/CategoryCarousel';
import styles from './HeaderApp.module.css';

export function HeaderApp({ categories, activeCategory, onCategoryChange }) {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        
        {/* Fila 1: El Logo principal */}
        <div className={styles.logoRow}>
          <h1 className={styles.logo}>MOVIEAPP</h1>
        </div>

        {/* Fila 2: El Carrusel de categorías integrado */}
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