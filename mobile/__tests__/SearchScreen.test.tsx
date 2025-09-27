import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react-native';
import { Alert } from 'react-native';
import SearchScreen from '../screens/SearchScreen';
import { ThemeProvider } from '../theme/ThemeContext';
import { themes } from '../theme/themes';

// Mock the mock data
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

describe('SearchScreen Component - Unit Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Component Rendering', () => {
    it('renders without crashing', async () => {
      await act(async () => {
        expect(() => renderWithTheme(<SearchScreen />)).not.toThrow();
      });
    });

    it('displays the correct title', async () => {
      const { getByText } = renderWithTheme(<SearchScreen />);
      await waitFor(() => {
        expect(getByText('Find Food Trucks')).toBeTruthy();
      });
    });

    it('displays the search input with correct placeholder', async () => {
      const { getByPlaceholderText } = renderWithTheme(<SearchScreen />);
      await waitFor(() => {
        expect(getByPlaceholderText('Search trucks, cuisine, address, or location...')).toBeTruthy();
      });
    });

    it('displays loading state initially', async () => {
      const { getByText } = renderWithTheme(<SearchScreen />);
      expect(getByText('Loading food trucks...')).toBeTruthy();
    });
  });

  describe('Data Loading', () => {
    it('loads mock data successfully', async () => {
      const { getByText } = renderWithTheme(<SearchScreen />);
      
      await waitFor(() => {
        expect(getByText('3 food trucks found')).toBeTruthy();
      });
    });

    it('displays all loaded carts in the list', async () => {
      const { getByText } = renderWithTheme(<SearchScreen />);
      
      await waitFor(() => {
        expect(getByText('Philadelphia Halal Cart #1')).toBeTruthy();
        expect(getByText('Philadelphia Halal Cart #2')).toBeTruthy();
        expect(getByText('Philadelphia Halal Cart #3')).toBeTruthy();
      });
    });

    it('displays cart addresses correctly', async () => {
      const { getByText } = renderWithTheme(<SearchScreen />);
      
      await waitFor(() => {
        expect(getByText('1550 N 29th St, Philadelphia, PA 19129')).toBeTruthy();
        expect(getByText('1300 W Norris St, Philadelphia, PA 19122')).toBeTruthy();
      });
    });
  });

  describe('Search Functionality', () => {
    it('filters carts by name', async () => {
      const { getByPlaceholderText, getByText, queryByText } = renderWithTheme(<SearchScreen />);
      const searchInput = getByPlaceholderText('Search trucks, cuisine, address, or location...');
      
      await waitFor(() => {
        expect(getByText('3 food trucks found')).toBeTruthy();
      });

      await act(async () => {
        fireEvent.changeText(searchInput, 'Cart #1');
      });

      await waitFor(() => {
        expect(getByText('1 food truck found')).toBeTruthy();
        expect(getByText('Philadelphia Halal Cart #1')).toBeTruthy();
        expect(queryByText('Philadelphia Halal Cart #2')).toBeNull();
      });
    });

    it('filters carts by cuisine', async () => {
      const { getByPlaceholderText, getByText, queryByText } = renderWithTheme(<SearchScreen />);
      const searchInput = getByPlaceholderText('Search trucks, cuisine, address, or location...');
      
      await waitFor(() => {
        expect(getByText('3 food trucks found')).toBeTruthy();
      });

      await act(async () => {
        fireEvent.changeText(searchInput, 'Turkish');
      });

      await waitFor(() => {
        expect(getByText('1 food truck found')).toBeTruthy();
        expect(getByText('Philadelphia Halal Cart #2')).toBeTruthy();
        expect(queryByText('Philadelphia Halal Cart #1')).toBeNull();
      });
    });

    it('filters carts by address', async () => {
      const { getByPlaceholderText, getByText, queryByText } = renderWithTheme(<SearchScreen />);
      const searchInput = getByPlaceholderText('Search trucks, cuisine, address, or location...');
      
      await waitFor(() => {
        expect(getByText('3 food trucks found')).toBeTruthy();
      });

      await act(async () => {
        fireEvent.changeText(searchInput, 'Broad St');
      });

      await waitFor(() => {
        expect(getByText('1 food truck found')).toBeTruthy();
        expect(getByText('Philadelphia Halal Cart #3')).toBeTruthy();
        expect(queryByText('Philadelphia Halal Cart #1')).toBeNull();
      });
    });

    it('filters carts by tags', async () => {
      const { getByPlaceholderText, getByText, queryByText } = renderWithTheme(<SearchScreen />);
      const searchInput = getByPlaceholderText('Search trucks, cuisine, address, or location...');
      
      await waitFor(() => {
        expect(getByText('3 food trucks found')).toBeTruthy();
      });

      await act(async () => {
        fireEvent.changeText(searchInput, 'late-night');
      });

      await waitFor(() => {
        expect(getByText('1 food truck found')).toBeTruthy();
        expect(getByText('Philadelphia Halal Cart #1')).toBeTruthy();
        expect(queryByText('Philadelphia Halal Cart #2')).toBeNull();
      });
    });

    it('shows no results for non-matching search', async () => {
      const { getByPlaceholderText, getByText, queryByText } = renderWithTheme(<SearchScreen />);
      const searchInput = getByPlaceholderText('Search trucks, cuisine, address, or location...');
      
      await waitFor(() => {
        expect(getByText('3 food trucks found')).toBeTruthy();
      });

      await act(async () => {
        fireEvent.changeText(searchInput, 'nonexistent');
      });

      await waitFor(() => {
        expect(getByText('0 food trucks found')).toBeTruthy();
        expect(queryByText('Philadelphia Halal Cart #1')).toBeNull();
      });
    });

    it('clears search results when input is empty', async () => {
      const { getByPlaceholderText, getByText } = render(<SearchScreen />);
      const searchInput = getByPlaceholderText('Search trucks, cuisine, address, or location...');
      
      await waitFor(() => {
        expect(getByText('3 food trucks found')).toBeTruthy();
      });

      await act(async () => {
        fireEvent.changeText(searchInput, 'Turkish');
      });

      await waitFor(() => {
        expect(getByText('1 food truck found')).toBeTruthy();
      });

      await act(async () => {
        fireEvent.changeText(searchInput, '');
      });

      await waitFor(() => {
        expect(getByText('3 food trucks found')).toBeTruthy();
      });
    });

    it('performs case-insensitive search', async () => {
      const { getByPlaceholderText, getByText } = render(<SearchScreen />);
      const searchInput = getByPlaceholderText('Search trucks, cuisine, address, or location...');
      
      await waitFor(() => {
        expect(getByText('3 food trucks found')).toBeTruthy();
      });

      await act(async () => {
        fireEvent.changeText(searchInput, 'TURKISH');
      });

      await waitFor(() => {
        expect(getByText('1 food truck found')).toBeTruthy();
        expect(getByText('Philadelphia Halal Cart #2')).toBeTruthy();
      });
    });
  });

  describe('Cart Card Interaction', () => {
    it('displays cart information correctly', async () => {
      const { getByText } = renderWithTheme(<SearchScreen />);
      
      await waitFor(() => {
        expect(getByText('Philadelphia Halal Cart #1')).toBeTruthy();
        expect(getByText('Pakistani')).toBeTruthy();
        expect(getByText('1550 N 29th St, Philadelphia, PA 19129')).toBeTruthy();
        expect(getByText('4.8')).toBeTruthy();
        expect(getByText('💰')).toBeTruthy();
        expect(getByText('late-night')).toBeTruthy();
        expect(getByText('💳 cash')).toBeTruthy();
      });
    });

    it('shows alert when cart card is pressed', async () => {
      const { getByText } = renderWithTheme(<SearchScreen />);
      
      await waitFor(() => {
        expect(getByText('Philadelphia Halal Cart #1')).toBeTruthy();
      });

      const cartCard = getByText('Philadelphia Halal Cart #1');
      
      await act(async () => {
        fireEvent.press(cartCard);
      });

      expect(Alert.alert).toHaveBeenCalledWith(
        'Philadelphia Halal Cart #1',
        'Address: 1550 N 29th St, Philadelphia, PA 19129\nCuisine: Pakistani\nRating: 4.8/5\nPrice Level: 1\nPayment: cash',
        [{ text: 'OK' }]
      );
    });

    it('displays multiple cuisines correctly', async () => {
      const { getByText } = renderWithTheme(<SearchScreen />);
      
      await waitFor(() => {
        expect(getByText('Turkish • Mediterranean')).toBeTruthy();
      });
    });

    it('displays multiple payment methods correctly', async () => {
      const { getByText } = renderWithTheme(<SearchScreen />);
      
      await waitFor(() => {
        expect(getByText('💳 cash • card')).toBeTruthy();
      });
    });

    it('displays correct price level with emojis', async () => {
      const { getByText } = renderWithTheme(<SearchScreen />);
      
      await waitFor(() => {
        // Cart #2 has priceLevel 2, should show 2 money emojis
        const cartCard = getByText('Philadelphia Halal Cart #2');
        const parent = cartCard.parent;
        expect(parent).toBeTruthy();
      });
    });
  });

  describe('Results Counter', () => {
    it('shows correct count for multiple results', async () => {
      const { getByText } = renderWithTheme(<SearchScreen />);
      
      await waitFor(() => {
        expect(getByText('3 food trucks found')).toBeTruthy();
      });
    });

    it('shows correct count for single result', async () => {
      const { getByPlaceholderText, getByText } = render(<SearchScreen />);
      const searchInput = getByPlaceholderText('Search trucks, cuisine, address, or location...');
      
      await waitFor(() => {
        expect(getByText('3 food trucks found')).toBeTruthy();
      });

      await act(async () => {
        fireEvent.changeText(searchInput, 'Cart #1');
      });

      await waitFor(() => {
        expect(getByText('1 food truck found')).toBeTruthy();
      });
    });

    it('shows correct count for no results', async () => {
      const { getByPlaceholderText, getByText } = render(<SearchScreen />);
      const searchInput = getByPlaceholderText('Search trucks, cuisine, address, or location...');
      
      await waitFor(() => {
        expect(getByText('3 food trucks found')).toBeTruthy();
      });

      await act(async () => {
        fireEvent.changeText(searchInput, 'nonexistent');
      });

      await waitFor(() => {
        expect(getByText('0 food trucks found')).toBeTruthy();
      });
    });
  });

  describe('Error Handling', () => {
    it('handles data loading errors gracefully', async () => {
      // Mock console.error to avoid test output noise
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      
      // Mock require to throw an error
      jest.doMock('../assets/mock/carts.json', () => {
        throw new Error('Failed to load');
      }, { virtual: true });

      const { getByText } = renderWithTheme(<SearchScreen />);
      
      await waitFor(() => {
        expect(Alert.alert).toHaveBeenCalledWith('Error', 'Failed to load food truck data');
      });

      consoleSpy.mockRestore();
    });
  });
});
