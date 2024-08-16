import React, { useState } from 'react';
import styles from '../styles/Login.module.css';

/**
 * Login component for user authentication.
 * 
 * This component renders a form where users can enter their name to log in.
 * When the form is submitted, it triggers the `onLogin` function passed as a prop,
 * providing the entered name.
 */
const Login = ({ onLogin }) => {
  const [name, setName] = useState(''); // State to manage the entered name

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    onLogin(name); // Call the onLogin function with the entered name
  };

  return (
    <div className={styles.loginContainer}>
      <form onSubmit={handleSubmit} className={styles.formContainer}>
        <h2 className={styles.formHeading}>Login</h2>
        <div className={styles.formControl}>
          <label className={styles.formLabel}>Enter Your Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)} // Update state on input change
            className={styles.formInput}
            required // Make the input field required
          />
        </div>
        <button type="submit" className={styles.formButton}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login; // Export the Login component for use in other parts of the application
