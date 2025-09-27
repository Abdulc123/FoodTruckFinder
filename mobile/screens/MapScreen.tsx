import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
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

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: '600' },
  body: { marginTop: 12, paddingHorizontal: 20, textAlign: 'center' },
});
