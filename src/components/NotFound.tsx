import React from 'react';
import styles from '../styles/NotFound.module.scss';
import notFoundImage from '../assets/images/not-found-image.png';
import logo from '../assets/images/logo.png';

const NotFound: React.FC = () => {
  return (
    <div className={styles.notFoundContainer}>
      <div className={styles.leftContainer}>
        <img src={logo} alt="Lendsqr Logo" className={styles.logo} />
        <img src={notFoundImage} alt="404" className={styles.notFoundImage} />
      </div>
      <div className={styles.rightContainer}>
        <div className={styles.messageContainer}>
          <h1>404</h1>
          <p>Oops! Page does not exist.</p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
