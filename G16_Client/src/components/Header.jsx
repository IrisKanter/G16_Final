import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/Header.module.css'; // Importing CSS module for styling

/**
 * Header component for the application.
 * 
 * This component displays a header with a main menu button on the left and
 * a theme toggle button on the right. The theme toggle button switches between
 * light and dark modes based on the current theme.
 */
const Header = ({ toggleTheme, theme }) => {
  return (
    <header className={styles.headerContainer}> {/* Main container for the header */}
      <div className={styles.leftContainer}> {/* Container for the left side elements */}
        <Link to="/" className={styles.menuButtonLink}> {/* Link to the main menu route */}
          <button className={styles.menuButton}>Main Menu</button> {/* Button for navigating to the main menu */}
        </Link>
      </div>
      <div className={styles.rightContainer}> {/* Container for the right side elements */}
        <button onClick={toggleTheme} className={styles.themeToggleButton}> {/* Button to toggle the theme */}
          Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode {/* Button text changes based on current theme */}
        </button>
      </div>
    </header>
  );
};

export default Header; // Export the Header component for use in other parts of the application
