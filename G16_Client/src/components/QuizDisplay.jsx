import React from 'react';
import styles from '../styles/QuizDisplay.module.css';

const QuizDisplay = ({ question, options, selectedAnswer, onAnswerSelect, onSubmit }) => {
  return (
    <div className={styles.quizDisplayContainer}>
      <div className={styles.quizContent}>
        <h2 className={styles.quizQuestion}>{question}</h2>
        <ul>
          {options.map((option, index) => (
            <li
              key={index}
              className={`${styles.answerOption} ${selectedAnswer === option ? styles.selectedAnswer : ''}`}
              onClick={() => onAnswerSelect(option)}
            >
              {option}
            </li>
          ))}
        </ul>
        <button onClick={onSubmit} className={styles.submitButton} disabled={!selectedAnswer}>
          Submit Answer
        </button>
      </div>
    </div>
  );
};

export default QuizDisplay;
