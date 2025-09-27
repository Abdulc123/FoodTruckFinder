import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { ThemeProvider } from './theme/ThemeContext';

import NavigationBar from './screens/NavigationBar';

export default function App() {
  return (
    <ThemeProvider>
      <PaperProvider>
        <View style={styles.container}>
          <StatusBar style="auto" />
          {/* NavigationBar encapsulates the BottomNavigation state and scenes */}
          <NavigationBar />
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
