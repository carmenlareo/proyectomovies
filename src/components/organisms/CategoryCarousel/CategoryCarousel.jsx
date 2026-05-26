
import { CategoryButton } from '../../atoms/CategoryButton/CategoryButton';
import styles from './CategoryCarousel.module.css';

export function CategoryCarousel({ categories, activeCategory, onCategoryChange }) {
  return (
    <div className={styles.carouselWrapper}>
      <div className={styles.carouselContainer}>
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