const express = require('express');
const router = express.Router();
const Quiz = require('../models/Quiz');
const { v4: uuidv4 } = require('uuid');

// Route to create a new quiz
router.post('/create', async (req, res) => {
  const { questions } = req.body;

  console.log('Received request to create quiz:', req.body);

  if (!questions || !Array.isArray(questions) || questions.length === 0) {
    console.log('Invalid quiz data:', req.body);
    return res.status(400).json({ error: 'Questions are required and must be an array.' });
  }

  const quizId = uuidv4();
  const newQuiz = new Quiz({ quizId, questions });

  try {
    await newQuiz.save();
    console.log('Quiz created successfully:', quizId);
    res.status(201).json({ quizId });
  } catch (error) {
    console.error('Failed to create quiz:', error);
    res.status(500).json({ error: 'Failed to create quiz.' });
  }
});

// Route to get a quiz by ID
router.get('/:quizId', async (req, res) => {
  console.log('Received request to fetch quiz with ID:', req.params.quizId);

  try {
    const quiz = await Quiz.findOne({ quizId: req.params.quizId });
    if (!quiz) {
      console.log('Quiz not found:', req.params.quizId);
      return res.status(404).json({ error: 'Quiz not found' });
    }

    console.log('Quiz retrieved successfully:', quiz);
    res.json(quiz);
  } catch (error) {
    console.error('Failed to retrieve quiz:', error);
    res.status(500).json({ error: 'Failed to retrieve quiz.' });
  }
});

// Optional: Route to get all quizzes
router.get('/', async (req, res) => {
  console.log('Received request to fetch all quizzes');

  try {
    const quizzes = await Quiz.find();
    console.log('Quizzes retrieved successfully:', quizzes);
    res.json(quizzes);
  } catch (error) {
    console.error('Failed to retrieve quizzes:', error);
    res.status(500).json({ error: 'Failed to retrieve quizzes.' });
  }
});

module.exports = router;
