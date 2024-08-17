import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../styles/CreateQuiz.module.css';

/**
 * CreateQuiz component allows the user to create a custom quiz.
 * Users can select the difficulty, category, and number of questions.
 * The selected questions are then saved to the backend, and a Quiz ID is generated.
 */

const CreateQuiz = () => {
  const [difficulty, setDifficulty] = useState('medium');
  const [category, setCategory] = useState('');
  const [numberOfQuestions, setNumberOfQuestions] = useState(5);
  const [categories, setCategories] = useState([]);
  const [availableQuestions, setAvailableQuestions] = useState([]);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [quizId, setQuizId] = useState(''); // State for quizId only
  const [step, setStep] = useState(1);

  const triviaApiUrl = 'https://the-trivia-api.com/api'; // Trivia API URL
  const backendApiUrl = import.meta.env.VITE_API_URL; // Your backend API URL

  // Fetch categories from The Trivia API
  useEffect(() => {
    axios.get(`${triviaApiUrl}/categories`)
      .then(response => {
        setCategories(Object.keys(response.data));
      })
      .catch(error => {
        console.error('There was an error fetching the categories!', error);
      });
  }, []);

  // Fetch questions from The Trivia API
  const fetchQuestions = (e) => {
    e.preventDefault();
    const fetchCount = numberOfQuestions * 3; // Fetch three times as many questions as needed
    axios.get(`${triviaApiUrl}/questions`, {
      params: {
        categories: category,
        limit: fetchCount,
        difficulty: difficulty,
      }
    })
      .then(response => {
        setAvailableQuestions(response.data);
        setStep(2);
      })
      .catch(error => {
        console.error('There was an error fetching the questions!', error);
      });
  };

  // Toggle question selection
  const toggleQuestionSelection = (question) => {
    if (selectedQuestions.includes(question)) {
      setSelectedQuestions(selectedQuestions.filter(q => q !== question));
    } else if (selectedQuestions.length < numberOfQuestions) {
      setSelectedQuestions([...selectedQuestions, question]);
    }
  };

  // Save quiz to backend
  const saveQuiz = (e) => {
    e.preventDefault(); // Prevent the form from submitting traditionally
    if (selectedQuestions.length === parseInt(numberOfQuestions, 10)) {
      axios.post(`${backendApiUrl}/api/quizzes/create`, { questions: selectedQuestions })
        .then(response => {
          const { quizId } = response.data;
          setQuizId(quizId); // Save only the quizId
          setStep(3);
        })
        .catch(error => {
          console.error('There was an error saving the quiz!', error);
        });
    } else {
      alert(`Please select exactly ${numberOfQuestions} questions.`);
    }
  };

  return (
    <div className={styles.createQuizContainer}>
      <div className={styles.formContainer}>
        {step === 1 && (
          <form onSubmit={fetchQuestions}>
            <h2 className={styles.formHeading}>Create a Quiz</h2>
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
            <button type="submit" className={styles.formButton}>
              Fetch Questions
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={saveQuiz}>
            <h3 className={styles.formHeading}>Select Questions (Select up to {numberOfQuestions})</h3>
            <ul className={styles.questionList}>
              {availableQuestions.map((question, index) => (
                <li
                  key={index}
                  className={`${styles.questionItem} ${selectedQuestions.includes(question) ? styles.selected : ''}`}
                  onClick={() => toggleQuestionSelection(question)}
                >
                  <span>{question.question}</span>
                </li>
              ))}
            </ul>
            <button type="submit" className={styles.formButton}>
              Save Quiz
            </button>
          </form>
        )}

        {step === 3 && (
          <form>
            <div>
              <h3 className={styles.formHeading}>Quiz Created!</h3>
              <p>Your quiz has been successfully created. You can share the Quiz ID below:</p>
              <div className={styles.formControl}>
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
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default CreateQuiz;
