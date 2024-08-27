import { useState, useEffect } from 'react';
import axios from 'axios';

/**
 * useCreateQuiz handles the state and logic for creating a quiz.
 * It manages categories, questions, and quiz creation process.
 */
const useCreateQuiz = (triviaApiUrl, backendApiUrl) => {
  const [difficulty, setDifficulty] = useState('medium');
  const [category, setCategory] = useState('');
  const [numberOfQuestions, setNumberOfQuestions] = useState(5);
  const [categories, setCategories] = useState([]);
  const [availableQuestions, setAvailableQuestions] = useState([]);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [quizId, setQuizId] = useState('');
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [copyNotification, setCopyNotification] = useState(''); // State for copy notification

  // Fetch categories from The Trivia API
  useEffect(() => {
    setLoading(true);
    axios.get(`${triviaApiUrl}/categories`)
      .then(response => {
        setCategories(Object.keys(response.data));
      })
      .catch(error => {
        console.error('There was an error fetching the categories!', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [triviaApiUrl]);

  // Fetch questions from The Trivia API
  const fetchQuestions = (e) => {
    e.preventDefault();
    setLoading(true);
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
      })
      .finally(() => {
        setLoading(false);
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
    e.preventDefault();
    setLoading(true);
    if (selectedQuestions.length === parseInt(numberOfQuestions, 10)) {
      axios.post(`${backendApiUrl}/api/quizzes/create`, { questions: selectedQuestions })
        .then(response => {
          const { quizId } = response.data;
          setQuizId(quizId);
          setStep(3);
        })
        .catch(error => {
          console.error('There was an error saving the quiz!', error);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
      alert(`Please select exactly ${numberOfQuestions} questions.`);
    }
  };

  // Handle copying quiz ID
  const handleCopyQuizId = () => {
    navigator.clipboard.writeText(quizId);
    setCopyNotification('Quiz ID copied to clipboard!'); // Set the copy notification
    setTimeout(() => setCopyNotification(''), 2000); // Clear notification after 2 seconds
  };

  return {
    difficulty, setDifficulty,
    category, setCategory,
    numberOfQuestions, setNumberOfQuestions,
    categories,
    availableQuestions,
    selectedQuestions,
    quizId,
    step,
    loading,
    copyNotification, // Include the copy notification in the return object
    fetchQuestions,
    toggleQuestionSelection,
    saveQuiz,
    handleCopyQuizId, // Include the handleCopyQuizId function
  };
};

export default useCreateQuiz;
