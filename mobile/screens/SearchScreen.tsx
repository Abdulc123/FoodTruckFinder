import React from 'react';
import { View, Text, TextInput, FlatList, Image, TouchableOpacity, Alert } from 'react-native';
import styles from './css/SearchScreen.styles';
import { useTheme } from '../theme/ThemeContext';

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
      Alert.alert('Error', 'Failed to load food truck data');
      setIsLoading(false);
    }
  };

  const handleCartPress = (cart: Cart) => {
    Alert.alert(
      cart.name,
      `Address: ${cart.address}\nCuisine: ${cart.cuisine.join(', ')}\nRating: ${cart.rating}/5\nPrice Level: ${cart.priceLevel}\nPayment: ${cart.paymentMethods.join(', ')}`,
      [{ text: 'OK' }]
    );
  };

  const renderPriceLevel = (level: number) => {
    return '💰'.repeat(level);
  };

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let stars = '⭐'.repeat(fullStars);
    if (hasHalfStar) stars += '⭐';
    return stars;
  };

  const renderCartItem = ({ item }: { item: Cart }) => (
    <TouchableOpacity 
      style={[styles.cartCard, { backgroundColor: theme.background, borderColor: theme.primary }]}
      onPress={() => handleCartPress(item)}
    >
      <View style={styles.cartImageContainer}>
        <Image 
          source={{ uri: `https://picsum.photos/150/100?random=${item.id}` }}
          style={styles.cartImage}
          defaultSource={{ uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==' }}
        />
        <View style={styles.ratingBadge}>
          <Text style={styles.ratingText}>{item.rating}</Text>
        </View>
      </View>
      
      <View style={styles.cartInfo}>
        <Text style={[styles.cartName, { color: theme.text }]} numberOfLines={2}>
          {item.name}
        </Text>
        
        <View style={styles.cartDetails}>
          <Text style={[styles.cartCuisine, { color: theme.secondary }]} numberOfLines={1}>
            {item.cuisine.join(' • ')}
          </Text>
          
          <View style={styles.cartMeta}>
            <Text style={[styles.cartLocation, { color: theme.text }]} numberOfLines={1}>
              📍 {item.address}
            </Text>
            <Text style={[styles.cartPrice, { color: theme.text }]}>
              {renderPriceLevel(item.priceLevel)}
            </Text>
          </View>
          
          <View style={styles.cartTags}>
            {item.tags.map((tag, index) => (
              <View key={index} style={[styles.tag, { backgroundColor: theme.primary }]}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>
          
          <View style={styles.paymentMethods}>
            <Text style={[styles.paymentText, { color: theme.text }]}>
              💳 {item.paymentMethods.join(' • ')}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
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
