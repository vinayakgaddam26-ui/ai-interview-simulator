const mongoose = require('mongoose');

const interviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    // Temporarily optional until Auth is hooked up
    required: false, 
  },
  questions: [{
    questionText: String,
    userAnswer: String,
    feedback: String,
    score: Number
  }],
  overallScore: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model('Interview', interviewSchema);
