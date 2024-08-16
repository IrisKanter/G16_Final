module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Include all JS and TS files in the src directory
    './public/index.html', // Include your index.html file
    './src/styles/**/*.css', // Include all CSS files in the styles directory
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3182ce', // Blue color for primary elements
        secondary: '#2d3748', // Gray color for secondary elements
        highlight: '#ffed4a', // Yellow color for highlights
        success: '#38a169', // Green color for success messages
        error: '#e53e3e', // Red color for error messages
        'input-bg': '#edf2f7', // Light gray background for inputs
        'input-text': '#2d3748', // Dark text color for inputs
        'input-border': '#cbd5e0', // Light border color for inputs
      },
    },
  },
  plugins: [],
};
