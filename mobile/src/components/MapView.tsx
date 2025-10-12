import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import { FoodTruck } from '../types';
import { mockFoodTrucks } from '../data/mockData';
import FoodTruckMarker from './FoodTruckMarker';

interface MapViewProps {
  onFoodTruckSelect: (foodTruck: FoodTruck) => void;
  selectedFoodTruck?: FoodTruck;
}

const CustomMapView: React.FC<MapViewProps> = ({ onFoodTruckSelect, selectedFoodTruck }) => {
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [foodTrucks, setFoodTrucks] = useState<FoodTruck[]>(mockFoodTrucks);

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        console.log(error.code, error.message);
        Alert.alert('Location Error', 'Unable to get your current location');
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;
    return distance;
  };

  const updateDistances = () => {
    if (userLocation) {
      const trucksWithDistance = foodTrucks.map(truck => ({
        ...truck,
        distance: calculateDistance(
          userLocation.latitude,
          userLocation.longitude,
          truck.location.latitude,
          truck.location.longitude
        )
      }));
      setFoodTrucks(trucksWithDistance);
    }
  };

  useEffect(() => {
    updateDistances();
  }, [userLocation]);

  const handleMarkerPress = (foodTruck: FoodTruck) => {
    onFoodTruckSelect(foodTruck);
  };

  const getMapRegion = () => {
    if (selectedFoodTruck) {
      return {
        latitude: selectedFoodTruck.location.latitude,
        longitude: selectedFoodTruck.location.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };
    }

    if (userLocation) {
      return {
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      };
    }

    // Default to San Francisco
    return {
      latitude: 37.7749,
      longitude: -122.4194,
      latitudeDelta: 0.1,
      longitudeDelta: 0.1,
    };
  };

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={getMapRegion()}
        showsUserLocation={true}
        showsMyLocationButton={true}
        showsCompass={true}
        showsScale={true}
      >
        {userLocation && (
          <Marker
            coordinate={userLocation}
            title="Your Location"
            pinColor="blue"
          />
        )}
        
        {foodTrucks.map((truck) => (
          <FoodTruckMarker
            key={truck.id}
            foodTruck={truck}
            onPress={() => handleMarkerPress(truck)}
            isSelected={selectedFoodTruck?.id === truck.id}
          />
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default CustomMapView;
