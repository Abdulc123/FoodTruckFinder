import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react-native';
import AnimatedCartCard from '../components/AnimatedCartCard';
import { ThemeProvider } from '../theme/ThemeContext';

// Helper function to render with ThemeProvider
const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider initialTheme="drexel">
      {component}
    </ThemeProvider>
  );
};

// Mock data for testing
const mockCart = {
  id: 'philly-000',
  name: 'Philadelphia Halal Cart #1',
  coords: { lat: 39.9719, lng: -75.1454 },
  city: 'Philadelphia',
  address: '1550 N 29th St, Philadelphia, PA 19129',
  cuisine: ['Pakistani'],
  hours: { 
    mon: ['11:00', '03:00'],
    tue: ['11:00', '03:00'],
    wed: ['11:00', '03:00'],
    thu: ['11:00', '03:00'],
    fri: ['11:00', '04:00'],
    sat: ['12:00', '04:00'],
    sun: ['12:00', '02:00']
  },
  priceLevel: 1,
  rating: 4.8,
  paymentMethods: ['cash'],
  tags: ['late-night'],
  lastUpdated: '2025-09-27T22:46:37.683Z'
};

describe('AnimatedCartCard Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Basic Rendering', () => {
    it('renders without crashing', () => {
      expect(() => renderWithTheme(<AnimatedCartCard cart={mockCart} />)).not.toThrow();
    });

    it('displays basic cart information', async () => {
      const { getByText } = renderWithTheme(<AnimatedCartCard cart={mockCart} />);
      
      await waitFor(() => {
        expect(getByText('Philadelphia Halal Cart #1')).toBeTruthy();
        expect(getByText('Pakistani')).toBeTruthy();
        expect(getByText('1550 N 29th St, Philadelphia, PA 19129')).toBeTruthy();
        expect(getByText('4.8')).toBeTruthy();
      });
    });

    it('displays expand/collapse indicator', async () => {
      const { getByText } = renderWithTheme(<AnimatedCartCard cart={mockCart} />);
      
      await waitFor(() => {
        expect(getByText('▼')).toBeTruthy();
      });
    });
  });

  describe('Card Interaction', () => {
    it('responds to touch events', async () => {
      const onPressMock = jest.fn();
      const { getByText } = renderWithTheme(
        <AnimatedCartCard cart={mockCart} onPress={onPressMock} />
      );
      
      await waitFor(() => {
        expect(getByText('Philadelphia Halal Cart #1')).toBeTruthy();
      });

      const card = getByText('Philadelphia Halal Cart #1');
      
      await act(async () => {
        fireEvent.press(card);
      });

      expect(onPressMock).toHaveBeenCalledTimes(1);
    });

    it('toggles expanded state when pressed', async () => {
      const { getByText, queryByText } = renderWithTheme(<AnimatedCartCard cart={mockCart} />);
      
      await waitFor(() => {
        expect(getByText('Philadelphia Halal Cart #1')).toBeTruthy();
      });

      // Initially not expanded
      expect(queryByText('Rating & Reviews')).toBeNull();

      const card = getByText('Philadelphia Halal Cart #1');
      
      await act(async () => {
        fireEvent.press(card);
      });

      // Should show expanded content
      await waitFor(() => {
        expect(getByText('Rating & Reviews')).toBeTruthy();
        expect(getByText('Location Details')).toBeTruthy();
        expect(getByText('Operating Hours')).toBeTruthy();
        expect(getByText('Cuisine Types')).toBeTruthy();
        expect(getByText('Payment & Features')).toBeTruthy();
        expect(getByText('Contact & Info')).toBeTruthy();
      });
    });
  });

  describe('Expanded Content', () => {
    it('displays detailed information when expanded', async () => {
      const { getByText } = renderWithTheme(<AnimatedCartCard cart={mockCart} />);
      
      const card = getByText('Philadelphia Halal Cart #1');
      
      await act(async () => {
        fireEvent.press(card);
      });

      await waitFor(() => {
        // Rating section
        expect(getByText('⭐ Rating & Reviews')).toBeTruthy();
        expect(getByText('4.8/5.0')).toBeTruthy();
        
        // Location section
        expect(getByText('📍 Location Details')).toBeTruthy();
        expect(getByText('1550 N 29th St, Philadelphia, PA 19129')).toBeTruthy();
        
        // Hours section
        expect(getByText('🕒 Operating Hours')).toBeTruthy();
        expect(getByText('Monday: 11:00 - 03:00')).toBeTruthy();
        
        // Cuisine section
        expect(getByText('🍽️ Cuisine Types')).toBeTruthy();
        expect(getByText('Pakistani')).toBeTruthy();
        
        // Payment section
        expect(getByText('💳 Payment & Features')).toBeTruthy();
        expect(getByText('Payment Methods: cash')).toBeTruthy();
        
        // Contact section
        expect(getByText('📞 Contact & Info')).toBeTruthy();
        expect(getByText('Cart ID: philly-000')).toBeTruthy();
      });
    });

    it('displays formatted hours correctly', async () => {
      const { getByText } = renderWithTheme(<AnimatedCartCard cart={mockCart} />);
      
      const card = getByText('Philadelphia Halal Cart #1');
      
      await act(async () => {
        fireEvent.press(card);
      });

      await waitFor(() => {
        expect(getByText('Monday: 11:00 - 03:00')).toBeTruthy();
        expect(getByText('Tuesday: 11:00 - 03:00')).toBeTruthy();
        expect(getByText('Wednesday: 11:00 - 03:00')).toBeTruthy();
        expect(getByText('Thursday: 11:00 - 03:00')).toBeTruthy();
        expect(getByText('Friday: 11:00 - 04:00')).toBeTruthy();
        expect(getByText('Saturday: 12:00 - 04:00')).toBeTruthy();
        expect(getByText('Sunday: 12:00 - 02:00')).toBeTruthy();
      });
    });

    it('displays distance from Temple University', async () => {
      const { getByText } = renderWithTheme(<AnimatedCartCard cart={mockCart} />);
      
      const card = getByText('Philadelphia Halal Cart #1');
      
      await act(async () => {
        fireEvent.press(card);
      });

      await waitFor(() => {
        expect(getByText(/km from Temple/)).toBeTruthy();
      });
    });
  });

  describe('Multiple Cuisines', () => {
    it('displays multiple cuisines correctly', async () => {
      const multiCuisineCart = {
        ...mockCart,
        cuisine: ['Turkish', 'Mediterranean'],
      };

      const { getByText } = renderWithTheme(<AnimatedCartCard cart={multiCuisineCart} />);
      
      await waitFor(() => {
        expect(getByText('Turkish • Mediterranean')).toBeTruthy();
      });

      const card = getByText('Philadelphia Halal Cart #1');
      
      await act(async () => {
        fireEvent.press(card);
      });

      await waitFor(() => {
        expect(getByText('Turkish')).toBeTruthy();
        expect(getByText('Mediterranean')).toBeTruthy();
      });
    });
  });

  describe('Multiple Payment Methods', () => {
    it('displays multiple payment methods correctly', async () => {
      const multiPaymentCart = {
        ...mockCart,
        paymentMethods: ['cash', 'card'],
      };

      const { getByText } = renderWithTheme(<AnimatedCartCard cart={multiPaymentCart} />);
      
      await waitFor(() => {
        expect(getByText('💳 cash • card')).toBeTruthy();
      });

      const card = getByText('Philadelphia Halal Cart #1');
      
      await act(async () => {
        fireEvent.press(card);
      });

      await waitFor(() => {
        expect(getByText('Payment Methods: cash, card')).toBeTruthy();
      });
    });
  });

  describe('Animation Behavior', () => {
    it('maintains expand/collapse functionality', async () => {
      const { getByText, queryByText } = renderWithTheme(<AnimatedCartCard cart={mockCart} />);
      
      const card = getByText('Philadelphia Halal Cart #1');
      
      // Expand
      await act(async () => {
        fireEvent.press(card);
      });

      await waitFor(() => {
        expect(getByText('Rating & Reviews')).toBeTruthy();
      });

      // Collapse
      await act(async () => {
        fireEvent.press(card);
      });

      await waitFor(() => {
        expect(queryByText('Rating & Reviews')).toBeNull();
      });
    });
  });
});
