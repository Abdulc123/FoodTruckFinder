import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Animated,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import { useTheme } from '../theme/ThemeContext';

// Enable LayoutAnimation on Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

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

interface AnimatedCartCardProps {
  cart: Cart;
  onPress?: () => void;
}

const AnimatedCartCard: React.FC<AnimatedCartCardProps> = ({ cart, onPress }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { theme } = useTheme();
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePress = () => {
    // Configure layout animation
    LayoutAnimation.configureNext({
      duration: 300,
      create: {
        type: LayoutAnimation.Types.easeInEaseOut,
        property: LayoutAnimation.Properties.opacity,
      },
      update: {
        type: LayoutAnimation.Types.easeInEaseOut,
      },
    });

    setIsExpanded(!isExpanded);

    // Animate rotation for expand/collapse indicator
    Animated.timing(rotateAnim, {
      toValue: isExpanded ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

    // Animate scale for visual feedback
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    if (onPress) {
      onPress();
    }
  };

  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

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

  const formatHours = (hours: { [key: string]: string[] }) => {
    const dayNames = {
      mon: 'Monday',
      tue: 'Tuesday',
      wed: 'Wednesday',
      thu: 'Thursday',
      fri: 'Friday',
      sat: 'Saturday',
      sun: 'Sunday',
    };

    return Object.entries(hours).map(([day, times]) => {
      const dayName = dayNames[day as keyof typeof dayNames] || day;
      return `${dayName}: ${times[0]} - ${times[1]}`;
    });
  };

  const getDistanceFromTemple = (coords: { lat: number; lng: number }) => {
    // Simple distance calculation from Temple University
    const templeLat = 39.9818;
    const templeLng = -75.1554;
    const distance = Math.sqrt(
      Math.pow(coords.lat - templeLat, 2) + Math.pow(coords.lng - templeLng, 2)
    ) * 111; // Rough conversion to km
    return `${distance.toFixed(1)} km from Temple`;
  };

  // Static local images included so Metro/bundler can package them.
  const FOOD_TRUCK_IMAGES = [
    require('../assets/food-truck1.jpg'),
    require('../assets/food-truck2.jpg'),
    require('../assets/food-truck3.jpg'),
    require('../assets/food-truck4.jpg'),
    require('../assets/food-truck5.jpg'),
    require('../assets/food-truck6.jpg'),
    require('../assets/food-truck7.jpg'),
    require('../assets/food-truck8.jpg'),
  ];

  const getImageForCart = (id: string) => {
    // Try to parse numeric suffix from IDs like 'philly-012' or 'philly-12'
    const m = id.match(/(\d+)$/);
    let idx = 0;
    if (m) {
      idx = parseInt(m[1], 10);
    } else {
      // fallback: hash the id string
      let hash = 0;
      for (let i = 0; i < id.length; i++) {
        hash = (hash << 5) - hash + id.charCodeAt(i);
        hash |= 0;
      }
      idx = Math.abs(hash);
    }
    return FOOD_TRUCK_IMAGES[idx % FOOD_TRUCK_IMAGES.length];
  };

  return (
    <Animated.View
      style={[
        {
          transform: [{ scale: scaleAnim }],
        },
      ]}
    >
      <TouchableOpacity
        style={[
          styles.cartCard,
          {
            backgroundColor: theme.background,
            borderColor: theme.primary,
          },
          isExpanded && styles.expandedCard,
        ]}
        onPress={handlePress}
        activeOpacity={0.8}
      >
        {/* Main Card Content */}
        <View style={styles.mainContent}>
          <View style={styles.cartImageContainer}>
            <Image
              source={getImageForCart(cart.id)}
              style={styles.cartImage}
              defaultSource={require('../assets/icon.png')}
            />
            <View style={styles.ratingBadge}>
              <Text style={styles.ratingText}>{cart.rating}</Text>
            </View>
          </View>

          <View style={styles.cartInfo}>
            <View style={styles.titleRow}>
              <Text style={[styles.cartName, { color: theme.text }]} numberOfLines={2}>
                {cart.name}
              </Text>
              <Animated.View
                style={[
                  styles.expandIcon,
                  {
                    transform: [{ rotate: rotateInterpolate }],
                  },
                ]}
              >
                <Text style={[styles.expandIconText, { color: theme.primary }]}>▼</Text>
              </Animated.View>
            </View>

            <View style={styles.cartDetails}>
              <Text style={[styles.cartCuisine, { color: theme.secondary }]} numberOfLines={1}>
                {cart.cuisine.join(' • ')}
              </Text>

              <View style={styles.cartMeta}>
                <Text style={[styles.cartLocation, { color: theme.text }]} numberOfLines={1}>
                  📍 {cart.address}
                </Text>
                <Text style={[styles.cartPrice, { color: theme.text }]}>
                  {renderPriceLevel(cart.priceLevel)}
                </Text>
              </View>

              <View style={styles.cartTags}>
                {cart.tags.map((tag, index) => (
                  <View key={index} style={[styles.tag, { backgroundColor: theme.primary }]}>
                    <Text style={styles.tagText}>{tag}</Text>
                  </View>
                ))}
              </View>

              <View style={styles.paymentMethods}>
                <Text style={[styles.paymentText, { color: theme.text }]}>
                  💳 {cart.paymentMethods.join(' • ')}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Expanded Content */}
        {isExpanded && (
          <View style={styles.expandedContent}>
            <View style={styles.divider} />
            
            <View style={styles.detailedInfo}>
              {/* Rating Section */}
              <View style={styles.detailSection}>
                <Text style={[styles.detailTitle, { color: theme.primary }]}>⭐ Rating & Reviews</Text>
                <View style={styles.ratingSection}>
                  <Text style={[styles.ratingStars, { color: theme.text }]}>
                    {renderStars(cart.rating)}
                  </Text>
                  <Text style={[styles.ratingValue, { color: theme.text }]}>
                    {cart.rating}/5.0
                  </Text>
                </View>
              </View>

              {/* Location Section */}
              <View style={styles.detailSection}>
                <Text style={[styles.detailTitle, { color: theme.primary }]}>📍 Location Details</Text>
                <Text style={[styles.detailText, { color: theme.text }]}>
                  {cart.address}
                </Text>
                <Text style={[styles.distanceText, { color: theme.secondary }]}>
                  {getDistanceFromTemple(cart.coords)}
                </Text>
              </View>

              {/* Hours Section */}
              <View style={styles.detailSection}>
                <Text style={[styles.detailTitle, { color: theme.primary }]}>🕒 Operating Hours</Text>
                {formatHours(cart.hours).map((hour, index) => (
                  <Text key={index} style={[styles.detailText, { color: theme.text }]}>
                    {hour}
                  </Text>
                ))}
              </View>

              {/* Cuisine Section */}
              <View style={styles.detailSection}>
                <Text style={[styles.detailTitle, { color: theme.primary }]}>🍽️ Cuisine Types</Text>
                <View style={styles.cuisineTags}>
                  {cart.cuisine.map((cuisine, index) => (
                    <View key={index} style={[styles.cuisineTag, { backgroundColor: theme.primary }]}>
                      <Text style={styles.cuisineTagText}>{cuisine}</Text>
                    </View>
                  ))}
                </View>
              </View>

              {/* Payment & Tags Section */}
              <View style={styles.detailSection}>
                <Text style={[styles.detailTitle, { color: theme.primary }]}>💳 Payment & Features</Text>
                <Text style={[styles.detailText, { color: theme.text }]}>
                  Payment Methods: {cart.paymentMethods.join(', ')}
                </Text>
                <View style={styles.featureTags}>
                  {cart.tags.map((tag, index) => (
                    <View key={index} style={[styles.featureTag, { backgroundColor: theme.secondary }]}>
                      <Text style={styles.featureTagText}>{tag.replace('-', ' ')}</Text>
                    </View>
                  ))}
                </View>
              </View>

              {/* Contact Section */}
              <View style={styles.detailSection}>
                <Text style={[styles.detailTitle, { color: theme.primary }]}>📞 Contact & Info</Text>
                <Text style={[styles.detailText, { color: theme.text }]}>
                  Last Updated: {new Date(cart.lastUpdated).toLocaleDateString()}
                </Text>
                <Text style={[styles.detailText, { color: theme.text }]}>
                  Cart ID: {cart.id}
                </Text>
              </View>
            </View>
          </View>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = {
  cartCard: {
    flexDirection: 'column' as const,
    marginBottom: 16,
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden' as const,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  expandedCard: {
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  mainContent: {
    flexDirection: 'row' as const,
  },
  cartImageContainer: {
    position: 'relative' as const,
    width: 120,
    height: 100,
  },
  cartImage: {
    width: 120,
    height: 100,
    resizeMode: 'cover' as const,
  },
  ratingBadge: {
    position: 'absolute' as const,
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  ratingText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600' as const,
  },
  cartInfo: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between' as const,
  },
  titleRow: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'flex-start' as const,
    marginBottom: 4,
  },
  cartName: {
    fontSize: 16,
    fontWeight: '600' as const,
    lineHeight: 20,
    flex: 1,
    marginRight: 8,
  },
  expandIcon: {
    padding: 4,
  },
  expandIconText: {
    fontSize: 12,
    fontWeight: 'bold' as const,
  },
  cartDetails: {
    flex: 1,
  },
  cartCuisine: {
    fontSize: 14,
    fontWeight: '500' as const,
    marginBottom: 6,
    opacity: 0.8,
  },
  cartMeta: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
    marginBottom: 8,
  },
  cartLocation: {
    fontSize: 13,
    fontWeight: '500' as const,
    flex: 1,
    marginRight: 8,
  },
  cartPrice: {
    fontSize: 16,
  },
  cartTags: {
    flexDirection: 'row' as const,
    flexWrap: 'wrap' as const,
    marginBottom: 6,
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 6,
    marginBottom: 4,
  },
  tagText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '500' as const,
  },
  paymentMethods: {
    marginTop: 4,
  },
  paymentText: {
    fontSize: 12,
    opacity: 0.7,
  },
  expandedContent: {
    backgroundColor: 'rgba(0,0,0,0.02)',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(0,0,0,0.1)',
    marginHorizontal: 12,
  },
  detailedInfo: {
    padding: 16,
  },
  detailSection: {
    marginBottom: 20,
  },
  detailTitle: {
    fontSize: 16,
    fontWeight: '600' as const,
    marginBottom: 8,
  },
  detailText: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 4,
  },
  ratingSection: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    marginBottom: 4,
  },
  ratingStars: {
    fontSize: 18,
    marginRight: 8,
  },
  ratingValue: {
    fontSize: 16,
    fontWeight: '600' as const,
  },
  distanceText: {
    fontSize: 12,
    fontStyle: 'italic' as const,
    marginTop: 4,
  },
  cuisineTags: {
    flexDirection: 'row' as const,
    flexWrap: 'wrap' as const,
    marginTop: 4,
  },
  cuisineTag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  cuisineTagText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600' as const,
  },
  featureTags: {
    flexDirection: 'row' as const,
    flexWrap: 'wrap' as const,
    marginTop: 8,
  },
  featureTag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 6,
    marginBottom: 6,
  },
  featureTagText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '500' as const,
    textTransform: 'capitalize' as const,
  },
};

export default AnimatedCartCard;
