import styles from './CategoryButton.module.css';

export function CategoryButton({ label, isActive, onClick }) {
  // Si isActive es true, combinamos la clase base con la clase de activo
  const buttonClass = isActive 
    ? `${styles.btnCategory} ${styles.active}` 
    : styles.btnCategory;

  return (
    <button className={buttonClass} onClick={onClick}>
      {label}
    </button>
  );
}