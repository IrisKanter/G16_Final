const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  quizId: { type: String, required: true, unique: true },
  questions: [
    {
      question: String,
      correctAnswer: String,
      incorrectAnswers: [String],
    }
  ],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Quiz', quizSchema);
