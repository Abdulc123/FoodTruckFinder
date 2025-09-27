import React from 'react';
import { render } from '@testing-library/react-native';
import SearchScreen from '../screens/SearchScreen';
import { ThemeProvider } from '../theme/ThemeContext';

// Wrapper component for tests that need ThemeProvider
const SearchScreenWithTheme = () => (
  <ThemeProvider>
    <SearchScreen />
  </ThemeProvider>
);

describe('SearchScreen Component', () => {
  it('renders without crashing', () => {
    expect(() => render(<SearchScreenWithTheme />)).not.toThrow();
  });

  it('displays the search screen title', () => {
    const { getByText } = render(<SearchScreenWithTheme />);
    expect(getByText('Search')).toBeTruthy();
  });

  it('displays the search placeholder text', () => {
    const { getByText } = render(<SearchScreenWithTheme />);
    expect(getByText(/Results will show here/)).toBeTruthy();
  });
});
