const fs = require('fs');
const path = require('path');

// Mock fs module for testing
jest.mock('fs');

describe('generateCarts.js Script Tests', () => {
  let generateCarts;

  beforeEach(() => {
    jest.clearAllMocks();
    // Clear module cache to ensure fresh imports
    jest.resetModules();
    
    // Mock console.log to avoid test output noise
    jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('Script Execution', () => {
    it('runs without throwing errors', () => {
      expect(() => {
        require('../scripts/generateCarts.js');
      }).not.toThrow();
    });

    it('calls fs.writeFileSync with correct parameters', () => {
      require('../scripts/generateCarts.js');
      
      expect(fs.writeFileSync).toHaveBeenCalledWith(
        'mobile/assets/mock/carts.json',
        expect.any(String)
      );
    });

    it('logs success message', () => {
      require('../scripts/generateCarts.js');
      
      expect(console.log).toHaveBeenCalledWith(
        'Generated mobile/assets/mock/carts.json with Philadelphia trucks near Temple University'
      );
    });
  });

  describe('Generated Data Structure', () => {
    let mockData;

    beforeEach(() => {
      // Capture the data passed to writeFileSync
      fs.writeFileSync.mockImplementation((filePath, data) => {
        if (filePath === 'mobile/assets/mock/carts.json') {
          mockData = JSON.parse(data);
        }
      });
      
      require('../scripts/generateCarts.js');
    });

    it('generates array of cart objects', () => {
      expect(Array.isArray(mockData)).toBe(true);
      expect(mockData.length).toBe(50);
    });

    it('each cart has required properties', () => {
      const cart = mockData[0];
      
      expect(cart).toHaveProperty('id');
      expect(cart).toHaveProperty('name');
      expect(cart).toHaveProperty('coords');
      expect(cart).toHaveProperty('city');
      expect(cart).toHaveProperty('address');
      expect(cart).toHaveProperty('cuisine');
      expect(cart).toHaveProperty('hours');
      expect(cart).toHaveProperty('priceLevel');
      expect(cart).toHaveProperty('rating');
      expect(cart).toHaveProperty('paymentMethods');
      expect(cart).toHaveProperty('tags');
      expect(cart).toHaveProperty('lastUpdated');
    });

    it('generates correct cart IDs', () => {
      mockData.forEach((cart, index) => {
        expect(cart.id).toBe(`philly-${index.toString().padStart(3, '0')}`);
      });
    });

    it('all carts are in Philadelphia', () => {
      mockData.forEach(cart => {
        expect(cart.city).toBe('Philadelphia');
      });
    });

    it('all cart names start with Philadelphia Halal Cart', () => {
      mockData.forEach((cart, index) => {
        expect(cart.name).toBe(`Philadelphia Halal Cart #${index + 1}`);
      });
    });
  });

  describe('Address Generation', () => {
    let mockData;

    beforeEach(() => {
      fs.writeFileSync.mockImplementation((filePath, data) => {
        if (filePath === 'mobile/assets/mock/carts.json') {
          mockData = JSON.parse(data);
        }
      });
      
      require('../scripts/generateCarts.js');
    });

    it('generates valid Philadelphia addresses', () => {
      mockData.forEach(cart => {
        expect(cart.address).toMatch(/^\d+\s+[A-Za-z\s]+, Philadelphia, PA \d{5}$/);
      });
    });

    it('addresses are near Temple University area', () => {
      const templeZipCodes = ['19121', '19122', '19123', '19129', '19132', '19133', '19140'];
      
      mockData.forEach(cart => {
        const zipCode = cart.address.split(' ').pop();
        expect(templeZipCodes).toContain(zipCode);
      });
    });

    it('generates diverse addresses', () => {
      const addresses = mockData.map(cart => cart.address);
      const uniqueAddresses = new Set(addresses);
      
      // Should have some variety in addresses (not all the same)
      expect(uniqueAddresses.size).toBeGreaterThan(1);
    });
  });

  describe('Coordinate Generation', () => {
    let mockData;

    beforeEach(() => {
      fs.writeFileSync.mockImplementation((filePath, data) => {
        if (filePath === 'mobile/assets/mock/carts.json') {
          mockData = JSON.parse(data);
        }
      });
      
      require('../scripts/generateCarts.js');
    });

    it('generates valid coordinates near Temple University', () => {
      const templeLat = 39.9818;
      const templeLng = -75.1554;
      
      mockData.forEach(cart => {
        // Coordinates should be within reasonable distance of Temple (within ~2km)
        const latDiff = Math.abs(cart.coords.lat - templeLat);
        const lngDiff = Math.abs(cart.coords.lng - templeLng);
        
        expect(latDiff).toBeLessThan(0.02); // ~2km
        expect(lngDiff).toBeLessThan(0.02); // ~2km
      });
    });

    it('coordinates have proper structure', () => {
      mockData.forEach(cart => {
        expect(typeof cart.coords.lat).toBe('number');
        expect(typeof cart.coords.lng).toBe('number');
        expect(cart.coords.lat).not.toBeNaN();
        expect(cart.coords.lng).not.toBeNaN();
      });
    });

    it('generates diverse coordinates', () => {
      const coordinates = mockData.map(cart => cart.coords);
      const uniqueCoords = new Set(coordinates.map(coord => `${coord.lat},${coord.lng}`));
      
      // Should have some variety in coordinates
      expect(uniqueCoords.size).toBeGreaterThan(10);
    });
  });

  describe('Cuisine Generation', () => {
    let mockData;

    beforeEach(() => {
      fs.writeFileSync.mockImplementation((filePath, data) => {
        if (filePath === 'mobile/assets/mock/carts.json') {
          mockData = JSON.parse(data);
        }
      });
      
      require('../scripts/generateCarts.js');
    });

    it('generates valid cuisine arrays', () => {
      mockData.forEach(cart => {
        expect(Array.isArray(cart.cuisine)).toBe(true);
        expect(cart.cuisine.length).toBeGreaterThan(0);
      });
    });

    it('uses predefined cuisine types', () => {
      const validCuisines = [
        'Egyptian', 'Mediterranean', 'Pakistani', 'Bangladeshi', 'Afghan', 'Turkish'
      ];
      
      mockData.forEach(cart => {
        cart.cuisine.forEach(cuisine => {
          expect(validCuisines).toContain(cuisine);
        });
      });
    });

    it('generates diverse cuisine combinations', () => {
      const cuisineCombos = mockData.map(cart => cart.cuisine.join(', '));
      const uniqueCombos = new Set(cuisineCombos);
      
      // Should have variety in cuisine combinations
      expect(uniqueCombos.size).toBeGreaterThan(1);
    });
  });

  describe('Rating and Price Generation', () => {
    let mockData;

    beforeEach(() => {
      fs.writeFileSync.mockImplementation((filePath, data) => {
        if (filePath === 'mobile/assets/mock/carts.json') {
          mockData = JSON.parse(data);
        }
      });
      
      require('../scripts/generateCarts.js');
    });

    it('generates valid ratings', () => {
      mockData.forEach(cart => {
        expect(typeof cart.rating).toBe('number');
        expect(cart.rating).toBeGreaterThanOrEqual(3.8);
        expect(cart.rating).toBeLessThanOrEqual(5.0);
      });
    });

    it('generates valid price levels', () => {
      mockData.forEach(cart => {
        expect(typeof cart.priceLevel).toBe('number');
        expect(cart.priceLevel).toBeGreaterThanOrEqual(1);
        expect(cart.priceLevel).toBeLessThanOrEqual(3);
      });
    });

    it('generates diverse ratings and price levels', () => {
      const ratings = mockData.map(cart => cart.rating);
      const priceLevels = mockData.map(cart => cart.priceLevel);
      
      const uniqueRatings = new Set(ratings);
      const uniquePriceLevels = new Set(priceLevels);
      
      expect(uniqueRatings.size).toBeGreaterThan(5);
      expect(uniquePriceLevels.size).toBe(3); // Should have all 3 price levels
    });
  });

  describe('Payment Methods and Tags', () => {
    let mockData;

    beforeEach(() => {
      fs.writeFileSync.mockImplementation((filePath, data) => {
        if (filePath === 'mobile/assets/mock/carts.json') {
          mockData = JSON.parse(data);
        }
      });
      
      require('../scripts/generateCarts.js');
    });

    it('generates valid payment methods', () => {
      mockData.forEach(cart => {
        expect(Array.isArray(cart.paymentMethods)).toBe(true);
        expect(cart.paymentMethods.length).toBeGreaterThan(0);
        expect(cart.paymentMethods.length).toBeLessThanOrEqual(2);
        
        cart.paymentMethods.forEach(method => {
          expect(['cash', 'card']).toContain(method);
        });
      });
    });

    it('generates valid tags', () => {
      mockData.forEach(cart => {
        expect(Array.isArray(cart.tags)).toBe(true);
        expect(cart.tags.length).toBeGreaterThan(0);
        
        cart.tags.forEach(tag => {
          expect(['late-night', 'quick-bite']).toContain(tag);
        });
      });
    });

    it('generates diverse payment method combinations', () => {
      const paymentCombos = mockData.map(cart => cart.paymentMethods.join(', '));
      const uniqueCombos = new Set(paymentCombos);
      
      // Should have both single and multiple payment methods
      expect(uniqueCombos.size).toBeGreaterThan(1);
    });
  });

  describe('Hours Generation', () => {
    let mockData;

    beforeEach(() => {
      fs.writeFileSync.mockImplementation((filePath, data) => {
        if (filePath === 'mobile/assets/mock/carts.json') {
          mockData = JSON.parse(data);
        }
      });
      
      require('../scripts/generateCarts.js');
    });

    it('generates valid hours structure', () => {
      mockData.forEach(cart => {
        expect(typeof cart.hours).toBe('object');
        expect(cart.hours).not.toBeNull();
        
        // Check for common days
        const days = Object.keys(cart.hours);
        expect(days.length).toBeGreaterThan(0);
        
        days.forEach(day => {
          expect(Array.isArray(cart.hours[day])).toBe(true);
          expect(cart.hours[day].length).toBe(2); // [open, close]
        });
      });
    });

    it('generates diverse hour patterns', () => {
      const hourPatterns = mockData.map(cart => {
        const monHours = cart.hours.mon;
        return monHours ? monHours.join('-') : 'none';
      });
      const uniquePatterns = new Set(hourPatterns);
      
      // Should have both regular and late-night hours
      expect(uniquePatterns.size).toBeGreaterThan(1);
    });
  });

  describe('Data Consistency', () => {
    let mockData;

    beforeEach(() => {
      fs.writeFileSync.mockImplementation((filePath, data) => {
        if (filePath === 'mobile/assets/mock/carts.json') {
          mockData = JSON.parse(data);
        }
      });
      
      require('../scripts/generateCarts.js');
    });

    it('generates consistent data across multiple runs', () => {
      // Run the script again to get another dataset
      let secondRunData;
      fs.writeFileSync.mockImplementation((filePath, data) => {
        if (filePath === 'mobile/assets/mock/carts.json') {
          secondRunData = JSON.parse(data);
        }
      });
      
      require('../scripts/generateCarts.js');
      
      // Data structure should be consistent
      expect(Array.isArray(secondRunData)).toBe(true);
      expect(secondRunData.length).toBe(50);
      
      // Check first cart structure
      const cart = secondRunData[0];
      expect(cart).toHaveProperty('id');
      expect(cart).toHaveProperty('name');
      expect(cart).toHaveProperty('address');
    });

    it('generates valid JSON format', () => {
      // The data should be valid JSON (already parsed successfully)
      expect(Array.isArray(mockData)).toBe(true);
      
      // Should be able to stringify and parse again
      const jsonString = JSON.stringify(mockData);
      const parsedData = JSON.parse(jsonString);
      expect(parsedData).toEqual(mockData);
    });

    it('has proper lastUpdated timestamps', () => {
      mockData.forEach(cart => {
        expect(typeof cart.lastUpdated).toBe('string');
        expect(cart.lastUpdated).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/);
        
        // Should be recent timestamp
        const timestamp = new Date(cart.lastUpdated);
        const now = new Date();
        const diff = now - timestamp;
        expect(diff).toBeLessThan(60000); // Less than 1 minute ago
      });
    });
  });
});
