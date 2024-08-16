import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css'; // Ensure this import is present

/**
 * Main entry point of the React application.
 * 
 * This file is responsible for rendering the root App component into the
 * root DOM node. It also wraps the App in React.StrictMode to highlight
 * potential problems in the application.
 */

// Find the root element in your HTML
const container = document.getElementById('root');

// Create a root
const root = createRoot(container);

// Render your app
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
