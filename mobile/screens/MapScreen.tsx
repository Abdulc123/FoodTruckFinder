import React from 'react';
import { View, Text, Image } from 'react-native';
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

      {/* Large centered image from assets */}
      <Image
        source={require('../assets/map-page.png')}
        style={styles.centerImage}
        resizeMode="contain"
      />

    </View>
  );
}
