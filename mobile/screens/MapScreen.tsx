import React from 'react';
import { View, Text } from 'react-native';
import styles from './css/MapScreen.styles';
// If you want to use a real map, install and configure react-native-maps
// import MapView from 'react-native-maps';

export default function MapScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Map</Text>
      <Text style={styles.body}>
        This is the Map screen. Replace this placeholder with a MapView from
        react-native-maps and wire it up to your location and truck markers.
      </Text>
    </View>
  );
}
