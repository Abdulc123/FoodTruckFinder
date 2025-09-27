import React from 'react';
import { render } from '@testing-library/react-native';
import ProfileScreen from '../screens/ProfileScreen';

describe('ProfileScreen Component', () => {
  it('renders without crashing', () => {
    expect(() => render(<ProfileScreen />)).not.toThrow();
  });

  it('displays the profile screen username', () => {
    const { getByText } = render(<ProfileScreen />);
    expect(getByText('User Name')).toBeTruthy();
  });

  it('displays the profile placeholder text', () => {
    const { getByText } = render(<ProfileScreen />);
    expect(getByText(/Tap to edit your profile/)).toBeTruthy();
  });
});
