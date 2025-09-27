import React from 'react';
import { render } from '@testing-library/react-native';
import MapScreen from '../screens/MapScreen';
import { ThemeProvider } from '../theme/ThemeContext';

// Wrapper component for tests that need ThemeProvider
const MapScreenWithTheme = () => (
  <ThemeProvider>
    <MapScreen />
  </ThemeProvider>
);

describe('MapScreen Component', () => {
  it('renders without crashing', () => {
    expect(() => render(<MapScreenWithTheme />)).not.toThrow();
  });

  it('displays the map screen title', () => {
    const { getByText } = render(<MapScreenWithTheme />);
    expect(getByText('Map')).toBeTruthy();
  });

  it('displays the map placeholder text', () => {
    const { getByText } = render(<MapScreenWithTheme />);
    expect(getByText(/Replace this placeholder with a MapView/)).toBeTruthy();
  });
});
