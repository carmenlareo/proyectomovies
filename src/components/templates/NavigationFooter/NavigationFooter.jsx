import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faCompass, faHeart, faUser } from '@fortawesome/free-solid-svg-icons'
import styles from './NavigationFooter.module.css' // Asegúrate de vincular tu archivo CSS

export function NavigationFooter() {
  return (
    <footer className={styles.footerContainer}>
      <Link to="/" className={`${styles.navItem} ${styles.active}`}>
        <FontAwesomeIcon icon={faHome} className={styles.icon} />
        <span>Home</span>
      </Link>
      
      <Link to="/explore" className={styles.navItem}>
        <FontAwesomeIcon icon={faCompass} className={styles.icon} />
        <span>Explore</span>
      </Link>
      
      <Link to="/likes" className={styles.navItem}>
        <FontAwesomeIcon icon={faHeart} className={styles.icon} />
        <span>Likes</span>
      </Link>
      
      <Link to="/profile" className={styles.navItem}>
        <FontAwesomeIcon icon={faUser} className={styles.icon} />
        <span>Profile</span>
      </Link>
    </footer>
  )
}