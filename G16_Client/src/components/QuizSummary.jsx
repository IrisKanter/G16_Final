import React from 'react';
import { useQuizSummary } from '../lib/useQuizSummary'; // Import the custom hook
import styles from '../styles/QuizSummary.module.css';

/**
 * QuizSummary component displays the quiz results, showing the user's score,
 * their answers, and the correct answers for each question.
 */
const QuizSummary = () => {
  const { quizQuestions, userAnswers, score, goToHome } = useQuizSummary(); // Use the custom hook

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
            type="button"
            onClick={goToHome} // Use the hook's navigation function
            className={styles.homeButton}
          >
            Go to Home
          </button>
        </div>
      </form>
    </div>
  );
};

export default QuizSummary; // Export the QuizSummary component for use in other parts of the application
