import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFetchQuiz } from '../lib/useFetchQuiz'; // Updated import
import styles from '../styles/EnterQuizId.module.css';

/**
 * EnterQuizId component allows users to enter a quiz ID to start a quiz.
 * It handles validation and error handling for quiz retrieval.
 */
const EnterQuizId = () => {
  const [quizId, setQuizId] = useState('');
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;
  const { fetchQuiz, loading, error } = useFetchQuiz(apiUrl); // Using the custom hook

  // Handle form submission and quiz retrieval
  const handleSubmit = async (e) => {
    e.preventDefault();
    const quiz = await fetchQuiz(quizId);
    if (quiz) {
      navigate(`/play-quiz/${quizId}`);
    } else {
      window.alert(error);
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
        <button type="submit" className={styles.formButton} disabled={loading}>
          {loading ? 'Loading...' : 'Start Quiz'}
        </button>
      </form>
    </div>
  );
};

export default EnterQuizId;
