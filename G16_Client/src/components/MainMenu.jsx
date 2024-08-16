import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/MainMenu.module.css';

/**
 * MainMenu component for navigation.
 * 
 * This component provides buttons for navigating to different sections of the application
 * It uses the `useNavigate` hook from `react-router-dom` to handle navigation based on the 
 * button clicked.
 */
const MainMenu = () => {
  const navigate = useNavigate(); // Hook to programmatically navigate between routes

  const handleNavigation = (path) => {
    navigate(path); // Navigate to the specified path
  };

  return (
    <div className={styles.mainMenuContainer}>
      <form className={styles.menuOptions}>
        <button type="button" className={styles.menuButton} onClick={() => handleNavigation('/enter-quiz-id')}>
          Play Quiz
        </button>
        <button type="button" className={styles.menuButton} onClick={() => handleNavigation('/generate-quiz')}>
          Generate Quiz
        </button>
        <button type="button" className={styles.menuButton} onClick={() => handleNavigation('/create-quiz')}>
          Create Quiz
        </button>
      </form>
    </div>
  );
};

export default MainMenu; // Export the MainMenu component for use in other parts of the application
