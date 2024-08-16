import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import MainMenu from './components/MainMenu';
import GenerateQuiz from './components/GenerateQuiz';
import PlayQuiz from './components/PlayQuiz';
import EnterQuizId from './components/EnterQuizId';
import CreateQuiz from './components/CreateQuiz';
import QuizSummary from './components/QuizSummary';
import Header from './components/Header';
import './index.css';

const App = () => {
  const [name, setName] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [theme, setTheme] = useState('light');

  // Apply the selected theme to the body element
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  // Handles login process
  const handleLogin = (userName) => {
    setName(userName);
    setIsLoggedIn(true);
  };

  // Toggle between light and dark themes
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <Router>
      <div className={`App ${theme} max-page-height`}>
        <Header toggleTheme={toggleTheme} theme={theme} />
        <main className="flex flex-col items-center justify-center flex-grow min-h-screen pt-16">
          <Routes>
            <Route
              path="/"
              element={isLoggedIn ? <MainMenu name={name} /> : <Login onLogin={handleLogin} />}
            />
            <Route path="/generate-quiz" element={<GenerateQuiz />} />
            <Route path="/play-quiz/:quizId" element={<PlayQuiz />} />
            <Route path="/enter-quiz-id" element={<EnterQuizId />} />
            <Route path="/create-quiz" element={<CreateQuiz />} />
            <Route path="/quiz-summary" element={<QuizSummary />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
