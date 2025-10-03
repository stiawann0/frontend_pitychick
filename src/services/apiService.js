// src/services/apiService.js
import api from '../api/axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://pitychick-production.up.railway.app';

// Helper function untuk mendapatkan full image URL
export const getImageUrl = (imagePath) => {
  if (!imagePath) return '/placeholder-image.jpg';
  
  // Jika sudah full URL, return langsung
  if (imagePath.startsWith('http')) {
    return imagePath;
  }
  
  // Jika path relative, gabungkan dengan base URL
  if (imagePath.startsWith('/storage/')) {
    return `${API_BASE_URL}${imagePath}`;
  }
  
  // Jika path tanpa slash depan
  if (imagePath.startsWith('storage/')) {
    return `${API_BASE_URL}/${imagePath}`;
  }
  
  // Default case - tambahkan /storage/ jika perlu
  return `${API_BASE_URL}/storage/${imagePath}`;
};

export const apiService = {
  // Menu dengan image URL processing
  async getMenus() {
    try {
      const response = await api.get('/api/menus');
      console.log('Menus response:', response.data);
      
      const menus = response.data.data || [];
      
      // Process image URLs untuk mendapatkan full URL
      return menus.map(menu => ({
        ...menu,
        image_url: getImageUrl(menu.image) // Tambahkan property image_url
      }));
      
    } catch (error) {
      console.error('Error fetching menus:', error);
      return [];
    }
  },

  // Home dengan image URL processing
  async getHomeSettings() {
    try {
      const response = await api.get('/api/home');
      console.log('Home response:', response.data);
      
      const homeData = response.data || {};
      
      return {
        ...homeData,
        background_image_url: getImageUrl(homeData.background_image_url)
      };
      
    } catch (error) {
      console.error('Error fetching home settings:', error);
      return {};
    }
  },

  // About - DIPERBAIKI: tambahkan image URL processing
  async getAbout() {
    try {
      const response = await api.get('/api/about');
      console.log('About API response:', response.data);
      
      const aboutData = response.data || {};
      
      // Process image URLs untuk about - INI YANG DIPERBAIKI
      return {
        ...aboutData,
        main_image_url: getImageUrl(aboutData.main_image),
        story_image_url: getImageUrl(aboutData.story_image)
      };
      
    } catch (error) {
      console.error('Error fetching about data:', error);
      // Return fallback dengan image URLs yang sudah diproses
      return {
        title: "About PITY Chick",
        description_1: "Welcome to PITY Chick, your favorite crispy chicken destination.",
        description_2: "We serve the best quality chicken with authentic recipes that will keep you coming back for more.",
        main_image_url: getImageUrl('menu-images/q6IK9Ajy5xaDO97AFJaSUZjqvSr7qofiwB7WKZk2.jpg'),
        story_image_url: getImageUrl('menu-images/q6IK9Ajy5xaDO97AFJaSUZjqvSr7qofiwB7WKZk2.jpg')
      };
    }
  },

  // Gallery dengan image URL processing
  async getGallery() {
    try {
      const response = await api.get('/api/gallery');
      const galleryData = response.data.data || response.data || [];
      
      // Process image URLs untuk gallery
      return galleryData.map(item => ({
        ...item,
        image_url: getImageUrl(item.image)
      }));
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