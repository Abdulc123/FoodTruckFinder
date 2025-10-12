import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
} from 'react-native';
import { NavigationProps, FoodTruck } from '../types';
import { mockFoodTrucks } from '../data/mockData';
import FoodTruckCard from '../components/FoodTruckCard';

const HomeScreen: React.FC<NavigationProps> = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTrucks, setFilteredTrucks] = useState<FoodTruck[]>(mockFoodTrucks);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setFilteredTrucks(mockFoodTrucks);
    } else {
      const filtered = mockFoodTrucks.filter(truck =>
        truck.name.toLowerCase().includes(query.toLowerCase()) ||
        truck.cuisine.toLowerCase().includes(query.toLowerCase()) ||
        truck.description.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredTrucks(filtered);
    }
  };

  const handleFoodTruckPress = (foodTruck: FoodTruck) => {
    navigation.navigate('FoodTruckDetail', { foodTruck });
  };

  const openTrucks = mockFoodTrucks.filter(truck => truck.isOpen);
  const nearbyTrucks = mockFoodTrucks.slice(0, 3);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Find Food Trucks</Text>
          <Text style={styles.subtitle}>Discover amazing food near you</Text>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search food trucks, cuisine, or location..."
            value={searchQuery}
            onChangeText={handleSearch}
            placeholderTextColor="#7F8C8D"
          />
        </View>

        {/* Quick Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{openTrucks.length}</Text>
            <Text style={styles.statLabel}>Open Now</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{mockFoodTrucks.length}</Text>
            <Text style={styles.statLabel}>Total Trucks</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>4.5</Text>
            <Text style={styles.statLabel}>Avg Rating</Text>
          </View>
        </View>

        {/* Open Now Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Open Now</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Map')}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
            {openTrucks.map((truck) => (
              <View key={truck.id} style={styles.cardWrapper}>
                <FoodTruckCard
                  foodTruck={truck}
                  onPress={() => handleFoodTruckPress(truck)}
                  onClose={() => {}}
                />
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Nearby Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Nearby</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Map')}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
            {nearbyTrucks.map((truck) => (
              <View key={truck.id} style={styles.cardWrapper}>
                <FoodTruckCard
                  foodTruck={truck}
                  onPress={() => handleFoodTruckPress(truck)}
                  onClose={() => {}}
                />
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Search Results */}
        {searchQuery.trim() !== '' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Search Results</Text>
            {filteredTrucks.map((truck) => (
              <View key={truck.id} style={styles.searchResultItem}>
                <FoodTruckCard
                  foodTruck={truck}
                  onPress={() => handleFoodTruckPress(truck)}
                  onClose={() => {}}
                />
              </View>
            ))}
            {filteredTrucks.length === 0 && (
              <Text style={styles.noResults}>No food trucks found matching your search.</Text>
            )}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#7F8C8D',
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  searchInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3498DB',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#7F8C8D',
    textAlign: 'center',
  },
  section: {
    marginBottom: 30,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  seeAllText: {
    fontSize: 14,
    color: '#3498DB',
    fontWeight: '500',
  },
  horizontalScroll: {
    paddingLeft: 20,
  },
  cardWrapper: {
    width: 280,
    marginRight: 16,
  },
  searchResultItem: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  noResults: {
    textAlign: 'center',
    color: '#7F8C8D',
    fontSize: 16,
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
});

export default HomeScreen;
