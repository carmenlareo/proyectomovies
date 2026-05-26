import { CategoryButton } from '../../atoms/CategoryButton/CategoryButton';
import styles from './OnboardingModal.module.css';

export function OnboardingModal({ onEnter }) {
  return (
    <div className={styles.overlay}>
      <div className={styles.alertBox}>
        <h1 className={styles.title}>EXPLORA TUS PELICULAS FAVORITAS</h1>
        <p className={styles.message}>
          MOVIEAPP <br></br>¡Prepárate para una experiencia de cine!
        </p>
        
        <div className={styles.buttonWrapper}>
          {/* Reutilizamos tu CategoryButton */}
          <CategoryButton 
            label="Entrar" 
            isActive={true} 
            onClick={onEnter} 
          />
          
          
       
        </div>
      </div>
    </div>
  );
}
