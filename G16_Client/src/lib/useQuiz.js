// src/lib/useQuiz.js
import { useState, useEffect } from 'react';
import axios from 'axios';

/**
 * useQuiz is a custom lib that fetches quiz data and manages the state for playing the quiz.
 * @param {string} quizId - The ID of the quiz to fetch.
 * @param {string} apiUrl - The base URL for the API.
 * @returns {Object} - An object containing quiz data, loading state, error state, and score calculation logic.
 */
const useQuiz = (quizId, apiUrl) => {
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Shuffles an array to ensure the answers appear in a random order.
   */
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  /**
   * Fetch the quiz data from the backend when the component mounts.
   * The questions are shuffled to randomize the order of the answers.
   */
  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/quizzes/${quizId}`);
        const questionsWithShuffledAnswers = response.data.questions.map((question) => {
          // Shuffle the answers
          const allAnswers = [...question.incorrectAnswers, question.correctAnswer];
          return {
            ...question,
            answers: shuffleArray(allAnswers), // Shuffle the answers array
          };
        });
        setQuizQuestions(questionsWithShuffledAnswers);
      } catch (err) {
        console.error('Error fetching quiz:', err);
        setError('Quiz not found');
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [quizId, apiUrl]);

  /**
   * Handle answer selection by updating the selected answer state.
   */
  const handleAnswerChange = (answer) => {
    setSelectedAnswer(answer);
  };

  /**
   * Handle moving to the next question or finishing the quiz.
   * This method also calculates the score based on correct answers.
   */
  const handleNextQuestion = (navigate) => {
    const correctAnswer = quizQuestions[currentQuestionIndex].correctAnswer;

    // Update the score if the selected answer is correct
    if (selectedAnswer === correctAnswer) {
      setScore((prevScore) => prevScore + 1);
    }

    // Save the selected answer to the userAnswers array
    setUserAnswers((prevAnswers) => [...prevAnswers, selectedAnswer]);
    setSelectedAnswer(null);

    // Check if there are more questions, otherwise navigate to the summary page
    if (currentQuestionIndex + 1 < quizQuestions.length) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      // Navigate to the summary page with the quiz data
      navigate('/quiz-summary', {
        state: {
          quizQuestions,
          userAnswers: [...userAnswers, selectedAnswer],
          score: score + (selectedAnswer === correctAnswer ? 1 : 0),
        },
      });
    }
  };

  return {
    quizQuestions,
    currentQuestionIndex,
    selectedAnswer,
    score,
    loading,
    error,
    handleAnswerChange,
    handleNextQuestion,
  };
};

export default useQuiz;
