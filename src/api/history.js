import api from "../lib/axios";
const today = new Date().toISOString().split('T')[0];
// const API_URL = `http://localhost:5000/;

export const getTodayHistory = async () => {
  try {
    const res = await api.get(`/articles/today-history/${today}`);
    // console.log("history of the day", res);
    // console.log("history of the day", res.data);
    return res.data;
  } catch (err) {
    console.error('Error fetching history:', err);
    return [];
  }
};
