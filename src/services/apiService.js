import api from '../api/axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://pitychick-production.up.railway.app';

// Fallback images untuk berbagai kategori
const FALLBACK_IMAGES = {
  gallery: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop",
  menu: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop",
  about: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop",
  home: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=600&fit=crop"
};

// Fungsi bantu untuk mendapatkan full URL gambar
export const getImageUrl = (imagePath, type = 'gallery') => {
  // Jika tidak ada imagePath, return fallback
  if (!imagePath) {
    return FALLBACK_IMAGES[type] || FALLBACK_IMAGES.gallery;
  }

  // Jika sudah full URL, return langsung
  if (imagePath.startsWith('http')) {
    return imagePath;
  }
  
  // Jika path dimulai dengan storage
  if (imagePath.startsWith('/storage/')) {
    return `${API_BASE_URL}${imagePath}`;
  }
  
  if (imagePath.startsWith('storage/')) {
    return `${API_BASE_URL}/${imagePath}`;
  }

  // Default case - tambahkan prefix storage
  return `${API_BASE_URL}/storage/${imagePath}`;
};

// Fungsi untuk validasi response data
const validateGalleryData = (data) => {
  if (!data || !Array.isArray(data)) {
    console.warn('Invalid gallery data format:', data);
    return [];
  }
  
  return data.filter(item => {
    // Validasi item minimal memiliki image_path, image, atau image_url
    const hasImage = item.image_path || item.image || item.image_url;
    if (!hasImage) {
      console.warn('Gallery item missing image data:', item);
    }
    return hasImage;
  });
};

export const apiService = {
  // Ambil data galeri dengan improved error handling
  async getGallery() {
    try {
      console.log('Fetching gallery data from API...');
      const response = await api.get('/api/gallery');
      
      // Handle berbagai format response
      let galleryData = [];
      if (response.data && Array.isArray(response.data.data)) {
        galleryData = response.data.data;
      } else if (Array.isArray(response.data)) {
        galleryData = response.data;
      } else if (response.data && Array.isArray(response.data.gallery)) {
        galleryData = response.data.gallery;
      }
      
      console.log('Raw gallery data:', galleryData);

      // Validasi data
      const validatedData = validateGalleryData(galleryData);
      
      // Process data dengan fallback handling
      const processedData = validatedData.map((item, index) => {
        // Coba berbagai kemungkinan field image
        const imagePath = item.image_path || item.image || item.image_url || item.url;
        
        return {
          id: item.id || index,
          title: item.title || item.name || `Gallery Image ${index + 1}`,
          description: item.description || item.caption,
          image_url: getImageUrl(imagePath, 'gallery'),
          // Debug info untuk development
          _debug: {
            original_data: item,
            image_path: item.image_path,
            image: item.image,
            image_url: item.image_url,
            final_url: getImageUrl(imagePath, 'gallery')
          }
        };
      });

      console.log('Processed gallery data:', processedData);
      return processedData;

    } catch (error) {
      console.error('Error fetching gallery:', error);
      
      // Return empty array instead of throwing to prevent component crash
      return [];
    }
  },

  // Ambil data menu dengan improved error handling
  async getMenus() {
    try {
      const response = await api.get('/api/menus');
      const menus = response.data.data || response.data || [];

      return menus.map((menu, index) => ({
        id: menu.id || index,
        name: menu.name || menu.title,
        description: menu.description,
        price: menu.price,
        category: menu.category,
        image_url: getImageUrl(menu.image, 'menu'),
        _debug: {
          original_data: menu
        }
      }));
    } catch (error) {
      console.error('Error fetching menus:', error);
      return [];
    }
  },

  // Ambil data home dengan improved error handling
  async getHomeSettings() {
    try {
      const response = await api.get('/api/home');
      const homeData = response.data || {};

      return {
        title: homeData.title || "PITY Chick",
        subtitle: homeData.subtitle || "Best Crispy Chicken in Town",
        description: homeData.description,
        background_image_url: getImageUrl(homeData.background_image_url, 'home'),
        _debug: {
          original_data: homeData
        }
      };
    } catch (error) {
      console.error('Error fetching home settings:', error);
      return {
        title: "PITY Chick",
        subtitle: "Best Crispy Chicken in Town",
        background_image_url: FALLBACK_IMAGES.home
      };
    }
  },

  // Ambil data about dengan improved error handling
  async getAbout() {
    try {
      const response = await api.get('/api/about');
      const aboutData = response.data || {};

      return {
        title: aboutData.title || "About PITY Chick",
        description_1: aboutData.description_1 || "Welcome to PITY Chick, your favorite crispy chicken destination.",
        description_2: aboutData.description_2 || "We serve the best quality chicken with authentic recipes that will keep you coming back for more.",
        main_image_url: getImageUrl(aboutData.main_image, 'about'),
        story_image_url: getImageUrl(aboutData.story_image, 'about'),
        _debug: {
          original_data: aboutData
        }
      };
    } catch (error) {
      console.error('Error fetching about data:', error);
      return {
        title: "About PITY Chick",
        description_1: "Welcome to PITY Chick, your favorite crispy chicken destination.",
        description_2: "We serve the best quality chicken with authentic recipes that will keep you coming back for more.",
        main_image_url: FALLBACK_IMAGES.about,
        story_image_url: FALLBACK_IMAGES.about
      };
    }
  },

  // Ambil data review
  async getReviews() {
    try {
      const response = await api.get('/api/reviews');
      return response.data.data || response.data || [];
    } catch (error) {
      console.error('Error fetching reviews:', error);
      return [];
    }
  },

  // Ambil data footer
  async getFooter() {
    try {
      const response = await api.get('/api/footer');
      return response.data.data || response.data || {};
    } catch (error) {
      console.error('Error fetching footer:', error);
      return {};
    }
  },

  // Utility function untuk check image availability
  async checkImageAvailability(url) {
    try {
      const response = await fetch(url, { method: 'HEAD' });
      return response.ok;
    } catch (error) {
      return false;
    }
  }
};

export default apiService;