import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../styles/GenerateQuiz.module.css';

/**
 * GenerateQuiz component allows the user to generate a quiz by selecting difficulty, category, and number of questions.
 * The generated quiz is saved on the backend, and a shareable Quiz ID is provided.
 */
const GenerateQuiz = () => {
  const [difficulty, setDifficulty] = useState('medium');
  const [category, setCategory] = useState('');
  const [numberOfQuestions, setNumberOfQuestions] = useState(10);
  const [categories, setCategories] = useState([]);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [quizId, setQuizId] = useState(''); // State for quizId only
  const [loading, setLoading] = useState(true); // Loading state for fetching categories
  const [generating, setGenerating] = useState(false); // Loading state for generating quiz
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

  /**
   * Handles the form submission to generate a quiz.
   * Fetches questions from the Trivia API and saves them to the backend.
   */
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

  if (loading) {
    return (
      <div className={styles.generateQuizContainer}>
        <p>Loading categories...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.generateQuizContainer}>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className={styles.generateQuizContainer}>
      <div className={styles.formContainer}>
        {!quizQuestions.length ? (
          <form onSubmit={handleSubmit}>
            <h2 className={styles.formHeading}>Generate a Quiz</h2>
            <div className={styles.formControl}>
              <label className={styles.formLabel}>Select Difficulty</label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className={styles.formSelect}
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
            <div className={styles.formControl}>
              <label className={styles.formLabel}>Select Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className={styles.formSelect}
              >
                <option value="">Any Category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div className={styles.formControl}>
              <label className={styles.formLabel}>Number of Questions</label>
              <input
                type="number"
                value={numberOfQuestions}
                onChange={(e) => setNumberOfQuestions(e.target.value)}
                min="1"
                max="50"
                className={styles.formInput}
              />
            </div>
            <button
              type="submit"
              className={styles.formButton}
              disabled={generating} // Disable button while generating
            >
              {generating ? 'Generating Quiz...' : 'Generate Quiz'}
            </button>
          </form>
        ) : (
          <div className={styles.generatedQuizContainer}>
            <form>
              <h2 className={styles.formHeading}>Generated Quiz</h2>
              {quizQuestions.map((question, index) => (
                <div key={index} className={styles.questionItem}>
                  <h3>{question.question}</h3>
                  {/* Answers are not displayed */}
                </div>
              ))}
              <div className={styles.formControl}>
                <h3>Share this Quiz ID:</h3>
                <input
                  type="text"
                  value={quizId} // Display only the quizId
                  readOnly
                  className={styles.formInput}
                />
                <button
                  type="button"
                  onClick={() => navigator.clipboard.writeText(quizId)}
                  className={styles.formButton}
                >
                  Copy Quiz ID
                </button>
              </div>
            </form>
          </div>
        )}
        {/* Show loading indicator when generating quiz */}
        {generating && <p className={styles.loadingText}>Please wait while we generate your quiz...</p>}
      </div>
    </div>
  );
};

export default GenerateQuiz;
