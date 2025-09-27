import React from 'react';
import { render } from '@testing-library/react-native';
import ProfileScreen from '../screens/ProfileScreen';
import { ThemeProvider } from '../theme/ThemeContext';

// Wrapper component for tests that need ThemeProvider
const ProfileScreenWithTheme = () => (
  <ThemeProvider>
    <ProfileScreen />
  </ThemeProvider>
);

describe('ProfileScreen Component', () => {
  it('renders without crashing', () => {
    expect(() => render(<ProfileScreenWithTheme />)).not.toThrow();
  });

  it('displays the profile screen username', () => {
    const { getByText } = render(<ProfileScreenWithTheme />);
    expect(getByText('User Name')).toBeTruthy();
  });

  it('displays the profile placeholder text', () => {
    const { getByText } = render(<ProfileScreenWithTheme />);
    expect(getByText(/Tap to edit your profile or view saved trucks/)).toBeTruthy();
  });
});
