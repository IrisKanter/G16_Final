import { useState } from 'react';

/**
 * Custom hook to manage the login state and logic.
 * @param {Function} onLogin - Function to be called when the user successfully logs in.
 * @returns {Object} - { name, handleNameChange, handleSubmit }
 */
export const useLogin = (onLogin) => {
  const [name, setName] = useState(''); // State to manage the entered name

  // Handle input change
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(name); // Trigger the login function passed as a prop
  };

  return {
    name,
    handleNameChange,
    handleSubmit,
  };
};
