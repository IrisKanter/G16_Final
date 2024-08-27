import React from 'react';
import { useMainMenu } from '../lib/useMainMenu'; // Import the custom hook
import styles from '../styles/MainMenu.module.css';

/**
 * MainMenu component for navigation.
 * 
 * This component provides buttons for navigating to different sections of the application.
 * It uses the `useMainMenu` custom hook to handle navigation based on the button clicked.
 */
const MainMenu = ({ name }) => {
  const { handleNavigation } = useMainMenu(); // Use the custom hook for navigation

  return (
    <div className={styles.mainMenuContainer}>
      <form className={styles.menuOptions}>
        <h2 className={styles.formHeading}>Welcome, {name}!</h2>
        <button
          type="button"
          className={styles.menuButton}
          onClick={() => handleNavigation('/enter-quiz-id')}
        >
          Play Quiz
        </button>
        <button
          type="button"
          className={styles.menuButton}
          onClick={() => handleNavigation('/generate-quiz')}
        >
          Generate Quiz
        </button>
        <button
          type="button"
          className={styles.menuButton}
          onClick={() => handleNavigation('/create-quiz')}
        >
          Create Quiz
        </button>
      </form>
    </div>
  );
};

export default MainMenu; // Export the MainMenu component for use in other parts of the application
