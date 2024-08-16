import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from '../styles/QuizSummary.module.css';

const QuizSummary = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { quizQuestions, userAnswers, score } = location.state;

  return (
    <div className={styles.quizSummaryContainer}>
      <form>
      <div className={styles.summaryContent}>
        <p className={styles.scoreText}>
          Your Score: {score} / {quizQuestions.length}
        </p>
        <ul>
          {quizQuestions.map((question, index) => (
            <li key={index} className={styles.questionItem}>
              <p>{question.question}</p>
              <p>
                Your answer: {userAnswers[index]} - 
                {userAnswers[index] === question.correctAnswer ? (
                  <span className={styles.correctAnswer}> Correct</span>
                ) : (
                  <span className={styles.incorrectAnswer}> Incorrect</span>
                )}
              </p>
              <p>Correct answer: {question.correctAnswer}</p>
            </li>
          ))}
        </ul>
        <button
          onClick={() => navigate('/')}
          className={styles.homeButton}
        >
          Go to Home
        </button>
      </div>
      </form>
    </div>
  );
};

export default QuizSummary;
