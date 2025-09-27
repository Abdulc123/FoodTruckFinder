import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

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

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  avatar: { width: 100, height: 100, borderRadius: 50, marginBottom: 12 },
  name: { fontSize: 20, fontWeight: '600' },
  body: { marginTop: 8, color: '#666' },
});
