// src/services/apiService.js
import api from '../api/axios';

export const apiService = {
  // Menu
  async getMenus() {
    try {
      const response = await api.get('/api/menus');
      return response.data;
    } catch (error) {
      console.error('Error fetching menus:', error);
      throw error;
    }
  },

  // Home
  async getHomeSettings() {
    try {
      const response = await api.get('/api/home');
      return response.data;
    } catch (error) {
      console.error('Error fetching home settings:', error);
      throw error;
    }
  },

  // About
  async getAbout() {
    try {
      const response = await api.get('/api/about');
      return response.data;
    } catch (error) {
      console.error('Error fetching about data:', error);
      throw error;
    }
  },

  // Gallery
  async getGallery() {
    try {
      const response = await api.get('/api/gallery');
      return response.data;
    } catch (error) {
      console.error('Error fetching gallery:', error);
      throw error;
    }
  },

  // Reviews
  async getReviews() {
    try {
      const response = await api.get('/api/reviews');
      return response.data;
    } catch (error) {
      console.error('Error fetching reviews:', error);
      throw error;
    }
  },

  // Footer
  async getFooter() {
    try {
      const response = await api.get('/api/footer');
      return response.data;
    } catch (error) {
      console.error('Error fetching footer:', error);
      throw error;
    }
  }
};

export default apiService;