import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { FoodTruck } from '../types';

interface FoodTruckCardProps {
  foodTruck: FoodTruck;
  onPress: () => void;
  onClose: () => void;
}

const FoodTruckCard: React.FC<FoodTruckCardProps> = ({ foodTruck, onPress, onClose }) => {
  const getStatusColor = () => {
    return foodTruck.isOpen ? '#2ECC71' : '#E74C3C';
  };

  const getPriceRangeText = () => {
    return foodTruck.priceRange;
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.8}>
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <Text style={styles.closeText}>✕</Text>
      </TouchableOpacity>
      
      <View style={styles.imageContainer}>
        <Image source={{ uri: foodTruck.image }} style={styles.image} />
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor() }]}>
          <Text style={styles.statusText}>
            {foodTruck.isOpen ? 'Open' : 'Closed'}
          </Text>
        </View>
      </View>
      
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.name} numberOfLines={1}>
            {foodTruck.name}
          </Text>
          <Text style={styles.priceRange}>
            {getPriceRangeText()}
          </Text>
        </View>
        
        <Text style={styles.cuisine}>{foodTruck.cuisine}</Text>
        
        <View style={styles.ratingContainer}>
          <Text style={styles.rating}>⭐ {foodTruck.rating.toFixed(1)}</Text>
          <Text style={styles.reviewCount}>({foodTruck.reviewCount} reviews)</Text>
        </View>
        
        <Text style={styles.description} numberOfLines={2}>
          {foodTruck.description}
        </Text>
        
        <View style={styles.featuresContainer}>
          {foodTruck.features.slice(0, 3).map((feature, index) => (
            <View key={index} style={styles.featureTag}>
              <Text style={styles.featureText}>{feature}</Text>
            </View>
          ))}
        </View>
        
        {foodTruck.distance && (
          <Text style={styles.distance}>
            {foodTruck.distance < 1 
              ? `${(foodTruck.distance * 1000).toFixed(0)}m away`
              : `${foodTruck.distance.toFixed(1)}km away`
            }
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    overflow: 'hidden',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  closeText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  imageContainer: {
    position: 'relative',
    height: 120,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  statusBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    flex: 1,
    marginRight: 8,
  },
  priceRange: {
    fontSize: 16,
    fontWeight: '600',
    color: '#27AE60',
  },
  cuisine: {
    fontSize: 14,
    color: '#7F8C8D',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  rating: {
    fontSize: 14,
    color: '#F39C12',
    fontWeight: '600',
    marginRight: 8,
  },
  reviewCount: {
    fontSize: 12,
    color: '#7F8C8D',
  },
  description: {
    fontSize: 13,
    color: '#5D6D7E',
    lineHeight: 18,
    marginBottom: 12,
  },
  featuresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  featureTag: {
    backgroundColor: '#E8F4FD',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 6,
    marginBottom: 4,
  },
  featureText: {
    fontSize: 11,
    color: '#3498DB',
    fontWeight: '500',
  },
  distance: {
    fontSize: 12,
    color: '#7F8C8D',
    fontWeight: '500',
  },
});

export default FoodTruckCard;
