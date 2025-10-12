import { FoodTruck, Review } from '../types';

export const mockFoodTrucks: FoodTruck[] = [
  {
    id: '1',
    name: 'Taco Fiesta',
    description: 'Authentic Mexican street tacos with fresh ingredients and homemade salsas.',
    cuisine: 'Mexican',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400',
    location: {
      latitude: 37.7749,
      longitude: -122.4194,
      address: '123 Market St, San Francisco, CA'
    },
    hours: {
      monday: { open: '11:00', close: '20:00' },
      tuesday: { open: '11:00', close: '20:00' },
      wednesday: { open: '11:00', close: '20:00' },
      thursday: { open: '11:00', close: '20:00' },
      friday: { open: '11:00', close: '21:00' },
      saturday: { open: '10:00', close: '21:00' },
      sunday: { open: '10:00', close: '19:00' }
    },
    rating: 4.5,
    reviewCount: 127,
    priceRange: '$$',
    features: ['Vegetarian Options', 'Outdoor Seating', 'Cash Only'],
    isOpen: true
  },
  {
    id: '2',
    name: 'Burger Barn',
    description: 'Gourmet burgers made with locally sourced beef and fresh toppings.',
    cuisine: 'American',
    image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400',
    location: {
      latitude: 37.7849,
      longitude: -122.4094,
      address: '456 Castro St, San Francisco, CA'
    },
    hours: {
      monday: { open: '12:00', close: '22:00' },
      tuesday: { open: '12:00', close: '22:00' },
      wednesday: { open: '12:00', close: '22:00' },
      thursday: { open: '12:00', close: '22:00' },
      friday: { open: '12:00', close: '23:00' },
      saturday: { open: '11:00', close: '23:00' },
      sunday: { open: '11:00', close: '21:00' }
    },
    rating: 4.2,
    reviewCount: 89,
    priceRange: '$$$',
    features: ['Gluten-Free Options', 'Pet Friendly', 'WiFi'],
    isOpen: true
  },
  {
    id: '3',
    name: 'Noodle Express',
    description: 'Fresh Asian noodles and stir-fries made to order.',
    cuisine: 'Asian',
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400',
    location: {
      latitude: 37.7649,
      longitude: -122.4294,
      address: '789 Mission St, San Francisco, CA'
    },
    hours: {
      monday: { open: '10:00', close: '19:00' },
      tuesday: { open: '10:00', close: '19:00' },
      wednesday: { open: '10:00', close: '19:00' },
      thursday: { open: '10:00', close: '19:00' },
      friday: { open: '10:00', close: '20:00' },
      saturday: { open: '09:00', close: '20:00' },
      sunday: { open: '09:00', close: '18:00' }
    },
    rating: 4.7,
    reviewCount: 203,
    priceRange: '$$',
    features: ['Vegan Options', 'Quick Service', 'Mobile Payment'],
    isOpen: false
  },
  {
    id: '4',
    name: 'Pizza Corner',
    description: 'Wood-fired pizza with fresh ingredients and creative toppings.',
    cuisine: 'Italian',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400',
    location: {
      latitude: 37.7549,
      longitude: -122.4394,
      address: '321 Valencia St, San Francisco, CA'
    },
    hours: {
      monday: { open: '17:00', close: '23:00' },
      tuesday: { open: '17:00', close: '23:00' },
      wednesday: { open: '17:00', close: '23:00' },
      thursday: { open: '17:00', close: '23:00' },
      friday: { open: '17:00', close: '24:00' },
      saturday: { open: '16:00', close: '24:00' },
      sunday: { open: '16:00', close: '22:00' }
    },
    rating: 4.3,
    reviewCount: 156,
    priceRange: '$$$',
    features: ['Outdoor Seating', 'Wine Selection', 'Group Friendly'],
    isOpen: true
  },
  {
    id: '5',
    name: 'Sweet Treats',
    description: 'Artisanal ice cream and desserts made with organic ingredients.',
    cuisine: 'Dessert',
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400',
    location: {
      latitude: 37.7949,
      longitude: -122.4094,
      address: '654 Hayes St, San Francisco, CA'
    },
    hours: {
      monday: { open: '13:00', close: '21:00' },
      tuesday: { open: '13:00', close: '21:00' },
      wednesday: { open: '13:00', close: '21:00' },
      thursday: { open: '13:00', close: '21:00' },
      friday: { open: '13:00', close: '22:00' },
      saturday: { open: '12:00', close: '22:00' },
      sunday: { open: '12:00', close: '20:00' }
    },
    rating: 4.8,
    reviewCount: 94,
    priceRange: '$$',
    features: ['Organic', 'Dairy-Free Options', 'Kid Friendly'],
    isOpen: true
  }
];

export const mockReviews: Review[] = [
  {
    id: '1',
    foodTruckId: '1',
    userId: 'user1',
    userName: 'Sarah M.',
    userAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100',
    rating: 5,
    comment: 'Amazing tacos! The carne asada was perfectly seasoned and the salsas were incredible. Will definitely be back!',
    images: ['https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300'],
    timestamp: new Date('2024-01-15'),
    helpful: 12
  },
  {
    id: '2',
    foodTruckId: '1',
    userId: 'user2',
    userName: 'Mike R.',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
    rating: 4,
    comment: 'Great food and fast service. The line can get long during lunch hours but it\'s worth the wait.',
    images: [],
    timestamp: new Date('2024-01-10'),
    helpful: 8
  },
  {
    id: '3',
    foodTruckId: '2',
    userId: 'user3',
    userName: 'Emma L.',
    userAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
    rating: 5,
    comment: 'Best burger I\'ve had in the city! The patty was juicy and the bun was perfectly toasted.',
    images: ['https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=300'],
    timestamp: new Date('2024-01-12'),
    helpful: 15
  }
];
