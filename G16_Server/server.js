const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const quizRoutes = require('./routes/quizRoutes');
require('dotenv').config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 5000;

// Configure CORS to allow requests from your frontend
const corsOptions = {
  origin: 'http://localhost:5173', // Replace with your frontend URL
  optionsSuccessStatus: 200, // For legacy browser support
};

// Middleware
app.use(cors(corsOptions)); // Use the CORS middleware with the options
app.use(express.json());

// Routes
app.use('/api/quizzes', quizRoutes);

// MongoDB Connection
const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err));

// Default route
app.get('/', (req, res) => {
  res.send('Server is running');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
