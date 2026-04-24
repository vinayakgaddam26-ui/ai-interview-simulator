import React from 'react';

const QuestionCard = ({ question, currentQuestion, totalQuestions }) => {
  if (!question) return null;

  return (
    <div className="question-card glass-panel">
      <div className="question-header">
        <span className="question-badge">
          Question {currentQuestion} of {totalQuestions}
        </span>
      </div>
      <h2 className="question-text">{question}</h2>
    </div>
  );
};

export default QuestionCard;
