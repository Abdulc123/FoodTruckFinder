import React from 'react';
import { render } from '@testing-library/react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import NavigationBar from '../screens/NavigationBar';

// Mock the screen components to avoid dependencies
jest.mock('../screens/MapScreen', () => {
  return function MapScreen() {
    const { View, Text } = require('react-native');
    return (
      <View testID="map-screen">
        <Text>Map Screen Content</Text>
      </View>
    );
  };
});

jest.mock('../screens/SearchScreen', () => {
  return function SearchScreen() {
    const { View, Text } = require('react-native');
    return (
      <View testID="search-screen">
        <Text>Search Screen Content</Text>
      </View>
    );
  };
});

jest.mock('../screens/ProfileScreen', () => {
  return function ProfileScreen() {
    const { View, Text } = require('react-native');
    return (
      <View testID="profile-screen">
        <Text>Profile Screen Content</Text>
      </View>
    );
  };
});

describe('NavigationBar Component', () => {
  const renderNavigationBar = () => {
    return render(
      <PaperProvider>
        <NavigationBar />
      </PaperProvider>
    );
  };

  it('renders without crashing', () => {
    expect(() => renderNavigationBar()).not.toThrow();
  });

  it('renders the bottom navigation component', () => {
    const { getByTestId } = renderNavigationBar();
    // The initial screen (Map) should be rendered by default
    expect(getByTestId('map-screen')).toBeTruthy();
  });

  it('displays map screen content initially', () => {
    const { getByText } = renderNavigationBar();
    expect(getByText('Map Screen Content')).toBeTruthy();
  });
});
