import React from 'react';
import useGenerateQuiz from '../lib/useGenerateQuiz'; // Import the custom hook
import styles from '../styles/GenerateQuiz.module.css';

/**
 * GenerateQuiz component allows the user to generate a quiz by selecting difficulty, category, and number of questions.
 * The generated quiz is saved on the backend, and a shareable Quiz ID is provided.
 */
const GenerateQuiz = () => {
  const {
    difficulty,
    setDifficulty,
    category,
    setCategory,
    numberOfQuestions,
    setNumberOfQuestions,
    categories,
    quizQuestions,
    quizId,
    loading,
    generating,
    error,
    copyNotification,
    handleSubmit,
    handleCopyQuizId,
  } = useGenerateQuiz();

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
                  onClick={handleCopyQuizId} // Handle copy quiz ID
                  className={styles.formButton}
                >
                  Copy Quiz ID
                </button>
                {copyNotification && (
                  <p className={styles.copyNotification}>{copyNotification}</p>
                )}
              </div>
            </form>
          </div>
        )}
        {generating && <p className={styles.loadingText}>Please wait while we generate your quiz...</p>}
      </div>
    </div>
  );
};

export default GenerateQuiz;
