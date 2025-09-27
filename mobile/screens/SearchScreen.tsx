import React from 'react';
import { View, Text, TextInput } from 'react-native';
import styles from './css/SearchScreen.styles';

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
