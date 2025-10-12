# Food Truck Finder Mobile App

A community-oriented React Native mobile app for discovering and finding food trucks near you.

## Features

### 🗺️ Interactive Map
- Real-time map view with food truck locations
- Custom markers showing truck status (open/closed)
- Distance calculations from user location
- Tap markers to see truck details

### 🏠 Home Screen
- Search functionality for food trucks, cuisine, and locations
- Quick stats showing open trucks and total count
- "Open Now" and "Nearby" sections
- Horizontal scrolling cards for easy browsing

### 📱 Food Truck Details
- Comprehensive truck information
- Operating hours with current day highlighting
- Features and amenities
- Community reviews and ratings
- Check-in and share functionality

### 👤 User Profile
- User statistics (check-ins, reviews, favorites)
- Recent activity feed
- Menu for favorites, check-ins, and settings

### 🌟 Community Features
- User reviews and ratings
- Check-in functionality
- Favorite trucks
- Helpful review voting

## Tech Stack

- **React Native** - Cross-platform mobile development
- **TypeScript** - Type safety and better development experience
- **React Navigation** - Navigation between screens
- **React Native Maps** - Interactive map functionality
- **React Native Geolocation** - Location services
- **React Native Paper** - Material Design components

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── MapView.tsx
│   ├── FoodTruckMarker.tsx
│   ├── FoodTruckCard.tsx
│   └── ReviewCard.tsx
├── screens/            # App screens
│   ├── HomeScreen.tsx
│   ├── MapScreen.tsx
│   ├── FoodTruckDetailScreen.tsx
│   └── ProfileScreen.tsx
├── types/              # TypeScript type definitions
│   └── index.ts
├── data/               # Mock data and constants
│   └── mockData.ts
├── utils/              # Utility functions
│   ├── constants.ts
│   └── helpers.ts
└── services/           # API services
    └── api.ts
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- React Native CLI
- Android Studio (for Android development)
- Xcode (for iOS development)

### Installation

1. Navigate to the mobile directory:
```bash
cd mobile
```

2. Install dependencies:
```bash
npm install
```

3. For iOS, install pods:
```bash
cd ios && pod install && cd ..
```

### Running the App

#### Android
```bash
npm run android
```

#### iOS
```bash
npm run ios
```

## Key Components

### MapView Component
- Displays interactive map with food truck markers
- Handles user location and distance calculations
- Custom markers with truck status indicators

### FoodTruckCard Component
- Displays truck information in a card format
- Shows rating, distance, and status
- Interactive with press and close actions

### Navigation Structure
- Bottom tab navigation for main screens
- Stack navigation for detail screens
- Type-safe navigation with TypeScript

## Mock Data

The app includes comprehensive mock data for:
- 5 sample food trucks with realistic information
- User reviews and ratings
- Operating hours and features
- Location data for San Francisco area

## Future Enhancements

- [ ] Real-time location tracking
- [ ] Push notifications for nearby trucks
- [ ] Social features (following, sharing)
- [ ] Advanced filtering and sorting
- [ ] Offline support
- [ ] Backend integration
- [ ] Payment integration
- [ ] Order ahead functionality

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.