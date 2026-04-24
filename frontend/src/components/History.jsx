import React, { useEffect, useState } from 'react';
import { getHistory } from '../services/api';
import { FaHome, FaSpinner, FaHistory } from 'react-icons/fa';

const History = ({ onGoHome }) => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await getHistory();
        // Set history to empty if not found or format it correctly
        if (response && response.data) {
           setHistory(response.data);
        } else {
           setHistory([]);
        }
      } catch (err) {
        setError('Failed to load interview history.');
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  return (
    <div className="history-container">
      <div className="history-header glass-panel">
        <h2 className="title"><FaHistory /> Interview History</h2>
        <button className="btn btn-secondary" onClick={onGoHome}>
          <FaHome className="icon" /> Back to Dashboard
        </button>
      </div>

      {loading ? (
        <div className="loading-state">
          <FaSpinner className="icon-large spin" />
          <p>Loading history...</p>
        </div>
      ) : error ? (
        <div className="error-state glass-panel">
          <p>{error}</p>
        </div>
      ) : history.length === 0 ? (
        <div className="empty-state glass-panel">
          <p>No past interviews found. Start one today!</p>
        </div>
      ) : (
        <div className="history-list">
          {history.map((item, index) => (
            <div key={item._id || index} className="history-card glass-panel">
              <div className="history-card-header">
                <span className="date-badge">
                  {new Date(item.createdAt).toLocaleDateString()}
                </span>
                <span className={`score-badge score-${item.score >= 8 ? 'high' : item.score >= 5 ? 'medium' : 'low'}`}>
                  Score: {item.score}/10
                </span>
              </div>
              
              <div className="history-qa">
                <div className="q-block">
                  <strong>Q:</strong> {item.question}
                </div>
                <div className="a-block">
                  <strong>Your Answer:</strong> {item.answer || item.userAnswer}
                </div>
              </div>
              
              <div className="history-feedback">
                <strong>AI Feedback:</strong>
                <p>{item.feedback}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default History;
