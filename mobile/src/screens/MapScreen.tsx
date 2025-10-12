import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { NavigationProps, FoodTruck } from '../types';
import CustomMapView from '../components/MapView';
import FoodTruckCard from '../components/FoodTruckCard';

const MapScreen: React.FC<NavigationProps> = ({ navigation }) => {
  const [selectedFoodTruck, setSelectedFoodTruck] = useState<FoodTruck | null>(null);

  const handleFoodTruckSelect = (foodTruck: FoodTruck) => {
    setSelectedFoodTruck(foodTruck);
  };

  const handleFoodTruckPress = (foodTruck: FoodTruck) => {
    navigation.navigate('FoodTruckDetail', { foodTruck });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mapContainer}>
        <CustomMapView
          onFoodTruckSelect={handleFoodTruckSelect}
          selectedFoodTruck={selectedFoodTruck}
        />
      </View>
      {selectedFoodTruck && (
        <View style={styles.cardContainer}>
          <FoodTruckCard
            foodTruck={selectedFoodTruck}
            onPress={() => handleFoodTruckPress(selectedFoodTruck)}
            onClose={() => setSelectedFoodTruck(null)}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  mapContainer: {
    flex: 1,
  },
  cardContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
});

export default MapScreen;
