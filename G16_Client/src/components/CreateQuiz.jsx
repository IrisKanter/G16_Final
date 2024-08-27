import React from 'react';
import useCreateQuiz from '../lib/useCreateQuiz';
import styles from '../styles/CreateQuiz.module.css';

/**
 * CreateQuiz component allows the user to create a custom quiz.
 * Users can select the difficulty, category, and number of questions.
 * The selected questions are then saved to the backend, and a Quiz ID is generated.
 */
const CreateQuiz = () => {
  const triviaApiUrl = 'https://the-trivia-api.com/api'; // Trivia API URL
  const backendApiUrl = import.meta.env.VITE_API_URL; // Your backend API URL

  const {
    difficulty, setDifficulty,
    category, setCategory,
    numberOfQuestions, setNumberOfQuestions,
    categories,
    availableQuestions,
    selectedQuestions,
    quizId,
    step,
    loading,
    copyNotification, // Get the copy notification from the hook
    fetchQuestions,
    toggleQuestionSelection,
    saveQuiz,
    handleCopyQuizId, // Get the handleCopyQuizId function from the hook
  } = useCreateQuiz(triviaApiUrl, backendApiUrl);

  if (loading) {
    return (
      <div className={styles.createQuizContainer}>
        <p className={styles.loadingText}>Please wait while we process your request...</p>
      </div>
    );
  }

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
                  onClick={handleCopyQuizId} // Use the copy handler from the hook
                  className={styles.formButton}
                >
                  Copy Quiz ID
                </button>
                {copyNotification && (
                  <p className={styles.copyNotification}>{copyNotification}</p> // Display the copy notification
                )}
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default CreateQuiz;
