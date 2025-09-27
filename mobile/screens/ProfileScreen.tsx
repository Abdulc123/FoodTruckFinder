import React from 'react';
import { View, Text, Image } from 'react-native';
import styles from './css/ProfileScreen.styles';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://placehold.co/100x100' }}
        style={styles.avatar}
      />
      <Text style={styles.name}>User Name</Text>
      <Text style={styles.body}>Tap to edit your profile or view saved trucks.</Text>
    </View>
  );
}
