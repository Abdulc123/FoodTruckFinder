import React from 'react';
import { View, Text, TextInput } from 'react-native';
import styles from './css/SearchScreen.styles';
import { useTheme } from '../theme/ThemeContext';

export default function SearchScreen() {
  const [query, setQuery] = React.useState('');
  const { theme } = useTheme();

  const themeStyle = {
    backgroundColor: theme.background,
  };

  return (
    <View style={[styles.container, themeStyle]}>
      <Text style={[styles.title, { color: theme.primary }]}>Search</Text>
      <TextInput
        value={query}
        onChangeText={setQuery}
        placeholder="Search for trucks, cuisine, or location"
        style={[styles.input, { borderColor: theme.primary, color: theme.text }]}
        placeholderTextColor={theme.text}
      />
      <Text style={[styles.body, { color: theme.text }]}> 
        Results will show here. Wire this up to your API (for example using
        axios) to fetch search results.
      </Text>
    </View>
  );
}
