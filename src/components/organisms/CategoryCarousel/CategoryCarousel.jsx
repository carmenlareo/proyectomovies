import React from 'react';
// 1. Corregimos la importación asegurando la ruta exacta al archivo jsx
import { CategoryButton } from '../../atoms/CategoryButton/CategoryButton';
import styles from './CategoryCarousel.module.css';

export function CategoryCarousel({ categories, activeCategory, onCategoryChange }) {
  return (
    <div className={styles.carouselWrapper}>
      {/* Añadimos un inline style temporal de z-index para garantizar que no lo tape la lista de abajo */}
      <div className={styles.carouselContainer} style={{ position: 'relative', zIndex: 99 }}>
        {categories.map((category) => (
          <div key={category} className={styles.carouselItem}>
            <CategoryButton
              label={category}
              isActive={category === activeCategory}
              onClick={() => onCategoryChange(category)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}