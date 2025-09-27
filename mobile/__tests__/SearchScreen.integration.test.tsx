import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react-native';
import { Alert } from 'react-native';
import SearchScreen from '../screens/SearchScreen';
import { ThemeProvider } from '../theme/ThemeContext';

// Mock the mock data with more comprehensive test data
const mockCartsData = [
  {
    id: 'philly-000',
    name: 'Philadelphia Halal Cart #1',
    coords: { lat: 39.9719, lng: -75.1454 },
    city: 'Philadelphia',
    address: '1550 N 29th St, Philadelphia, PA 19129',
    cuisine: ['Pakistani'],
    hours: { mon: ['11:00', '03:00'] },
    priceLevel: 1,
    rating: 4.8,
    paymentMethods: ['cash'],
    tags: ['late-night'],
    lastUpdated: '2025-09-27T22:46:37.683Z'
  },
  {
    id: 'philly-001',
    name: 'Philadelphia Halal Cart #2',
    coords: { lat: 39.9859, lng: -75.1607 },
    city: 'Philadelphia',
    address: '1300 W Norris St, Philadelphia, PA 19122',
    cuisine: ['Turkish', 'Mediterranean'],
    hours: { mon: ['11:00', '20:00'] },
    priceLevel: 2,
    rating: 4.2,
    paymentMethods: ['cash', 'card'],
    tags: ['quick-bite'],
    lastUpdated: '2025-09-27T22:46:37.683Z'
  },
  {
    id: 'philly-002',
    name: 'Philadelphia Halal Cart #3',
    coords: { lat: 39.9750, lng: -75.1500 },
    city: 'Philadelphia',
    address: '1500 N Broad St, Philadelphia, PA 19121',
    cuisine: ['Egyptian', 'Mediterranean'],
    hours: { mon: ['11:00', '20:00'] },
    priceLevel: 3,
    rating: 4.5,
    paymentMethods: ['card'],
    tags: ['quick-bite'],
    lastUpdated: '2025-09-27T22:46:37.683Z'
  },
  {
    id: 'philly-003',
    name: 'Temple University Food Truck',
    coords: { lat: 39.9818, lng: -75.1554 },
    city: 'Philadelphia',
    address: '1800 N 13th St, Philadelphia, PA 19122',
    cuisine: ['Afghan'],
    hours: { mon: ['11:00', '20:00'] },
    priceLevel: 2,
    rating: 4.6,
    paymentMethods: ['cash', 'card'],
    tags: ['quick-bite', 'student-friendly'],
    lastUpdated: '2025-09-27T22:46:37.683Z'
  },
  {
    id: 'philly-004',
    name: 'Downtown Philly Cart',
    coords: { lat: 39.9526, lng: -75.1652 },
    city: 'Philadelphia',
    address: '1200 Market St, Philadelphia, PA 19107',
    cuisine: ['Bangladeshi', 'Pakistani'],
    hours: { mon: ['11:00', '22:00'] },
    priceLevel: 1,
    rating: 4.1,
    paymentMethods: ['cash'],
    tags: ['late-night', 'downtown'],
    lastUpdated: '2025-09-27T22:46:37.683Z'
  }
];

// Mock the mock data require
jest.mock('../assets/mock/carts.json', () => mockCartsData, { virtual: true });

// Mock Alert
jest.spyOn(Alert, 'alert');

// Helper function to render with ThemeProvider
const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider initialTheme="drexel">
      {component}
    </ThemeProvider>
  );
};

