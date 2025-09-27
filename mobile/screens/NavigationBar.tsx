import React from 'react';
import { View, StyleSheet } from 'react-native';
import { BottomNavigation } from 'react-native-paper';
import { useTheme } from '../theme/ThemeContext';

import MapScreen from './MapScreen';
import SearchScreen from './SearchScreen';
import ProfileScreen from './ProfileScreen';
import TabIcon from '../components/TabIcon';

export default function NavigationBar() {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'map', title: 'Map', icon: 'map' },
    { key: 'search', title: 'Search', icon: 'magnify' },
    { key: 'profile', title: 'Profile', icon: 'account' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    map: MapScreen,
    search: SearchScreen,
    profile: ProfileScreen,
  });

  // Custom icon renderer
  const renderIcon = ({ route, focused, color }: any) => {
    return <TabIcon iconName={route.icon} focused={focused} color={color} />;
  };

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
        renderIcon={renderIcon}
        // Apply universal color design values from the theme
        barStyle={{ backgroundColor: theme.primary }}
        activeColor="#FFFFFF"
        inactiveColor="rgba(255,255,255,0.6)"
        activeIndicatorStyle={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
        style={{ backgroundColor: theme.primary }}
        theme={{
          colors: {
            primary: '#FFFFFF',
            onSurface: '#FFFFFF',
            onSurfaceVariant: 'rgba(255,255,255,0.6)',
          },
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
