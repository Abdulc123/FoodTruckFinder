const fs = require('fs');
const path = require('path');

describe('Mock Data Validation Tests', () => {
  let mockData;

  beforeAll(() => {
    // Load the actual mock data file
    const mockDataPath = path.join(__dirname, '../mobile/assets/mock/carts.json');
    const rawData = fs.readFileSync(mockDataPath, 'utf8');
    mockData = JSON.parse(rawData);
  });

  describe('Data Structure Validation', () => {
    it('should be a valid JSON array', () => {
      expect(Array.isArray(mockData)).toBe(true);
      expect(mockData.length).toBeGreaterThan(0);
    });

    it('should contain exactly 50 food trucks', () => {
      expect(mockData.length).toBe(50);
    });

    it('each cart should have all required properties', () => {
      const requiredProperties = [
        'id', 'name', 'coords', 'city', 'address', 'cuisine', 
        'hours', 'priceLevel', 'rating', 'paymentMethods', 
        'tags', 'lastUpdated'
      ];

      mockData.forEach((cart, index) => {
        requiredProperties.forEach(property => {
          expect(cart).toHaveProperty(property);
        });
      });
    });
  });

  describe('ID Validation', () => {
    it('should have proper ID format', () => {
      mockData.forEach((cart, index) => {
        expect(cart.id).toMatch(/^philly-\d{3}$/);
        expect(cart.id).toBe(`philly-${index.toString().padStart(3, '0')}`);
      });
    });

    it('should have unique IDs', () => {
      const ids = mockData.map(cart => cart.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });
  });

  describe('Name Validation', () => {
    it('should have proper name format', () => {
      mockData.forEach((cart, index) => {
        expect(cart.name).toBe(`Philadelphia Halal Cart #${index + 1}`);
      });
    });

    it('should have non-empty names', () => {
      mockData.forEach(cart => {
        expect(cart.name).toBeTruthy();
        expect(cart.name.length).toBeGreaterThan(0);
      });
    });
  });

  describe('City Validation', () => {
    it('should all be in Philadelphia', () => {
      mockData.forEach(cart => {
        expect(cart.city).toBe('Philadelphia');
      });
    });
  });

  describe('Address Validation', () => {
    it('should have valid Philadelphia address format', () => {
      const addressRegex = /^\d+\s+[A-Za-z\s]+, Philadelphia, PA \d{5}$/;
      
      mockData.forEach(cart => {
        expect(cart.address).toMatch(addressRegex);
      });
    });

    it('should be in Temple University area ZIP codes', () => {
      const templeZipCodes = ['19121', '19122', '19123', '19129', '19132', '19133', '19140'];
      
      mockData.forEach(cart => {
        const zipCode = cart.address.split(' ').pop();
        expect(templeZipCodes).toContain(zipCode);
      });
    });

    it('should have diverse addresses', () => {
      const addresses = mockData.map(cart => cart.address);
      const uniqueAddresses = new Set(addresses);
      
      // Should have reasonable diversity (not all the same address)
      expect(uniqueAddresses.size).toBeGreaterThan(10);
    });
  });

  describe('Coordinate Validation', () => {
    it('should have valid coordinate structure', () => {
      mockData.forEach(cart => {
        expect(cart.coords).toHaveProperty('lat');
        expect(cart.coords).toHaveProperty('lng');
        expect(typeof cart.coords.lat).toBe('number');
        expect(typeof cart.coords.lng).toBe('number');
      });
    });

    it('should be near Temple University', () => {
      const templeLat = 39.9818;
      const templeLng = -75.1554;
      
      mockData.forEach(cart => {
        const latDiff = Math.abs(cart.coords.lat - templeLat);
        const lngDiff = Math.abs(cart.coords.lng - templeLng);
        
        // Should be within ~2km of Temple University
        expect(latDiff).toBeLessThan(0.02);
        expect(lngDiff).toBeLessThan(0.02);
      });
    });

    it('should have diverse coordinates', () => {
      const coordinates = mockData.map(cart => cart.coords);
      const uniqueCoords = new Set(coordinates.map(coord => `${coord.lat},${coord.lng}`));
      
      // Should have good diversity in coordinates
      expect(uniqueCoords.size).toBeGreaterThan(20);
    });
  });

  describe('Cuisine Validation', () => {
    it('should have valid cuisine arrays', () => {
      mockData.forEach(cart => {
        expect(Array.isArray(cart.cuisine)).toBe(true);
        expect(cart.cuisine.length).toBeGreaterThan(0);
      });
    });

    it('should use only valid cuisine types', () => {
      const validCuisines = [
        'Egyptian', 'Mediterranean', 'Pakistani', 'Bangladeshi', 'Afghan', 'Turkish'
      ];
      
      mockData.forEach(cart => {
        cart.cuisine.forEach(cuisine => {
          expect(validCuisines).toContain(cuisine);
        });
      });
    });

    it('should have diverse cuisine combinations', () => {
      const cuisineCombos = mockData.map(cart => cart.cuisine.join(', '));
      const uniqueCombos = new Set(cuisineCombos);
      
      // Should have variety in cuisine combinations
      expect(uniqueCombos.size).toBeGreaterThan(1);
    });
  });

  describe('Hours Validation', () => {
    it('should have valid hours structure', () => {
      mockData.forEach(cart => {
        expect(typeof cart.hours).toBe('object');
        expect(cart.hours).not.toBeNull();
        
        const days = Object.keys(cart.hours);
        expect(days.length).toBeGreaterThan(0);
        
        days.forEach(day => {
          expect(Array.isArray(cart.hours[day])).toBe(true);
          expect(cart.hours[day].length).toBe(2); // [open, close]
        });
      });
    });

    it('should have valid time format', () => {
      const timeRegex = /^\d{2}:\d{2}$/;
      
      mockData.forEach(cart => {
        Object.values(cart.hours).forEach(timeSlot => {
          expect(timeSlot[0]).toMatch(timeRegex);
          expect(timeSlot[1]).toMatch(timeRegex);
        });
      });
    });

    it('should have diverse hour patterns', () => {
      const hourPatterns = mockData.map(cart => {
        const monHours = cart.hours.mon;
        return monHours ? monHours.join('-') : 'none';
      });
      const uniquePatterns = new Set(hourPatterns);
      
      // Should have both regular and late-night hours
      expect(uniquePatterns.size).toBeGreaterThan(1);
    });
  });

  describe('Rating Validation', () => {
    it('should have valid ratings', () => {
      mockData.forEach(cart => {
        expect(typeof cart.rating).toBe('number');
        expect(cart.rating).toBeGreaterThanOrEqual(3.8);
        expect(cart.rating).toBeLessThanOrEqual(5.0);
      });
    });

    it('should have diverse ratings', () => {
      const ratings = mockData.map(cart => cart.rating);
      const uniqueRatings = new Set(ratings);
      
      // Should have good variety in ratings
      expect(uniqueRatings.size).toBeGreaterThan(5);
    });
  });

  describe('Price Level Validation', () => {
    it('should have valid price levels', () => {
      mockData.forEach(cart => {
        expect(typeof cart.priceLevel).toBe('number');
        expect(cart.priceLevel).toBeGreaterThanOrEqual(1);
        expect(cart.priceLevel).toBeLessThanOrEqual(3);
      });
    });

    it('should have all price levels represented', () => {
      const priceLevels = mockData.map(cart => cart.priceLevel);
      const uniquePriceLevels = new Set(priceLevels);
      
      // Should have all 3 price levels
      expect(uniquePriceLevels.size).toBe(3);
      expect(uniquePriceLevels.has(1)).toBe(true);
      expect(uniquePriceLevels.has(2)).toBe(true);
      expect(uniquePriceLevels.has(3)).toBe(true);
    });
  });

  describe('Payment Methods Validation', () => {
    it('should have valid payment method arrays', () => {
      mockData.forEach(cart => {
        expect(Array.isArray(cart.paymentMethods)).toBe(true);
        expect(cart.paymentMethods.length).toBeGreaterThan(0);
        expect(cart.paymentMethods.length).toBeLessThanOrEqual(2);
      });
    });

    it('should use only valid payment methods', () => {
      const validMethods = ['cash', 'card'];
      
      mockData.forEach(cart => {
        cart.paymentMethods.forEach(method => {
          expect(validMethods).toContain(method);
        });
      });
    });

    it('should have diverse payment method combinations', () => {
      const paymentCombos = mockData.map(cart => cart.paymentMethods.join(', '));
      const uniqueCombos = new Set(paymentCombos);
      
      // Should have both single and multiple payment methods
      expect(uniqueCombos.size).toBeGreaterThan(1);
    });
  });

  describe('Tags Validation', () => {
    it('should have valid tag arrays', () => {
      mockData.forEach(cart => {
        expect(Array.isArray(cart.tags)).toBe(true);
        expect(cart.tags.length).toBeGreaterThan(0);
      });
    });

    it('should use only valid tags', () => {
      const validTags = ['late-night', 'quick-bite'];
      
      mockData.forEach(cart => {
        cart.tags.forEach(tag => {
          expect(validTags).toContain(tag);
        });
      });
    });

    it('should have diverse tag combinations', () => {
      const tagCombos = mockData.map(cart => cart.tags.join(', '));
      const uniqueCombos = new Set(tagCombos);
      
      // Should have variety in tag combinations
      expect(uniqueCombos.size).toBeGreaterThan(1);
    });
  });

  describe('Last Updated Validation', () => {
    it('should have valid timestamp format', () => {
      const timestampRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;
      
      mockData.forEach(cart => {
        expect(cart.lastUpdated).toMatch(timestampRegex);
      });
    });

    it('should have recent timestamps', () => {
      const now = new Date();
      
      mockData.forEach(cart => {
        const timestamp = new Date(cart.lastUpdated);
        const diff = now - timestamp;
        
        // Should be recent (within last hour)
        expect(diff).toBeLessThan(3600000);
      });
    });

    it('should have consistent timestamps', () => {
      const timestamps = mockData.map(cart => cart.lastUpdated);
      const uniqueTimestamps = new Set(timestamps);
      
      // All timestamps should be the same (generated at same time)
      expect(uniqueTimestamps.size).toBe(1);
    });
  });

  describe('Data Consistency', () => {
    it('should have consistent data types', () => {
      mockData.forEach(cart => {
        expect(typeof cart.id).toBe('string');
        expect(typeof cart.name).toBe('string');
        expect(typeof cart.coords).toBe('object');
        expect(typeof cart.city).toBe('string');
        expect(typeof cart.address).toBe('string');
        expect(Array.isArray(cart.cuisine)).toBe(true);
        expect(typeof cart.hours).toBe('object');
        expect(typeof cart.priceLevel).toBe('number');
        expect(typeof cart.rating).toBe('number');
        expect(Array.isArray(cart.paymentMethods)).toBe(true);
        expect(Array.isArray(cart.tags)).toBe(true);
        expect(typeof cart.lastUpdated).toBe('string');
      });
    });

    it('should not have null or undefined values', () => {
      mockData.forEach(cart => {
        Object.values(cart).forEach(value => {
          expect(value).not.toBeNull();
          expect(value).not.toBeUndefined();
        });
      });
    });

    it('should have reasonable data distribution', () => {
      // Check that we have a good distribution of different attributes
      const cuisines = new Set();
      const tags = new Set();
      const paymentMethods = new Set();
      
      mockData.forEach(cart => {
        cart.cuisine.forEach(c => cuisines.add(c));
        cart.tags.forEach(t => tags.add(t));
        cart.paymentMethods.forEach(p => paymentMethods.add(p));
      });
      
      // Should have multiple cuisines, tags, and payment methods
      expect(cuisines.size).toBeGreaterThan(3);
      expect(tags.size).toBeGreaterThan(1);
      expect(paymentMethods.size).toBe(2); // cash and card
    });
  });

  describe('Performance and Size', () => {
    it('should be reasonable size for mobile app', () => {
      const jsonString = JSON.stringify(mockData);
      const sizeInKB = jsonString.length / 1024;
      
      // Should be reasonable size for mobile app (< 100KB)
      expect(sizeInKB).toBeLessThan(100);
      expect(sizeInKB).toBeGreaterThan(10);
    });

    it('should load quickly', () => {
      const startTime = Date.now();
      const jsonString = JSON.stringify(mockData);
      const parsedData = JSON.parse(jsonString);
      const endTime = Date.now();
      
      const loadTime = endTime - startTime;
      
      // Should parse quickly (< 10ms)
      expect(loadTime).toBeLessThan(10);
      expect(parsedData).toEqual(mockData);
    });
  });
});
