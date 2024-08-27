import { useState, useEffect } from 'react';
import axios from 'axios';

const useGenerateQuiz = () => {
  const [difficulty, setDifficulty] = useState('medium');
  const [category, setCategory] = useState('');
  const [numberOfQuestions, setNumberOfQuestions] = useState(10);
  const [categories, setCategories] = useState([]);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [quizId, setQuizId] = useState(''); // State for quizId only
  const [loading, setLoading] = useState(true); // Loading state for fetching categories
  const [generating, setGenerating] = useState(false); // Loading state for generating quiz
  const [copyNotification, setCopyNotification] = useState(''); // State for copy notification
  const [error, setError] = useState(null);

  const apiUrl = import.meta.env.VITE_API_URL; // Backend API URL

  // Fetch categories from the Trivia API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://the-trivia-api.com/api/categories');
        setCategories(Object.keys(response.data));
      } catch (err) {
        console.error('There was an error fetching the categories!', err);
        setError('Failed to load categories');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Handles the form submission to generate a quiz
  const handleSubmit = async (e) => {
    e.preventDefault();
    setGenerating(true); // Start generating state
    try {
      const response = await axios.get('https://the-trivia-api.com/api/questions', {
        params: {
          categories: category,
          limit: numberOfQuestions,
          difficulty,
        },
      });

      const questions = response.data;
      const quizResponse = await axios.post(`${apiUrl}/api/quizzes/create`, { questions });
      const quizId = quizResponse.data.quizId;

      setQuizQuestions(questions);
      setQuizId(quizId); // Save only the quizId
    } catch (err) {
      console.error('There was an error generating the quiz!', err);
      setError('Failed to generate quiz');
    } finally {
      setGenerating(false); // End generating state
    }
  };

  // Handle copying quiz ID
  const handleCopyQuizId = () => {
    navigator.clipboard.writeText(quizId);
    setCopyNotification('Quiz ID copied to clipboard!'); // Set the copy notification
    setTimeout(() => setCopyNotification(''), 2000); // Clear notification after 2 seconds
  };

  return {
    difficulty,
    setDifficulty,
    category,
    setCategory,
    numberOfQuestions,
    setNumberOfQuestions,
    categories,
    quizQuestions,
    quizId,
    loading,
    generating,
    error,
    copyNotification,
    handleSubmit,
    handleCopyQuizId,
  };
};

export default useGenerateQuiz;
