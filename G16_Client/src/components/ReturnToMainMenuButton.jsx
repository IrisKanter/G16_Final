import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/ReturnToMainMenuButton.module.css';

/**
 * ReturnToMainMenuButton component renders a button that navigates the user back to the main menu.
 * The button is styled using the specified CSS module.
 */
const ReturnToMainMenuButton = () => {
  return (
    <Link to="/" className={styles.returnButton}>
      Return to Main Menu
    </Link>
  );
};

export default ReturnToMainMenuButton;
