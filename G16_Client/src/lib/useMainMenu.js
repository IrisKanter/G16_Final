import { useNavigate } from 'react-router-dom';

/**
 * Custom hook to manage navigation from the main menu.
 * @returns {Function} - handleNavigation function to navigate to different paths.
 */
export const useMainMenu = () => {
  const navigate = useNavigate(); // Hook to programmatically navigate between routes

  // Handle navigation to a specific path
  const handleNavigation = (path) => {
    navigate(path); // Navigate to the specified path
  };

  return {
    handleNavigation,
  };
};
