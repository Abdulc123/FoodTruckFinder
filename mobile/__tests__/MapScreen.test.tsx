import React from 'react';
import { render } from '@testing-library/react-native';
import MapScreen from '../screens/MapScreen';

describe('MapScreen Component', () => {
  it('renders without crashing', () => {
    expect(() => render(<MapScreen />)).not.toThrow();
  });

  it('displays the map screen title', () => {
    const { getByText } = render(<MapScreen />);
    expect(getByText('Map')).toBeTruthy();
  });

  it('displays the map placeholder text', () => {
    const { getByText } = render(<MapScreen />);
    expect(getByText(/This is the Map screen/)).toBeTruthy();
  });
});
