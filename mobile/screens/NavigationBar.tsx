import React from 'react';
import { View, StyleSheet } from 'react-native';
import { BottomNavigation } from 'react-native-paper';
import { useTheme } from '../theme/ThemeContext';

import MapScreen from './MapScreen';
import SearchScreen from './SearchScreen';
import ProfileScreen from './ProfileScreen';

export default function NavigationBar() {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'map', title: 'Map' },
    { key: 'search', title: 'Search' },
    { key: 'profile', title: 'Profile' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    map: MapScreen,
    search: SearchScreen,
    profile: ProfileScreen,
  });

  // read current theme from ThemeProvider
  const { theme } = useTheme();

  // quick debug output to ensure this component renders at runtime
  // (check Metro logs or console output in your device/emulator)
  console.log('NavigationBar render, index =', index, 'theme=', theme.primary);

  return (
    <View style={styles.container}>
      <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
        // Apply universal color design values from the theme
        barStyle={{ backgroundColor: theme.primary }}
        activeColor={theme.secondary}
        inactiveColor={theme.heading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
