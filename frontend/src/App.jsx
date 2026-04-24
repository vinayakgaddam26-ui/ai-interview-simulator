import React, { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import QuestionCard from './components/QuestionCard';
import AnswerForm from './components/AnswerForm';
import FeedbackCard from './components/FeedbackCard';
import History from './components/History';
import { getQuestions, submitAnswer } from './services/api';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('dashboard'); // 'dashboard', 'interview', 'history', 'completion'
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedbackData, setFeedbackData] = useState(null);
  const [isLoadingQuestions, setIsLoadingQuestions] = useState(false);

  // Start the interview
  const handleStartInterview = async () => {
    setIsLoadingQuestions(true);
    setCurrentView('interview');
    setCurrentQuestionIndex(0);
    setFeedbackData(null);
    try {
      const response = await getQuestions();
      if (response && response.data) {
        setQuestions(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch questions", error);
      // Fallback questions if backend is not reachable for the demo
      setQuestions([
        "Tell me about a time you faced a difficult challenge and how you overcame it.",
        "Where do you see yourself in 5 years?",
        "Why do you want to work for our company?",
        "Describe a time you disagreed with a colleague and how you handled it."
      ]);
    } finally {
      setIsLoadingQuestions(false);
    }
  };

  // Submit answer to the backend
  const handleAnswerSubmit = async (answer) => {
    setIsSubmitting(true);
    try {
      const response = await submitAnswer({
        question: questions[currentQuestionIndex],
        answer: answer
      });
      if (response && response.data) {
        setFeedbackData(response.data);
      }
    } catch (error) {
      console.error("Failed to submit answer", error);
      // Fallback mock feedback
      setFeedbackData({
        score: Math.floor(Math.random() * 5) + 5,
        feedback: "Good attempt. Try to structure your answer using the STAR method to provide more concrete details."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNextQuestion = () => {
    setFeedbackData(null);
    setCurrentQuestionIndex((prev) => prev + 1);
  };

  const handleFinish = () => {
    setCurrentView('dashboard');
    setFeedbackData(null);
    setCurrentQuestionIndex(0);
  };

  const handleComplete = () => {
    setCurrentView('completion');
    setFeedbackData(null);
  };

  // Automatically move to the next question or completion screen after feedback
  useEffect(() => {
    let timer;
    if (feedbackData && currentView === 'interview') {
      timer = setTimeout(() => {
        if (currentQuestionIndex < questions.length - 1) {
          handleNextQuestion();
        } else {
          handleComplete();
        }
      }, 5000); // 5 seconds to read feedback
    }
    return () => clearTimeout(timer);
  }, [feedbackData, currentView, currentQuestionIndex, questions.length]);

  return (
    <div className="app-container">
      {currentView === 'dashboard' && (
        <Dashboard 
          onStartInterview={handleStartInterview} 
          onViewHistory={() => setCurrentView('history')} 
        />
      )}

      {currentView === 'history' && (
        <History onGoHome={() => setCurrentView('dashboard')} />
      )}

      {currentView === 'completion' && (
        <div className="completion-state glass-panel" style={{ textAlign: 'center', padding: '40px' }}>
          <h2>Interview Completed!</h2>
          <p>Great job! You have completed all the questions for this session.</p>
          <div className="completion-actions" style={{ display: 'flex', gap: '15px', justifyContent: 'center', marginTop: '30px' }}>
            <button className="btn btn-primary" onClick={handleStartInterview}>Restart Interview</button>
            <button className="btn btn-secondary" onClick={() => setCurrentView('dashboard')}>Return to Dashboard</button>
          </div>
        </div>
      )}

      {currentView === 'interview' && (
        <div className="interview-container">
          <div className="interview-header glass-panel">
            <h2 className="title">Mock Interview in Progress</h2>
            <button className="btn btn-secondary-small" onClick={handleFinish}>
              End Early
            </button>
          </div>

          {isLoadingQuestions ? (
            <div className="loading-state glass-panel" style={{ textAlign: 'center', padding: '40px' }}>
              <div className="spinner"></div>
              <p>Preparing your questions...</p>
            </div>
          ) : questions.length > 0 ? (
            <div className="interview-flow">
              <QuestionCard 
                question={questions[currentQuestionIndex]} 
                currentQuestion={currentQuestionIndex + 1} 
                totalQuestions={questions.length} 
              />
              
              {!feedbackData ? (
                <AnswerForm 
                  onSubmit={handleAnswerSubmit} 
                  loading={isSubmitting} 
                />
              ) : (
                <FeedbackCard 
                  feedback={feedbackData.feedback}
                  score={feedbackData.score}
                  onNextQuestion={handleNextQuestion}
                  isLastQuestion={currentQuestionIndex === questions.length - 1}
                  onFinish={handleComplete}
                />
              )}
            </div>
          ) : (
             <div className="error-state glass-panel" style={{ textAlign: 'center', padding: '40px' }}>
                <p>Could not load questions. Please try again later.</p>
                <button className="btn btn-primary" onClick={handleFinish}>Return to Dashboard</button>
             </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
