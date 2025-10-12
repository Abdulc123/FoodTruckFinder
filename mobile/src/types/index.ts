export interface FoodTruck {
  id: string;
  name: string;
  description: string;
  cuisine: string;
  image: string;
  location: {
    latitude: number;
    longitude: number;
    address: string;
  };
  hours: {
    [key: string]: {
      open: string;
      close: string;
    };
  };
  rating: number;
  reviewCount: number;
  priceRange: '$' | '$$' | '$$$' | '$$$$';
  features: string[];
  isOpen: boolean;
  distance?: number;
}

export interface Review {
  id: string;
  foodTruckId: string;
  userId: string;
  userName: string;
  userAvatar: string;
  rating: number;
  comment: string;
  images: string[];
  timestamp: Date;
  helpful: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  favoriteTrucks: string[];
  checkIns: CheckIn[];
}

export interface CheckIn {
  id: string;
  foodTruckId: string;
  userId: string;
  timestamp: Date;
  location: {
    latitude: number;
    longitude: number;
  };
}

export interface NavigationProps {
  navigation: any;
  route: any;
}

export type RootStackParamList = {
  Home: undefined;
  Map: undefined;
  FoodTruckDetail: { foodTruck: FoodTruck };
  Profile: undefined;
  Reviews: { foodTruckId: string };
};
