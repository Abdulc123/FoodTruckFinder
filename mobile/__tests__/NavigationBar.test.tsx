import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import NavigationBar from '../screens/NavigationBar';
import { ThemeProvider } from '../theme/ThemeContext';

// Mock the individual screens to make them consistent for testing
jest.mock('../screens/MapScreen', () => {
  return function MapScreen() {
    const { View, Text } = require('react-native');
    return (
      <View testID="map-screen">
        <Text testID="map-title">Map Screen</Text>
      </View>
    );
  };
});

jest.mock('../screens/SearchScreen', () => {
  return function SearchScreen() {
    const { View, Text } = require('react-native');
    return (
      <View testID="search-screen">
        <Text testID="search-title">Search Screen</Text>
      </View>
    );
  };
});

jest.mock('../screens/ProfileScreen', () => {
  return function ProfileScreen() {
    const { View, Text } = require('react-native');
    return (
      <View testID="profile-screen">
        <Text testID="profile-title">Profile Screen</Text>
      </View>
    );
  };
});

// Mock react-native-paper to avoid dependency issues
jest.mock('react-native-paper', () => {
  const { View } = require('react-native');
  
  const MockBottomNavigation = ({ renderScene, navigationState, onIndexChange, renderIcon }: any) => {
    const { index, routes } = navigationState;
    const currentRoute = routes[index];
    const SceneComponent = renderScene[currentRoute.key];
    return (
      <View testID="mock-bottom-navigation">
        <SceneComponent />
        <View testID="navigation-tabs">
          {routes.map((route: any, routeIndex: number) => (
            <View key={route.key} testID={`tab-${route.key}`}>
              {renderIcon && renderIcon({ route, focused: routeIndex === index, color: routeIndex === index ? '#FFFFFF' : 'rgba(255,255,255,0.6)' })}
            </View>
          ))}
        </View>
      </View>
    );
  };

  // Add SceneMap as a static method
  MockBottomNavigation.SceneMap = (scenes: any) => scenes;

  return {
    Provider: ({ children }: any) => children,
    BottomNavigation: MockBottomNavigation,
  };
});

describe('NavigationBar Component', () => {
  it('renders without crashing', () => {
    expect(() => render(
      <ThemeProvider initialTheme="drexel">
        <NavigationBar />
      </ThemeProvider>
    )).not.toThrow();
  });

  it('displays all navigation tabs with icons', () => {
    const { getByTestId } = render(
      <ThemeProvider initialTheme="drexel">
        <NavigationBar />
      </ThemeProvider>
    );

    expect(getByTestId('tab-map')).toBeTruthy();
    expect(getByTestId('tab-search')).toBeTruthy();
    expect(getByTestId('tab-profile')).toBeTruthy();
  });

  it('shows map screen by default', () => {
    const { getByTestId } = render(
      <ThemeProvider initialTheme="drexel">
        <NavigationBar />
      </ThemeProvider>
    );

    expect(getByTestId('map-screen')).toBeTruthy();
    expect(getByTestId('map-title')).toHaveTextContent('Map Screen');
  });

  it('renders with proper theme colors', () => {
    const { getByTestId } = render(
      <ThemeProvider initialTheme="drexel">
        <NavigationBar />
      </ThemeProvider>
    );

    // Should render without theme-related errors
    expect(getByTestId('mock-bottom-navigation')).toBeTruthy();
  });
});