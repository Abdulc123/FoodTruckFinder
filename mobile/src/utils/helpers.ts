import { FoodTruck } from '../types';

// Distance calculation between two coordinates (Haversine formula)
export const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};

// Format distance for display
export const formatDistance = (distance: number): string => {
  if (distance < 1) {
    return `${(distance * 1000).toFixed(0)}m`;
  }
  return `${distance.toFixed(1)}km`;
};

// Check if food truck is currently open
export const isFoodTruckOpen = (foodTruck: FoodTruck): boolean => {
  const now = new Date();
  const currentDay = now.toLocaleDateString('en-US', { weekday: 'lowercase' });
  const currentTime = now.toLocaleTimeString('en-US', { 
    hour12: false, 
    hour: '2-digit', 
    minute: '2-digit' 
  });

  const hours = foodTruck.hours[currentDay as keyof typeof foodTruck.hours];
  if (!hours) return false;

  return currentTime >= hours.open && currentTime <= hours.close;
};

// Get current day of week
export const getCurrentDay = (): string => {
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  return days[new Date().getDay()];
};

// Format date for display
export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

// Format time for display
export const formatTime = (date: Date): string => {
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
};

// Generate star rating display
export const generateStars = (rating: number): string => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  return '⭐'.repeat(fullStars) + (hasHalfStar ? '⭐' : '');
};

// Sort food trucks by distance
export const sortByDistance = (trucks: FoodTruck[]): FoodTruck[] => {
  return trucks.sort((a, b) => {
    if (!a.distance || !b.distance) return 0;
    return a.distance - b.distance;
  });
};

// Filter food trucks by cuisine
export const filterByCuisine = (trucks: FoodTruck[], cuisine: string): FoodTruck[] => {
  if (!cuisine) return trucks;
  return trucks.filter(truck => 
    truck.cuisine.toLowerCase().includes(cuisine.toLowerCase())
  );
};

// Filter food trucks by price range
export const filterByPriceRange = (trucks: FoodTruck[], priceRange: string): FoodTruck[] => {
  if (!priceRange) return trucks;
  return trucks.filter(truck => truck.priceRange === priceRange);
};

// Filter open food trucks
export const filterOpenTrucks = (trucks: FoodTruck[]): FoodTruck[] => {
  return trucks.filter(truck => truck.isOpen);
};

// Search food trucks by query
export const searchFoodTrucks = (trucks: FoodTruck[], query: string): FoodTruck[] => {
  if (!query.trim()) return trucks;
  
  const lowercaseQuery = query.toLowerCase();
  return trucks.filter(truck =>
    truck.name.toLowerCase().includes(lowercaseQuery) ||
    truck.cuisine.toLowerCase().includes(lowercaseQuery) ||
    truck.description.toLowerCase().includes(lowercaseQuery) ||
    truck.features.some(feature => 
      feature.toLowerCase().includes(lowercaseQuery)
    )
  );
};

// Validate email format
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validate phone number format
export const isValidPhoneNumber = (phone: string): boolean => {
  const phoneRegex = /^\+?[\d\s\-\(\)]+$/;
  return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
};

// Debounce function for search
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};