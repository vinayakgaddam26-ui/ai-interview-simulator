import React, { useState } from 'react';
import { FaPaperPlane, FaSpinner } from 'react-icons/fa';

const AnswerForm = ({ onSubmit, loading }) => {
  const [answer, setAnswer] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (answer.trim() && !loading) {
      onSubmit(answer);
      setAnswer(''); // Clear after submit
    }
  };

  return (
    <form className="answer-form glass-panel" onSubmit={handleSubmit}>
      <label htmlFor="answer-input" className="form-label">
        Your Answer:
      </label>
      <textarea
        id="answer-input"
        className="form-textarea"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="Type your detailed response here..."
        rows={6}
        disabled={loading}
      />
      <div className="form-actions">
        <button 
          type="submit" 
          className="btn btn-primary" 
          disabled={!answer.trim() || loading}
        >
          {loading ? (
            <><FaSpinner className="icon spin" /> Submitting...</>
          ) : (
            <><FaPaperPlane className="icon" /> Submit Answer</>
          )}
        </button>
      </div>
    </form>
  );
};

export default AnswerForm;
