// src/store/useHistoryStore.js
import {create} from 'zustand';
import api from '../lib/axios';

const useHistoryStore = create((set, get) => ({
  todayHistory: null,
  latestArticles: [],
  loadingHistory: false,
  loadingArticles: false,
  errorHistory: null,
  errorArticles: null,

  fetchTodayHistory: async () => {
    set({ loadingHistory: true, errorHistory: null });
    try {
      const res = await api.get('/today-history'); // your real endpoint
      set({ todayHistory: res.data, loadingHistory: false });
    } catch (error) {
      set({ errorHistory: error.message, loadingHistory: false });
    }
  },

  fetchLatestArticles: async () => {
    set({ loadingArticles: true, errorArticles: null });
    try {
      const res = await api.get('/articles');
      set({ latestArticles: res.data, loadingArticles: false });
    } catch (error) {
      set({ errorArticles: error.message, loadingArticles: false });
    }
  },
}));

export default useHistoryStore;
