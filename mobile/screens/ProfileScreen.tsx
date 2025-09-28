import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import styles from './css/ProfileScreen.styles';
import { useTheme } from '../theme/ThemeContext';

const PINNED_TRUCKS = [
  { id: 't1', name: 'Ali Halal', cuisine: 'Pakistani', image: require('../assets/food-truck1.jpg'), rating: 4.8 },
  { id: 't2', name: 'Istanbul Wraps', cuisine: 'Turkish', image: require('../assets/food-truck2.jpg'), rating: 4.6 },
  { id: 't3', name: 'Cairo Grill', cuisine: 'Egyptian', image: require('../assets/food-truck3.jpg'), rating: 4.7 },
  { id: 't4', name: 'Karachi Bites', cuisine: 'Pakistani', image: require('../assets/food-truck4.jpg'), rating: 4.5 },
];

export default function ProfileScreen() {
  const { theme } = useTheme();

  const themeStyle = { backgroundColor: theme.background };

  const renderPinned = ({ item }: { item: any }) => (
    <View style={[styles.pinCard, { backgroundColor: theme.background, borderColor: theme.primary }]}>
      <Image source={item.image} style={styles.pinImage} />
      <View style={styles.pinInfo}>
        <Text style={[styles.pinName, { color: theme.text }]} numberOfLines={1}>{item.name}</Text>
        <Text style={[styles.pinCuisine, { color: theme.secondary }]}>{item.cuisine}</Text>
        <Text style={[styles.pinRating, { color: theme.text }]}>⭐ {item.rating}</Text>
      </View>
    </View>
  );

  return (
    <ScrollView style={[styles.container, themeStyle]} contentContainerStyle={styles.contentContainer}>
      {/* Header: avatar + name + edit button */}
      <View style={styles.headerRow}>
        <View style={styles.headerLeft}>
          <Image source={require('../assets/profile-icon.png')} style={styles.avatar} />
          <View style={styles.titleBlock}>
            <Text style={[styles.name, { color: theme.primary }]}>Abdulc123</Text>
            <Text style={[styles.handle, { color: theme.secondary }]}>Food Lover • Philadelphia</Text>
            <Text style={[styles.bio, { color: theme.text }]}>Reviews, saved trucks, and curated food lists. I track the best late-night halal carts around Temple.</Text>
          </View>
        </View>

        <View style={styles.headerRight}>
          <TouchableOpacity style={[styles.editButton, { borderColor: theme.primary }]}>
            <Text style={[styles.editButtonText, { color: theme.primary }]}>Edit profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.followButton, { backgroundColor: theme.primary }]}> 
            <Text style={[styles.followButtonText, { color: theme.background }]}>Follow</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Stats row */}
      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <Text style={[styles.statNumber, { color: theme.primary }]}>128</Text>
          <Text style={[styles.statLabel, { color: theme.text }]}>Saved Trucks</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={[styles.statNumber, { color: theme.primary }]}>54</Text>
          <Text style={[styles.statLabel, { color: theme.text }]}>Reviews</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={[styles.statNumber, { color: theme.primary }]}>1.2k</Text>
          <Text style={[styles.statLabel, { color: theme.text }]}>Followers</Text>
        </View>
      </View>

      {/* Pinned food trucks (GitHub pins analog) */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.primary }]}>Pinned Trucks</Text>
        <FlatList
          data={PINNED_TRUCKS}
          horizontal
          keyExtractor={(i) => i.id}
          renderItem={renderPinned}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.pinnedList}
        />
      </View>

      {/* Activity / recent reviews */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.primary }]}>Recent Reviews</Text>
        <View style={[styles.reviewCard, { backgroundColor: theme.background, borderColor: theme.primary }]}>
          <Text style={[styles.reviewTitle, { color: theme.text }]}>Excellent late-night shawarma</Text>
          <Text style={[styles.reviewBody, { color: theme.text }]}>Stopped by Karachi Bites after the game — quality and portion size were perfect. Staff were friendly.</Text>
          <Text style={[styles.reviewMeta, { color: theme.secondary }]}>Karachi Bites • 2 days ago</Text>
        </View>
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}
