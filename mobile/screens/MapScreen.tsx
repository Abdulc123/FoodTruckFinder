import React from 'react';
import { View, Text } from 'react-native';
import styles from './css/MapScreen.styles';
import { useTheme } from '../theme/ThemeContext';
// If you want to use a real map, install and configure react-native-maps
// import MapView from 'react-native-maps';

export default function MapScreen() {
  const { theme } = useTheme();

  // Merge theme values into small inline overrides. This keeps the
  // layout styles in the shared styles file while applying colors at
  // render time based on the active theme.
  const themeStyle = {
    backgroundColor: theme.background,
  };

  return (
    <View style={[styles.container, themeStyle]}>
      <Text style={[styles.title, { color: theme.primary }]}>Map</Text>
      <Text style={[styles.body, { color: theme.text }]}> 
        This is the Map screen. Replace this placeholder with a MapView from
        react-native-maps and wire it up to your location and truck markers.
      </Text>
    </View>
  );
}
