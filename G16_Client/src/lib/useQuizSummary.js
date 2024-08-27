import { useLocation, useNavigate } from 'react-router-dom';

/**
 * Custom hook to manage the quiz summary logic, including navigation and data retrieval.
 */
export const useQuizSummary = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { quizQuestions, userAnswers, score } = location.state || {
    quizQuestions: [],
    userAnswers: [],
    score: 0,
  };

  // Function to navigate back to the home page
  const goToHome = () => {
    navigate('/');
  };

  return {
    quizQuestions,
    userAnswers,
    score,
    goToHome,
  };
};
