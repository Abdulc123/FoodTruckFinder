import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react-native';
import SearchScreen from '../screens/SearchScreen';
import { ThemeProvider } from '../theme/ThemeContext';

// Comprehensive mock data for testing all search scenarios
const comprehensiveMockData = [
  // Basic cases
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
  // Multiple cuisines
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
  // Different address patterns
  {
    id: 'philly-002',
    name: 'Temple University Food Truck',
    coords: { lat: 39.9750, lng: -75.1500 },
    city: 'Philadelphia',
    address: '1800 N 13th St, Philadelphia, PA 19122',
    cuisine: ['Egyptian', 'Mediterranean'],
    hours: { mon: ['11:00', '20:00'] },
    priceLevel: 3,
    rating: 4.5,
    paymentMethods: ['card'],
    tags: ['quick-bite', 'student-friendly'],
    lastUpdated: '2025-09-27T22:46:37.683Z'
  },
  // Different naming patterns
  {
    id: 'philly-003',
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
  },
  // Edge case names
  {
    id: 'philly-004',
    name: 'A1 Food Truck',
    coords: { lat: 39.9600, lng: -75.1500 },
    city: 'Philadelphia',
    address: '1000 W Diamond St, Philadelphia, PA 19121',
    cuisine: ['Afghan'],
    hours: { mon: ['11:00', '20:00'] },
    priceLevel: 2,
    rating: 4.3,
    paymentMethods: ['cash', 'card'],
    tags: ['quick-bite'],
    lastUpdated: '2025-09-27T22:46:37.683Z'
  },
  // Special characters in name
  {
    id: 'philly-005',
    name: 'Joe\'s & Maria\'s Halal Truck',
    coords: { lat: 39.9700, lng: -75.1400 },
    city: 'Philadelphia',
    address: '1400 N 15th St, Philadelphia, PA 19121',
    cuisine: ['Turkish'],
    hours: { mon: ['11:00', '20:00'] },
    priceLevel: 2,
    rating: 4.4,
    paymentMethods: ['cash', 'card'],
    tags: ['quick-bite'],
    lastUpdated: '2025-09-27T22:46:37.683Z'
  }
];

// Mock the mock data require
jest.mock('../assets/mock/carts.json', () => comprehensiveMockData, { virtual: true });

// Helper function to render with ThemeProvider
const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider initialTheme="drexel">
      {component}
    </ThemeProvider>
  );
};

