import { useState } from 'react';
import axios from 'axios';

/**
 * Custom hook to fetch quiz data based on the provided quiz ID.
 */
export const useFetchQuiz = (apiUrl) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchQuiz = async (quizId) => {
    setLoading(true);
    try {
      const response = await axios.get(`${apiUrl}/api/quizzes/${quizId}`);
      setLoading(false);
      return response.data;
    } catch (err) {
      setLoading(false);
      if (err.response && err.response.status === 404) {
        setError('Quiz not found. Please check the ID and try again.');
      } else {
        setError('An unexpected error occurred. Please try again later.');
      }
      console.error('Error fetching quiz:', err);
      return null;
    }
  };

  return { fetchQuiz, loading, error };
};
