import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text } from 'react-native';
import { Provider as PaperProvider, BottomNavigation } from 'react-native-paper';
import { ThemeProvider } from './theme/ThemeContext';

import NavigationBar from './screens/NavigationBar';

export default function App() {
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
