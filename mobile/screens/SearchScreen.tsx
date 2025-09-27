import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';

export default function SearchScreen() {
  const [query, setQuery] = React.useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search</Text>
      <TextInput
        value={query}
        onChangeText={setQuery}
        placeholder="Search for trucks, cuisine, or location"
        style={styles.input}
      />
      <Text style={styles.body}>
        Results will show here. Wire this up to your API (for example using
        axios) to fetch search results.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 24, fontWeight: '600', textAlign: 'center' },
  input: {
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
  },
  body: { marginTop: 12, textAlign: 'center' },
});
