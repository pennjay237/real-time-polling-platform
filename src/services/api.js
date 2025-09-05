import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const loginHost = async (credentials) => {
  const res = await axios.post(`${API_URL}/login`, credentials);
  return res.data;
};

export const createPoll = async (pollData) => {
  const res = await axios.post(`${API_URL}/polls`, pollData);
  return res.data;
};