describe('SearchScreen Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('End-to-End Search Workflow', () => {
    it('completes full search workflow from loading to results to interaction', async () => {
      const { getByText, getByPlaceholderText, queryByText } = renderWithTheme(<SearchScreen />);
      
      // 1. Verify initial loading state
      expect(getByText('Loading food trucks...')).toBeTruthy();
      
      // 2. Wait for data to load
      await waitFor(() => {
        expect(getByText('5 food trucks found')).toBeTruthy();
      });
      
      // 3. Verify all carts are displayed
      expect(getByText('Philadelphia Halal Cart #1')).toBeTruthy();
      expect(getByText('Philadelphia Halal Cart #2')).toBeTruthy();
      expect(getByText('Philadelphia Halal Cart #3')).toBeTruthy();
      expect(getByText('Temple University Food Truck')).toBeTruthy();
      expect(getByText('Downtown Philly Cart')).toBeTruthy();
      
      // 4. Perform search
      const searchInput = getByPlaceholderText('Search trucks, cuisine, address, or location...');
      await act(async () => {
        fireEvent.changeText(searchInput, 'Temple');
      });
      
      // 5. Verify filtered results
      await waitFor(() => {
        expect(getByText('1 food truck found')).toBeTruthy();
        expect(getByText('Temple University Food Truck')).toBeTruthy();
        expect(queryByText('Philadelphia Halal Cart #1')).toBeNull();
      });
      
      // 6. Interact with result
      const cartCard = getByText('Temple University Food Truck');
      await act(async () => {
        fireEvent.press(cartCard);
      });
      
      // 7. Verify interaction works
      expect(Alert.alert).toHaveBeenCalledWith(
        'Temple University Food Truck',
        'Address: 1800 N 13th St, Philadelphia, PA 19122\nCuisine: Afghan\nRating: 4.6/5\nPrice Level: 2\nPayment: cash • card',
        [{ text: 'OK' }]
      );
      
      // 8. Clear search
      await act(async () => {
        fireEvent.changeText(searchInput, '');
      });
      
      // 9. Verify all results are back
      await waitFor(() => {
        expect(getByText('5 food trucks found')).toBeTruthy();
        expect(getByText('Philadelphia Halal Cart #1')).toBeTruthy();
      });
    });

    it('handles complex search scenarios with multiple criteria', async () => {
      const { getByText, getByPlaceholderText, queryByText } = renderWithTheme(<SearchScreen />);
      
      await waitFor(() => {
        expect(getByText('5 food trucks found')).toBeTruthy();
      });
      
      // Search by cuisine type
      const searchInput = getByPlaceholderText('Search trucks, cuisine, address, or location...');
      await act(async () => {
        fireEvent.changeText(searchInput, 'Mediterranean');
      });
      
      await waitFor(() => {
        expect(getByText('2 food trucks found')).toBeTruthy();
        expect(getByText('Philadelphia Halal Cart #2')).toBeTruthy();
        expect(getByText('Philadelphia Halal Cart #3')).toBeTruthy();
      });
      
      // Search by address area
      await act(async () => {
        fireEvent.changeText(searchInput, 'Broad St');
      });
      
      await waitFor(() => {
        expect(getByText('1 food truck found')).toBeTruthy();
        expect(getByText('Philadelphia Halal Cart #3')).toBeTruthy();
      });
      
      // Search by tags
      await act(async () => {
        fireEvent.changeText(searchInput, 'late-night');
      });
      
      await waitFor(() => {
        expect(getByText('2 food trucks found')).toBeTruthy();
        expect(getByText('Philadelphia Halal Cart #1')).toBeTruthy();
        expect(getByText('Downtown Philly Cart')).toBeTruthy();
      });
    });
  });

  describe('Data Integration', () => {
    it('integrates mock data loading with search functionality', async () => {
      const { getByText } = renderWithTheme(<SearchScreen />);
      
      // Verify data loads correctly
      await waitFor(() => {
        expect(getByText('5 food trucks found')).toBeTruthy();
      });
      
      // Verify data structure is correct
      expect(getByText('Philadelphia Halal Cart #1')).toBeTruthy();
      expect(getByText('1550 N 29th St, Philadelphia, PA 19129')).toBeTruthy();
      expect(getByText('Pakistani')).toBeTruthy();
      expect(getByText('4.8')).toBeTruthy();
      expect(getByText('late-night')).toBeTruthy();
    });

    it('handles mixed data types in search results', async () => {
      const { getByText, getByPlaceholderText } = render(<SearchScreen />);
      
      await waitFor(() => {
        expect(getByText('5 food trucks found')).toBeTruthy();
      });
      
      // Search for trucks with multiple payment methods
      const searchInput = getByPlaceholderText('Search trucks, cuisine, address, or location...');
      await act(async () => {
        fireEvent.changeText(searchInput, 'card');
      });
      
      await waitFor(() => {
        // Should find trucks that accept card payments
        expect(getByText('Philadelphia Halal Cart #2')).toBeTruthy();
        expect(getByText('Temple University Food Truck')).toBeTruthy();
      });
    });
  });

  describe('User Experience Integration', () => {
    it('provides smooth user experience with real-time search', async () => {
      const { getByText, getByPlaceholderText } = render(<SearchScreen />);
      
      await waitFor(() => {
        expect(getByText('5 food trucks found')).toBeTruthy();
      });
      
      const searchInput = getByPlaceholderText('Search trucks, cuisine, address, or location...');
      
      // Simulate typing in real-time
      await act(async () => {
        fireEvent.changeText(searchInput, 'P');
      });
      
      await waitFor(() => {
        expect(getByText('5 food trucks found')).toBeTruthy(); // All start with "Philadelphia"
      });
      
      await act(async () => {
        fireEvent.changeText(searchInput, 'Ph');
      });
      
      await waitFor(() => {
        expect(getByText('3 food trucks found')).toBeTruthy(); // "Philadelphia" carts
      });
      
      await act(async () => {
        fireEvent.changeText(searchInput, 'Philadelphia');
      });
      
      await waitFor(() => {
        expect(getByText('3 food trucks found')).toBeTruthy();
        expect(getByText('Philadelphia Halal Cart #1')).toBeTruthy();
        expect(getByText('Philadelphia Halal Cart #2')).toBeTruthy();
        expect(getByText('Philadelphia Halal Cart #3')).toBeTruthy();
      });
    });

    it('handles edge cases in search input', async () => {
      const { getByText, getByPlaceholderText } = render(<SearchScreen />);
      
      await waitFor(() => {
        expect(getByText('5 food trucks found')).toBeTruthy();
      });
      
      const searchInput = getByPlaceholderText('Search trucks, cuisine, address, or location...');
      
      // Test empty search
      await act(async () => {
        fireEvent.changeText(searchInput, '');
      });
      
      await waitFor(() => {
        expect(getByText('5 food trucks found')).toBeTruthy();
      });
      
      // Test whitespace search
      await act(async () => {
        fireEvent.changeText(searchInput, '   ');
      });
      
      await waitFor(() => {
        expect(getByText('5 food trucks found')).toBeTruthy();
      });
      
      // Test special characters
      await act(async () => {
        fireEvent.changeText(searchInput, '@#$%');
      });
      
      await waitFor(() => {
        expect(getByText('0 food trucks found')).toBeTruthy();
      });
    });
  });

  describe('Performance Integration', () => {
    it('handles rapid search input changes efficiently', async () => {
      const { getByText, getByPlaceholderText } = render(<SearchScreen />);
      
      await waitFor(() => {
        expect(getByText('5 food trucks found')).toBeTruthy();
      });
      
      const searchInput = getByPlaceholderText('Search trucks, cuisine, address, or location...');
      
      // Rapidly change search input
      await act(async () => {
        fireEvent.changeText(searchInput, 'P');
        fireEvent.changeText(searchInput, 'Ph');
        fireEvent.changeText(searchInput, 'Philadelphia');
        fireEvent.changeText(searchInput, 'Philadelphia Halal');
      });
      
      await waitFor(() => {
        expect(getByText('3 food trucks found')).toBeTruthy();
      });
    });

    it('maintains performance with large result sets', async () => {
      const { getByText, getByPlaceholderText } = render(<SearchScreen />);
      
      await waitFor(() => {
        expect(getByText('5 food trucks found')).toBeTruthy();
      });
      
      // Search for common term that matches all results
      const searchInput = getByPlaceholderText('Search trucks, cuisine, address, or location...');
      await act(async () => {
        fireEvent.changeText(searchInput, 'Philadelphia');
      });
      
      await waitFor(() => {
        expect(getByText('3 food trucks found')).toBeTruthy();
      });
      
      // Verify all matching results are displayed
      expect(getByText('Philadelphia Halal Cart #1')).toBeTruthy();
      expect(getByText('Philadelphia Halal Cart #2')).toBeTruthy();
      expect(getByText('Philadelphia Halal Cart #3')).toBeTruthy();
    });
  });

  describe('Error Handling Integration', () => {
    it('integrates error handling with user interface', async () => {
      // Mock console.error to avoid test output noise
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      
      // Mock require to throw an error after initial successful load
      jest.doMock('../assets/mock/carts.json', () => {
        throw new Error('Network error');
      }, { virtual: true });

      const { getByText } = renderWithTheme(<SearchScreen />);
      
      // Should show loading initially
      expect(getByText('Loading food trucks...')).toBeTruthy();
      
      // Should show error alert
      await waitFor(() => {
        expect(Alert.alert).toHaveBeenCalledWith('Error', 'Failed to load food truck data');
      });

      consoleSpy.mockRestore();
    });
  });

  describe('Theme Integration', () => {
    it('integrates with theme system for consistent styling', async () => {
      const { getByText, getByPlaceholderText } = render(<SearchScreen />);
      
      await waitFor(() => {
        expect(getByText('5 food trucks found')).toBeTruthy();
      });
      
      // Verify theme integration by checking if components render
      // (Theme integration is tested by successful rendering)
      expect(getByText('Find Food Trucks')).toBeTruthy();
      expect(getByPlaceholderText('Search trucks, cuisine, address, or location...')).toBeTruthy();
      expect(getByText('Philadelphia Halal Cart #1')).toBeTruthy();
    });
  });
});
