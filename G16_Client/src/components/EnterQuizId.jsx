import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from '../styles/EnterQuizId.module.css';

/**
 * EnterQuizId component allows users to enter a quiz ID to start a quiz.
 * It handles validation and error handling for quiz retrieval.
 */
const EnterQuizId = () => {
  const [quizId, setQuizId] = useState('');
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;

  // Handle form submission and quiz retrieval
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(`${apiUrl}/api/quizzes/${quizId}`);

      if (response.data) {
        navigate(`/play-quiz/${quizId}`);
      }
    } catch (err) {
      if (err.response && err.response.status === 404) {
        window.alert('Quiz not found. Please check the ID and try again.');
      } else {
        window.alert('An unexpected error occurred. Please try again later.');
        console.error('Error fetching quiz:', err);
      }
    }
  };

  return (
    <div className={styles.enterQuizIdContainer}>
      <form onSubmit={handleSubmit} className={styles.formContainer}>
        <h2 className={styles.formHeading}>Enter Quiz ID</h2>
        <div className={styles.formControl}>
          <label className={styles.formLabel}>Quiz ID</label>
          <input
            type="text"
            value={quizId}
            onChange={(e) => setQuizId(e.target.value)}
            className={styles.formInput}
            required
          />
        </div>
        <button type="submit" className={styles.formButton}>
          Start Quiz
        </button>
      </form>
    </div>
  );
};

export default EnterQuizId;
