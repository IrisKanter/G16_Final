import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from '../styles/PlayQuiz.module.css';



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

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/quizzes/${quizId}`);
        setQuizQuestions(response.data.questions);
      } catch (err) {
        console.error('Error fetching quiz:', err);
        setError('Quiz not found');
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [quizId, apiUrl]);

  const handleAnswerChange = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleNextQuestion = (e) => {
    e.preventDefault(); // Prevent the form from submitting
    const correctAnswer = quizQuestions[currentQuestionIndex].correctAnswer;

    if (selectedAnswer === correctAnswer) {
      setScore((prevScore) => prevScore + 1);
    }

    setUserAnswers((prevAnswers) => [...prevAnswers, selectedAnswer]);
    setSelectedAnswer(null);

    if (currentQuestionIndex + 1 < quizQuestions.length) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      navigate('/quiz-summary', {
        state: {
          quizQuestions,
          userAnswers: [...userAnswers, selectedAnswer],
          score: score + (selectedAnswer === correctAnswer ? 1 : 0),
        },
      });
    }
  };

  if (loading) {
    return (
      <div className={styles.quizContainer}>
        <p>Loading quiz...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.quizContainer}>
        <p>{error}</p>
      </div>
    );
  }

  const currentQuestion = quizQuestions[currentQuestionIndex];

  return (
    <div className={styles.quizContainer}>
      <form onSubmit={handleNextQuestion} className={styles.questionForm}>
        <h2 className={styles.heading}>Play the Quiz</h2>
        <div className={styles.questionContainer}>
          <h3 className={styles.question}>{currentQuestion.question}</h3>
          <ul>
            {currentQuestion.incorrectAnswers.concat(currentQuestion.correctAnswer).map((answer, idx) => (
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
