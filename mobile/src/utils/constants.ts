// App Constants
export const APP_CONFIG = {
  name: 'Food Truck Finder',
  version: '1.0.0',
  description: 'Find and discover food trucks in your area',
};

// Map Configuration
export const MAP_CONFIG = {
  defaultRegion: {
    latitude: 37.7749,
    longitude: -122.4194,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  },
  zoomLevel: 0.01,
  maxZoomLevel: 0.005,
};

// API Configuration (for future use)
export const API_CONFIG = {
  baseUrl: 'https://api.foodtruckfinder.com',
  timeout: 10000,
  retryAttempts: 3,
};

// Location Configuration
export const LOCATION_CONFIG = {
  enableHighAccuracy: true,
  timeout: 15000,
  maximumAge: 10000,
};

// UI Constants
export const UI_CONFIG = {
  colors: {
    primary: '#3498DB',
    secondary: '#2ECC71',
    accent: '#E74C3C',
    background: '#F8F9FA',
    surface: '#FFFFFF',
    text: '#2C3E50',
    textSecondary: '#7F8C8D',
    border: '#E5E7EB',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
  },
};