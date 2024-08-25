import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from '../styles/PlayQuiz.module.css';

/**
 * PlayQuiz component allows users to play a quiz fetched from the backend.
 * It displays each question one at a time, allows users to select answers, and calculates the final score.
 */
const PlayQuiz = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiUrl = import.meta.env.VITE_API_URL; // Use Vite's environment variable access pattern

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
  const handleNextQuestion = (e) => {
    e.preventDefault(); // Prevent the form from submitting
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

  // Show a loading message while the quiz data is being fetched
  if (loading) {
    return (
      <div className={styles.quizContainer}>
        <p>Loading quiz...</p>
      </div>
    );
  }

  // Show an error message if the quiz is not found
  if (error) {
    return (
      <div className={styles.quizContainer}>
        <p>{error}</p>
      </div>
    );
  }

  // Get the current question from the quizQuestions array
  const currentQuestion = quizQuestions[currentQuestionIndex];

  return (
    <div className={styles.quizContainer}>
      <form onSubmit={handleNextQuestion} className={styles.questionForm}>
        <h2 className={styles.heading}>Play the Quiz</h2>
        <div className={styles.questionContainer}>
          <h3 className={styles.question}>{currentQuestion.question}</h3>
          <ul>
            {currentQuestion.answers.map((answer, idx) => (
              <li
                key={idx}
                className={`${styles.answerOption} ${selectedAnswer === answer ? styles.selectedAnswer : ''}`}
                onClick={() => handleAnswerChange(answer)}
              >
                <span>{answer}</span>
              </li>
            ))}
          </ul>
        </div>
        <button
          type="submit"
          disabled={!selectedAnswer}
          className={styles.nextButton}
        >
          {currentQuestionIndex + 1 === quizQuestions.length ? 'Submit Quiz' : 'Next Question'}
        </button>
      </form>
    </div>
  );
};

export default PlayQuiz;
