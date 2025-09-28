import React from 'react';
import { View, Text, TextInput, FlatList } from 'react-native';
import styles from './css/SearchScreen.styles';
import { useTheme } from '../theme/ThemeContext';
import AnimatedCartCard from '../components/AnimatedCartCard';

interface Cart {
  id: string;
  name: string;
  coords: {
    lat: number;
    lng: number;
  };
  city: string;
  address: string;
  cuisine: string[];
  hours: {
    [key: string]: string[];
  };
  priceLevel: number;
  rating: number;
  paymentMethods: string[];
  tags: string[];
  lastUpdated: string;
}

export default function SearchScreen() {
  const [query, setQuery] = React.useState('');
  const [carts, setCarts] = React.useState<Cart[]>([]);
  const [filteredCarts, setFilteredCarts] = React.useState<Cart[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const { theme } = useTheme();

  // Load mock data on component mount
  React.useEffect(() => {
    loadCarts();
  }, []);

  // Filter carts based on search query
  React.useEffect(() => {
    if (query.trim() === '') {
      setFilteredCarts(carts);
    } else {
      const filtered = carts.filter(cart => 
        cart.name.toLowerCase().includes(query.toLowerCase()) ||
        cart.city.toLowerCase().includes(query.toLowerCase()) ||
        cart.address.toLowerCase().includes(query.toLowerCase()) ||
        cart.cuisine.some(c => c.toLowerCase().includes(query.toLowerCase())) ||
        cart.tags.some(t => t.toLowerCase().includes(query.toLowerCase()))
      );
      setFilteredCarts(filtered);
    }
  }, [query, carts]);

  const loadCarts = async () => {
    try {
      const mockData = require('../assets/mock/carts.json');
      setCarts(mockData);
      setFilteredCarts(mockData);
      setIsLoading(false);
    } catch (error) {
      console.error('Error loading carts:', error);
      setIsLoading(false);
    }
  };

  const renderCartItem = ({ item }: { item: Cart }) => (
    <AnimatedCartCard 
      cart={item}
      onPress={() => {
        // Optional: Add any additional handling here
        console.log('Card pressed:', item.name);
      }}
    />
  );

  const themeStyle = {
    backgroundColor: theme.background,
  };

  if (isLoading) {
    return (
      <View style={[styles.container, styles.centerContent, themeStyle]}>
        <Text style={[styles.loadingText, { color: theme.text }]}>Loading food trucks...</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, themeStyle]}>
      <Text style={[styles.title, { color: theme.primary }]}>Find Food Trucks</Text>
      
      <View style={styles.searchContainer}>
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Search trucks, cuisine, address, or location..."
          style={[styles.searchInput, { 
            borderColor: theme.primary, 
            color: theme.text,
            backgroundColor: theme.background 
          }]}
          placeholderTextColor={theme.text}
        />
        <Text style={[styles.searchIcon, { color: theme.primary }]}>🔍</Text>
      </View>
      
      <View style={styles.resultsHeader}>
        <Text style={[styles.resultsCount, { color: theme.text }]}>
          {filteredCarts.length} food truck{filteredCarts.length !== 1 ? 's' : ''} found
        </Text>
      </View>

      <FlatList
        data={filteredCarts}
        renderItem={renderCartItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        numColumns={1}
      />
    </View>
  );
}
