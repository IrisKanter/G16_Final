// src/components/PlayQuiz.jsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useQuiz from '../lib/useQuiz';
import styles from '../styles/PlayQuiz.module.css';

/**
 * PlayQuiz component allows users to play a quiz fetched from the backend.
 * It displays each question one at a time, allows users to select answers, and calculates the final score.
 */
const PlayQuiz = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL; // Use Vite's environment variable access pattern
  const {
    quizQuestions,
    currentQuestionIndex,
    selectedAnswer,
    loading,
    error,
    handleAnswerChange,
    handleNextQuestion,
  } = useQuiz(quizId, apiUrl); // Use the lib

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
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleNextQuestion(navigate);
        }}
        className={styles.questionForm}
      >
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
