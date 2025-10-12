import { FoodTruck, Review, User } from '../types';
import { mockFoodTrucks, mockReviews } from '../data/mockData';

// Mock API service - replace with real API calls in the future
export class ApiService {
  // Food Truck endpoints
  static async getFoodTrucks(): Promise<FoodTruck[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockFoodTrucks;
  }

  static async getFoodTruckById(id: string): Promise<FoodTruck | null> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockFoodTrucks.find(truck => truck.id === id) || null;
  }

  static async getNearbyFoodTrucks(latitude: number, longitude: number, radius: number = 5): Promise<FoodTruck[]> {
    await new Promise(resolve => setTimeout(resolve, 400));
    // In a real app, this would filter by distance
    return mockFoodTrucks;
  }

  // Review endpoints
  static async getReviews(foodTruckId: string): Promise<Review[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockReviews.filter(review => review.foodTruckId === foodTruckId);
  }

  static async addReview(review: Omit<Review, 'id' | 'timestamp'>): Promise<Review> {
    await new Promise(resolve => setTimeout(resolve, 500));
    const newReview: Review = {
      ...review,
      id: Date.now().toString(),
      timestamp: new Date(),
    };
    return newReview;
  }

  // User endpoints
  static async checkIn(foodTruckId: string, userId: string): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return true;
  }

  static async addToFavorites(foodTruckId: string, userId: string): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return true;
  }

  static async removeFromFavorites(foodTruckId: string, userId: string): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return true;
  }

  // Search endpoints
  static async searchFoodTrucks(query: string): Promise<FoodTruck[]> {
    await new Promise(resolve => setTimeout(resolve, 400));
    const lowercaseQuery = query.toLowerCase();
    return mockFoodTrucks.filter(truck =>
      truck.name.toLowerCase().includes(lowercaseQuery) ||
      truck.cuisine.toLowerCase().includes(lowercaseQuery) ||
      truck.description.toLowerCase().includes(lowercaseQuery)
    );
  }
}

// Real API service template (for future implementation)
export class RealApiService {
  private static baseUrl = 'https://api.foodtruckfinder.com';

  static async getFoodTrucks(): Promise<FoodTruck[]> {
    try {
      const response = await fetch(`${this.baseUrl}/food-trucks`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching food trucks:', error);
      throw error;
    }
  }

  static async getFoodTruckById(id: string): Promise<FoodTruck | null> {
    try {
      const response = await fetch(`${this.baseUrl}/food-trucks/${id}`);
      if (!response.ok) {
        if (response.status === 404) {
          return null;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching food truck:', error);
      throw error;
    }
  }

  // Add more real API methods as needed...
}