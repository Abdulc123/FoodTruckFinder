import React from 'react';
import { View, Text, Image } from 'react-native';
import styles from './css/ProfileScreen.styles';
import { useTheme } from '../theme/ThemeContext';

export default function ProfileScreen() {
  const { theme } = useTheme();

  const themeStyle = { backgroundColor: theme.background };
  return (
    <View style={[styles.container, themeStyle]}>
      <Image source={{ uri: 'https://placehold.co/100x100' }} style={styles.avatar} />
      <Text style={[styles.name, { color: theme.primary }]}>User Name</Text>
      <Text style={[styles.body, { color: theme.text }]}>Tap to edit your profile or view saved trucks.</Text>
    </View>
  );
}
