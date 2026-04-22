const Interview = require('../models/Interview');

// @desc    Get list of interview questions
// @route   GET /api/questions
// @access  Public
const getQuestions = async (req, res) => {
  try {
    // Mock questions for the MVP. 
    // Bonus: Can be integrated with OpenAI/Gemini API to generate dynamically.
    const questions = [
      "Tell me about a time you faced a difficult challenge and how you overcame it.",
      "Where do you see yourself in 5 years?",
      "Why do you want to work for our company?",
      "Describe a time you disagreed with a colleague and how you handled it."
    ];
    
    res.status(200).json({ success: true, data: questions });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

// @desc    Submit user answer and return feedback
// @route   POST /api/answer
// @access  Public
const submitAnswer = async (req, res) => {
  try {
    const { question, answer } = req.body;
    
    if (!question || !answer) {
      return res.status(400).json({ success: false, message: 'Please provide both question and answer' });
    }

    // Basic scoring logic (Keyword matching)
    let score = 5; // default score out of 10
    let feedback = "Good effort. Try to provide more specific examples.";

    const answerLower = answer.toLowerCase();
    
    // Simple mock logic for evaluation
    if (answerLower.includes('because') && answerLower.includes('example')) {
      score = 8;
      feedback = "Great answer! You provided clear reasoning and concrete examples.";
    } else if (answer.length < 20) {
      score = 3;
      feedback = "Your answer is too short. Try to elaborate more and give detail.";
    }

    // Bonus: Future AI Integration point here.
    
    // Optionally save to DB here (e.g. updating an active interview document)
    // For now we just return the feedback
    res.status(200).json({
      success: true,
      data: {
        question,
        userAnswer: answer,
        feedback,
        score
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

// @desc    Get past interview responses
// @route   GET /api/history
// @access  Public
const getHistory = async (req, res) => {
  try {
    // Returns all interviews. Later this should filter by req.user._id when auth is fully active
    const interviews = await Interview.find({}).populate('user', 'name email');
    res.status(200).json({ success: true, data: interviews });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

module.exports = {
  getQuestions,
  submitAnswer,
  getHistory
};
