import React from 'react';
import { FaPlay, FaClipboardList } from 'react-icons/fa';

const Dashboard = ({ onStartInterview, onViewHistory }) => {
  return (
    <div className="dashboard-container">
      <div className="dashboard-card glass-panel">
        <h1 className="title">AI Interview Simulator</h1>
        <p className="subtitle">Master your next interview with our AI-powered practice platform.</p>
        
        <div className="instructions">
          <h3>Instructions</h3>
          <ul>
            <li>You will be asked a series of common interview questions.</li>
            <li>Take your time to think and type out your best response.</li>
            <li>Our AI will evaluate your answer and provide instant feedback.</li>
            <li>Review your performance to improve your skills.</li>
          </ul>
        </div>

        <div className="dashboard-actions">
          <button className="btn btn-primary" onClick={onStartInterview}>
            <FaPlay className="icon" /> Start Interview
          </button>
          <button className="btn btn-secondary" onClick={onViewHistory}>
            <FaClipboardList className="icon" /> View History
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
