const express = require('express');
const router = express.Router();
const { getQuestions, submitAnswer, getHistory } = require('../controllers/interviewController');

router.route('/questions').get(getQuestions);
router.route('/answer').post(submitAnswer);
router.route('/history').get(getHistory);

module.exports = router;
