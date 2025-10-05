import api from '../api/axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://pitychick-production.up.railway.app';

// Fungsi bantu untuk mendapatkan full URL gambar
export const getImageUrl = (imagePath) => {
  if (!imagePath) return `${API_BASE_URL}/storage/gallery/placeholder-gallery.jpg`;

  if (imagePath.startsWith('http')) return imagePath;
  if (imagePath.startsWith('/storage/')) return `${API_BASE_URL}${imagePath}`;
  if (imagePath.startsWith('storage/')) return `${API_BASE_URL}/${imagePath}`;

  return `${API_BASE_URL}/storage/${imagePath}`;
};

export const apiService = {
  // Ambil data galeri
  async getGallery() {
    try {
      const response = await api.get('/api/gallery');
      const galleryData = response.data.data || response.data || [];

      return galleryData.map(item => ({
        ...item,
        image_url: getImageUrl(item.image_path) // ✅ gunakan image_path dari database
      }));
    } catch (error) {
      console.error('Error fetching gallery:', error);
      return [];
    }
  },

  // Ambil data menu
  async getMenus() {
    try {
      const response = await api.get('/api/menus');
      const menus = response.data.data || [];

      return menus.map(menu => ({
        ...menu,
        image_url: getImageUrl(menu.image)
      }));
    } catch (error) {
      console.error('Error fetching menus:', error);
      return [];
    }
  },

  // Ambil data home
  async getHomeSettings() {
    try {
      const response = await api.get('/api/home');
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

  // Ambil data about
  async getAbout() {
    try {
      const response = await api.get('/api/about');
      const aboutData = response.data || {};

      return {
        ...aboutData,
        main_image_url: getImageUrl(aboutData.main_image),
        story_image_url: getImageUrl(aboutData.story_image)
      };
    } catch (error) {
      console.error('Error fetching about data:', error);
      return {
        title: "About PITY Chick",
        description_1: "Welcome to PITY Chick, your favorite crispy chicken destination.",
        description_2: "We serve the best quality chicken with authentic recipes that will keep you coming back for more.",
        main_image_url: '/images/placeholder-about.jpg',
        story_image_url: '/images/placeholder-story.jpg'
      };
    }
  },

  // Ambil data review
  async getReviews() {
    try {
      const response = await api.get('/api/reviews');
      return response.data;
    } catch (error) {
      console.error('Error fetching reviews:', error);
      return [];
    }
  },

  // Ambil data footer
  async getFooter() {
    try {
      const response = await api.get('/api/footer');
      return response.data;
    } catch (error) {
      console.error('Error fetching footer:', error);
      return {};
    }
  }
};

export default apiService;
