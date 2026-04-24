import React from 'react';
import { FaCheckCircle, FaExclamationCircle, FaArrowRight } from 'react-icons/fa';

const FeedbackCard = ({ feedback, score, onNextQuestion, isLastQuestion, onFinish }) => {
  // Determine color based on score (assuming out of 10)
  const getScoreClass = (s) => {
    if (s >= 8) return 'score-high';
    if (s >= 5) return 'score-medium';
    return 'score-low';
  };

  const getScoreIcon = (s) => {
    if (s >= 5) return <FaCheckCircle className="icon-large" />;
    return <FaExclamationCircle className="icon-large" />;
  };

  return (
    <div className={`feedback-card glass-panel ${getScoreClass(score)}`}>
      <div className="feedback-header">
        <div className="score-display">
          {getScoreIcon(score)}
          <span className="score-text">Score: {score}/10</span>
        </div>
      </div>
      
      <div className="feedback-content">
        <h3>AI Feedback</h3>
        <p>{feedback}</p>
        
        {/* Optional Improvement Suggestions */}
        {improvementSuggestions && (
          <div className="improvement-suggestions">
            <h4>How to Improve</h4>
            <p>{improvementSuggestions}</p>
          </div>
        )}
      </div>

      <div className="feedback-actions">
        {isLastQuestion ? (
          <button className="btn btn-success" onClick={onFinish}>
            Finish Interview <FaCheckCircle className="icon-right" />
          </button>
        ) : (
          <button className="btn btn-primary" onClick={onNextQuestion}>
            Next Question <FaArrowRight className="icon-right" />
          </button>
        )}
      </div>
    </div>
  );
};

export default FeedbackCard;
