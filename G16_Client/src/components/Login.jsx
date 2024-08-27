import React from 'react';
import { useLogin } from '../lib/useLogin'; // Import the custom hook
import styles from '../styles/Login.module.css';

/**
 * Login component for user authentication.
 * 
 * This component renders a form where users can enter their name to log in.
 * When the form is submitted, it triggers the `onLogin` function passed as a prop,
 * providing the entered name.
 */
const Login = ({ onLogin }) => {
  const { name, handleNameChange, handleSubmit } = useLogin(onLogin); // Use the custom hook

  return (
    <div className={styles.loginContainer}>
      <form onSubmit={handleSubmit} className={styles.formContainer}>
        <h2 className={styles.formHeading}>Login</h2>
        <div className={styles.formControl}>
          <label className={styles.formLabel}>Enter Your Name</label>
          <input
            type="text"
            value={name}
            onChange={handleNameChange} // Use the handleNameChange from the hook
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
