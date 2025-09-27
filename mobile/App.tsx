import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text } from 'react-native';
import { Provider as PaperProvider, BottomNavigation } from 'react-native-paper';
import { ThemeProvider } from './theme/ThemeContext';

import MapScreen from './screens/MapScreen';
import SearchScreen from './screens/SearchScreen';
import ProfileScreen from './screens/ProfileScreen';

export default function App() {
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

  return (
    // ThemeProvider makes the custom theme available to all children via useTheme()
    <ThemeProvider>
      <PaperProvider>
        <View style={styles.container}>
          <StatusBar style="auto" />
          <BottomNavigation
            navigationState={{ index, routes }}
            onIndexChange={setIndex}
            renderScene={renderScene}
          />
        </View>
      </PaperProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
