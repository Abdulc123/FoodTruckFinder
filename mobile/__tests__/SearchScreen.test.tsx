import React from 'react';
import { render } from '@testing-library/react-native';
import SearchScreen from '../screens/SearchScreen';

describe('SearchScreen Component', () => {
  it('renders without crashing', () => {
    expect(() => render(<SearchScreen />)).not.toThrow();
  });

  it('displays the search screen title', () => {
    const { getByText } = render(<SearchScreen />);
    expect(getByText('Search')).toBeTruthy();
  });

  it('displays the search placeholder text', () => {
    const { getByText } = render(<SearchScreen />);
    expect(getByText(/This is the Search screen/)).toBeTruthy();
  });
});
