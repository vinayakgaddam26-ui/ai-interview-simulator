import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Fetch interview questions
export const getQuestions = async () => {
  try {
    const response = await API.get('/questions');
    return response.data;
  } catch (error) {
    console.error("Error fetching questions:", error);
    throw error;
  }
};

// Submit user answer and receive feedback
export const submitAnswer = async (data) => {
  try {
    const response = await API.post('/answer', data);
    return response.data;
  } catch (error) {
    console.error("Error submitting answer:", error);
    throw error;
  }
};

// Fetch past interview responses
export const getHistory = async () => {
  try {
    const response = await API.get('/history');
    return response.data;
  } catch (error) {
    console.error("Error fetching history:", error);
    throw error;
  }
};

export default API;