describe('Search Functionality Comprehensive Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Name-based Search', () => {
    it('finds exact name matches', async () => {
      const { getByPlaceholderText, getByText, queryByText } = renderWithTheme(<SearchScreen />);
      const searchInput = getByPlaceholderText('Search trucks, cuisine, address, or location...');
      
      await waitFor(() => {
        expect(getByText('6 food trucks found')).toBeTruthy();
      });

      await act(async () => {
        fireEvent.changeText(searchInput, 'Temple University Food Truck');
      });

      await waitFor(() => {
        expect(getByText('1 food truck found')).toBeTruthy();
        expect(getByText('Temple University Food Truck')).toBeTruthy();
        expect(queryByText('Philadelphia Halal Cart #1')).toBeNull();
      });
    });

    it('finds partial name matches', async () => {
      const { getByPlaceholderText, getByText, queryByText } = renderWithTheme(<SearchScreen />);
      const searchInput = getByPlaceholderText('Search trucks, cuisine, address, or location...');
      
      await waitFor(() => {
        expect(getByText('6 food trucks found')).toBeTruthy();
      });

      await act(async () => {
        fireEvent.changeText(searchInput, 'Philadelphia');
      });

      await waitFor(() => {
        expect(getByText('2 food trucks found')).toBeTruthy();
        expect(getByText('Philadelphia Halal Cart #1')).toBeTruthy();
        expect(getByText('Philadelphia Halal Cart #2')).toBeTruthy();
        expect(queryByText('Temple University Food Truck')).toBeNull();
      });
    });

    it('finds names with special characters', async () => {
      const { getByPlaceholderText, getByText, queryByText } = renderWithTheme(<SearchScreen />);
      const searchInput = getByPlaceholderText('Search trucks, cuisine, address, or location...');
      
      await waitFor(() => {
        expect(getByText('6 food trucks found')).toBeTruthy();
      });

      await act(async () => {
        fireEvent.changeText(searchInput, 'Joe\'s');
      });

      await waitFor(() => {
        expect(getByText('1 food truck found')).toBeTruthy();
        expect(getByText('Joe\'s & Maria\'s Halal Truck')).toBeTruthy();
      });
    });

    it('finds names with numbers', async () => {
      const { getByPlaceholderText, getByText } = renderWithTheme(<SearchScreen />);
      const searchInput = getByPlaceholderText('Search trucks, cuisine, address, or location...');
      
      await waitFor(() => {
        expect(getByText('6 food trucks found')).toBeTruthy();
      });

      await act(async () => {
        fireEvent.changeText(searchInput, 'A1');
      });

      await waitFor(() => {
        expect(getByText('1 food truck found')).toBeTruthy();
        expect(getByText('A1 Food Truck')).toBeTruthy();
      });
    });
  });

  describe('Address-based Search', () => {
    it('finds trucks by street name', async () => {
      const { getByPlaceholderText, getByText, queryByText } = renderWithTheme(<SearchScreen />);
      const searchInput = getByPlaceholderText('Search trucks, cuisine, address, or location...');
      
      await waitFor(() => {
        expect(getByText('6 food trucks found')).toBeTruthy();
      });

      await act(async () => {
        fireEvent.changeText(searchInput, 'Market St');
      });

      await waitFor(() => {
        expect(getByText('1 food truck found')).toBeTruthy();
        expect(getByText('Downtown Philly Cart')).toBeTruthy();
      });
    });

    it('finds trucks by ZIP code', async () => {
      const { getByPlaceholderText, getByText, queryByText } = renderWithTheme(<SearchScreen />);
      const searchInput = getByPlaceholderText('Search trucks, cuisine, address, or location...');
      
      await waitFor(() => {
        expect(getByText('6 food trucks found')).toBeTruthy();
      });

      await act(async () => {
        fireEvent.changeText(searchInput, '19129');
      });

      await waitFor(() => {
        expect(getByText('1 food truck found')).toBeTruthy();
        expect(getByText('Philadelphia Halal Cart #1')).toBeTruthy();
      });
    });

    it('finds trucks by neighborhood reference', async () => {
      const { getByPlaceholderText, getByText, queryByText } = renderWithTheme(<SearchScreen />);
      const searchInput = getByPlaceholderText('Search trucks, cuisine, address, or location...');
      
      await waitFor(() => {
        expect(getByText('6 food trucks found')).toBeTruthy();
      });

      await act(async () => {
        fireEvent.changeText(searchInput, 'N 29th');
      });

      await waitFor(() => {
        expect(getByText('1 food truck found')).toBeTruthy();
        expect(getByText('Philadelphia Halal Cart #1')).toBeTruthy();
      });
    });

    it('finds trucks by partial address', async () => {
      const { getByPlaceholderText, getByText, queryByText } = renderWithTheme(<SearchScreen />);
      const searchInput = getByPlaceholderText('Search trucks, cuisine, address, or location...');
      
      await waitFor(() => {
        expect(getByText('6 food trucks found')).toBeTruthy();
      });

      await act(async () => {
        fireEvent.changeText(searchInput, '13th St');
      });

      await waitFor(() => {
        expect(getByText('1 food truck found')).toBeTruthy();
        expect(getByText('Temple University Food Truck')).toBeTruthy();
      });
    });
  });

  describe('Cuisine-based Search', () => {
    it('finds trucks by single cuisine', async () => {
      const { getByPlaceholderText, getByText, queryByText } = renderWithTheme(<SearchScreen />);
      const searchInput = getByPlaceholderText('Search trucks, cuisine, address, or location...');
      
      await waitFor(() => {
        expect(getByText('6 food trucks found')).toBeTruthy();
      });

      await act(async () => {
        fireEvent.changeText(searchInput, 'Afghan');
      });

      await waitFor(() => {
        expect(getByText('1 food truck found')).toBeTruthy();
        expect(getByText('A1 Food Truck')).toBeTruthy();
      });
    });

    it('finds trucks by cuisine with multiple matches', async () => {
      const { getByPlaceholderText, getByText, queryByText } = renderWithTheme(<SearchScreen />);
      const searchInput = getByPlaceholderText('Search trucks, cuisine, address, or location...');
      
      await waitFor(() => {
        expect(getByText('6 food trucks found')).toBeTruthy();
      });

      await act(async () => {
        fireEvent.changeText(searchInput, 'Pakistani');
      });

      await waitFor(() => {
        expect(getByText('2 food trucks found')).toBeTruthy();
        expect(getByText('Philadelphia Halal Cart #1')).toBeTruthy();
        expect(getByText('Downtown Philly Cart')).toBeTruthy();
      });
    });

    it('finds trucks by partial cuisine name', async () => {
      const { getByPlaceholderText, getByText, queryByText } = renderWithTheme(<SearchScreen />);
      const searchInput = getByPlaceholderText('Search trucks, cuisine, address, or location...');
      
      await waitFor(() => {
        expect(getByText('6 food trucks found')).toBeTruthy();
      });

      await act(async () => {
        fireEvent.changeText(searchInput, 'Mediterranean');
      });

      await waitFor(() => {
        expect(getByText('2 food trucks found')).toBeTruthy();
        expect(getByText('Philadelphia Halal Cart #2')).toBeTruthy();
        expect(getByText('Temple University Food Truck')).toBeTruthy();
      });
    });

    it('finds trucks by multiple cuisines', async () => {
      const { getByPlaceholderText, getByText, queryByText } = renderWithTheme(<SearchScreen />);
      const searchInput = getByPlaceholderText('Search trucks, cuisine, address, or location...');
      
      await waitFor(() => {
        expect(getByText('6 food trucks found')).toBeTruthy();
      });

      await act(async () => {
        fireEvent.changeText(searchInput, 'Turkish');
      });

      await waitFor(() => {
        expect(getByText('2 food trucks found')).toBeTruthy();
        expect(getByText('Philadelphia Halal Cart #2')).toBeTruthy();
        expect(getByText('Joe\'s & Maria\'s Halal Truck')).toBeTruthy();
      });
    });
  });

  describe('Tag-based Search', () => {
    it('finds trucks by single tag', async () => {
      const { getByPlaceholderText, getByText, queryByText } = renderWithTheme(<SearchScreen />);
      const searchInput = getByPlaceholderText('Search trucks, cuisine, address, or location...');
      
      await waitFor(() => {
        expect(getByText('6 food trucks found')).toBeTruthy();
      });

      await act(async () => {
        fireEvent.changeText(searchInput, 'late-night');
      });

      await waitFor(() => {
        expect(getByText('2 food trucks found')).toBeTruthy();
        expect(getByText('Philadelphia Halal Cart #1')).toBeTruthy();
        expect(getByText('Downtown Philly Cart')).toBeTruthy();
      });
    });

    it('finds trucks by multiple tags', async () => {
      const { getByPlaceholderText, getByText, queryByText } = renderWithTheme(<SearchScreen />);
      const searchInput = getByPlaceholderText('Search trucks, cuisine, address, or location...');
      
      await waitFor(() => {
        expect(getByText('6 food trucks found')).toBeTruthy();
      });

      await act(async () => {
        fireEvent.changeText(searchInput, 'student-friendly');
      });

      await waitFor(() => {
        expect(getByText('1 food truck found')).toBeTruthy();
        expect(getByText('Temple University Food Truck')).toBeTruthy();
      });
    });

    it('finds trucks by partial tag name', async () => {
      const { getByPlaceholderText, getByText, queryByText } = renderWithTheme(<SearchScreen />);
      const searchInput = getByPlaceholderText('Search trucks, cuisine, address, or location...');
      
      await waitFor(() => {
        expect(getByText('6 food trucks found')).toBeTruthy();
      });

      await act(async () => {
        fireEvent.changeText(searchInput, 'quick');
      });

      await waitFor(() => {
        expect(getByText('4 food trucks found')).toBeTruthy();
        expect(getByText('Philadelphia Halal Cart #2')).toBeTruthy();
        expect(getByText('Temple University Food Truck')).toBeTruthy();
        expect(getByText('A1 Food Truck')).toBeTruthy();
        expect(getByText('Joe\'s & Maria\'s Halal Truck')).toBeTruthy();
      });
    });
  });

  describe('Case Sensitivity Tests', () => {
    it('performs case-insensitive search for names', async () => {
      const { getByPlaceholderText, getByText, queryByText } = renderWithTheme(<SearchScreen />);
      const searchInput = getByPlaceholderText('Search trucks, cuisine, address, or location...');
      
      await waitFor(() => {
        expect(getByText('6 food trucks found')).toBeTruthy();
      });

      await act(async () => {
        fireEvent.changeText(searchInput, 'PHILADELPHIA');
      });

      await waitFor(() => {
        expect(getByText('2 food trucks found')).toBeTruthy();
        expect(getByText('Philadelphia Halal Cart #1')).toBeTruthy();
        expect(getByText('Philadelphia Halal Cart #2')).toBeTruthy();
      });
    });

    it('performs case-insensitive search for cuisines', async () => {
      const { getByPlaceholderText, getByText, queryByText } = renderWithTheme(<SearchScreen />);
      const searchInput = getByPlaceholderText('Search trucks, cuisine, address, or location...');
      
      await waitFor(() => {
        expect(getByText('6 food trucks found')).toBeTruthy();
      });

      await act(async () => {
        fireEvent.changeText(searchInput, 'TURKISH');
      });

      await waitFor(() => {
        expect(getByText('2 food trucks found')).toBeTruthy();
        expect(getByText('Philadelphia Halal Cart #2')).toBeTruthy();
        expect(getByText('Joe\'s & Maria\'s Halal Truck')).toBeTruthy();
      });
    });

    it('performs case-insensitive search for addresses', async () => {
      const { getByPlaceholderText, getByText, queryByText } = renderWithTheme(<SearchScreen />);
      const searchInput = getByPlaceholderText('Search trucks, cuisine, address, or location...');
      
      await waitFor(() => {
        expect(getByText('6 food trucks found')).toBeTruthy();
      });

      await act(async () => {
        fireEvent.changeText(searchInput, 'MARKET');
      });

      await waitFor(() => {
        expect(getByText('1 food truck found')).toBeTruthy();
        expect(getByText('Downtown Philly Cart')).toBeTruthy();
      });
    });
  });

  describe('Edge Cases and Special Characters', () => {
    it('handles empty search gracefully', async () => {
      const { getByPlaceholderText, getByText } = renderWithTheme(<SearchScreen />);
      const searchInput = getByPlaceholderText('Search trucks, cuisine, address, or location...');
      
      await waitFor(() => {
        expect(getByText('6 food trucks found')).toBeTruthy();
      });

      await act(async () => {
        fireEvent.changeText(searchInput, '');
      });

      await waitFor(() => {
        expect(getByText('6 food trucks found')).toBeTruthy();
      });
    });

    it('handles whitespace-only search', async () => {
      const { getByPlaceholderText, getByText } = renderWithTheme(<SearchScreen />);
      const searchInput = getByPlaceholderText('Search trucks, cuisine, address, or location...');
      
      await waitFor(() => {
        expect(getByText('6 food trucks found')).toBeTruthy();
      });

      await act(async () => {
        fireEvent.changeText(searchInput, '   ');
      });

      await waitFor(() => {
        expect(getByText('6 food trucks found')).toBeTruthy();
      });
    });

    it('handles special characters in search', async () => {
      const { getByPlaceholderText, getByText, queryByText } = renderWithTheme(<SearchScreen />);
      const searchInput = getByPlaceholderText('Search trucks, cuisine, address, or location...');
      
      await waitFor(() => {
        expect(getByText('6 food trucks found')).toBeTruthy();
      });

      await act(async () => {
        fireEvent.changeText(searchInput, '@#$%');
      });

      await waitFor(() => {
        expect(getByText('0 food trucks found')).toBeTruthy();
        expect(queryByText('Philadelphia Halal Cart #1')).toBeNull();
      });
    });

    it('handles very long search strings', async () => {
      const { getByPlaceholderText, getByText, queryByText } = renderWithTheme(<SearchScreen />);
      const searchInput = getByPlaceholderText('Search trucks, cuisine, address, or location...');
      
      await waitFor(() => {
        expect(getByText('6 food trucks found')).toBeTruthy();
      });

      const longSearchString = 'a'.repeat(1000);
      await act(async () => {
        fireEvent.changeText(searchInput, longSearchString);
      });

      await waitFor(() => {
        expect(getByText('0 food trucks found')).toBeTruthy();
      });
    });

    it('handles numbers in search', async () => {
      const { getByPlaceholderText, getByText, queryByText } = renderWithTheme(<SearchScreen />);
      const searchInput = getByPlaceholderText('Search trucks, cuisine, address, or location...');
      
      await waitFor(() => {
        expect(getByText('6 food trucks found')).toBeTruthy();
      });

      await act(async () => {
        fireEvent.changeText(searchInput, '19129');
      });

      await waitFor(() => {
        expect(getByText('1 food truck found')).toBeTruthy();
        expect(getByText('Philadelphia Halal Cart #1')).toBeTruthy();
      });
    });
  });

  describe('Multi-field Search Scenarios', () => {
    it('finds trucks matching multiple criteria', async () => {
      const { getByPlaceholderText, getByText, queryByText } = renderWithTheme(<SearchScreen />);
      const searchInput = getByPlaceholderText('Search trucks, cuisine, address, or location...');
      
      await waitFor(() => {
        expect(getByText('6 food trucks found')).toBeTruthy();
      });

      // Search for "Cart" which appears in names
      await act(async () => {
        fireEvent.changeText(searchInput, 'Cart');
      });

      await waitFor(() => {
        expect(getByText('3 food trucks found')).toBeTruthy();
        expect(getByText('Philadelphia Halal Cart #1')).toBeTruthy();
        expect(getByText('Philadelphia Halal Cart #2')).toBeTruthy();
        expect(getByText('Downtown Philly Cart')).toBeTruthy();
      });
    });

    it('finds trucks by combining name and cuisine', async () => {
      const { getByPlaceholderText, getByText, queryByText } = renderWithTheme(<SearchScreen />);
      const searchInput = getByPlaceholderText('Search trucks, cuisine, address, or location...');
      
      await waitFor(() => {
        expect(getByText('6 food trucks found')).toBeTruthy();
      });

      // Search for "Halal" which appears in names
      await act(async () => {
        fireEvent.changeText(searchInput, 'Halal');
      });

      await waitFor(() => {
        expect(getByText('3 food trucks found')).toBeTruthy();
        expect(getByText('Philadelphia Halal Cart #1')).toBeTruthy();
        expect(getByText('Philadelphia Halal Cart #2')).toBeTruthy();
        expect(getByText('Joe\'s & Maria\'s Halal Truck')).toBeTruthy();
      });
    });
  });

  describe('Search Performance', () => {
    it('handles rapid search input changes', async () => {
      const { getByPlaceholderText, getByText } = renderWithTheme(<SearchScreen />);
      const searchInput = getByPlaceholderText('Search trucks, cuisine, address, or location...');
      
      await waitFor(() => {
        expect(getByText('6 food trucks found')).toBeTruthy();
      });

      // Rapidly change search input
      await act(async () => {
        fireEvent.changeText(searchInput, 'P');
        fireEvent.changeText(searchInput, 'Ph');
        fireEvent.changeText(searchInput, 'Phil');
        fireEvent.changeText(searchInput, 'Philadelphia');
      });

      await waitFor(() => {
        expect(getByText('2 food trucks found')).toBeTruthy();
      });
    });

    it('maintains search state correctly', async () => {
      const { getByPlaceholderText, getByText, queryByText } = renderWithTheme(<SearchScreen />);
      const searchInput = getByPlaceholderText('Search trucks, cuisine, address, or location...');
      
      await waitFor(() => {
        expect(getByText('6 food trucks found')).toBeTruthy();
      });

      // Search for something
      await act(async () => {
        fireEvent.changeText(searchInput, 'Turkish');
      });

      await waitFor(() => {
        expect(getByText('2 food trucks found')).toBeTruthy();
      });

      // Clear search
      await act(async () => {
        fireEvent.changeText(searchInput, '');
      });

      await waitFor(() => {
        expect(getByText('6 food trucks found')).toBeTruthy();
        expect(getByText('Philadelphia Halal Cart #1')).toBeTruthy();
      });
    });
  });
});
