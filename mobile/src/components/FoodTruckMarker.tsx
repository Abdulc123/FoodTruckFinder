import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FoodTruck } from '../types';

interface FoodTruckMarkerProps {
  foodTruck: FoodTruck;
  onPress: () => void;
  isSelected: boolean;
}

const FoodTruckMarker: React.FC<FoodTruckMarkerProps> = ({ foodTruck, onPress, isSelected }) => {
  const getMarkerColor = () => {
    if (isSelected) return '#FF6B6B';
    if (foodTruck.isOpen) return '#4ECDC4';
    return '#95A5A6';
  };

  const getMarkerIcon = () => {
    if (isSelected) return '📍';
    if (foodTruck.isOpen) return '🚚';
    return '🚚';
  };

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={[styles.marker, { backgroundColor: getMarkerColor() }]}>
        <Text style={styles.icon}>{getMarkerIcon()}</Text>
      </View>
      <View style={[styles.callout, isSelected && styles.selectedCallout]}>
        <Text style={styles.name} numberOfLines={1}>
          {foodTruck.name}
        </Text>
        <Text style={styles.cuisine} numberOfLines={1}>
          {foodTruck.cuisine}
        </Text>
        <View style={styles.ratingContainer}>
          <Text style={styles.rating}>⭐ {foodTruck.rating.toFixed(1)}</Text>
          {foodTruck.distance && (
            <Text style={styles.distance}>
              {foodTruck.distance < 1 
                ? `${(foodTruck.distance * 1000).toFixed(0)}m`
                : `${foodTruck.distance.toFixed(1)}km`
              }
            </Text>
          )}
        </View>
        <View style={styles.statusContainer}>
          <View style={[
            styles.statusDot, 
            { backgroundColor: foodTruck.isOpen ? '#2ECC71' : '#E74C3C' }
          ]} />
          <Text style={styles.status}>
            {foodTruck.isOpen ? 'Open' : 'Closed'}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  marker: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  icon: {
    fontSize: 20,
  },
  callout: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 8,
    minWidth: 120,
    maxWidth: 200,
    marginTop: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  selectedCallout: {
    backgroundColor: '#FFF3CD',
    borderColor: '#FF6B6B',
    borderWidth: 2,
  },
  name: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 2,
  },
  cuisine: {
    fontSize: 12,
    color: '#7F8C8D',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  rating: {
    fontSize: 12,
    color: '#F39C12',
    fontWeight: '600',
  },
  distance: {
    fontSize: 11,
    color: '#7F8C8D',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 4,
  },
  status: {
    fontSize: 11,
    color: '#7F8C8D',
    fontWeight: '500',
  },
});

export default FoodTruckMarker;
