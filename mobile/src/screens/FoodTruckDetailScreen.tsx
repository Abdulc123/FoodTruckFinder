import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import { NavigationProps, FoodTruck, Review } from '../types';
import { mockReviews } from '../data/mockData';
import ReviewCard from '../components/ReviewCard';

const FoodTruckDetailScreen: React.FC<NavigationProps> = ({ navigation, route }) => {
  const { foodTruck } = route.params as { foodTruck: FoodTruck };
  const [reviews] = useState<Review[]>(mockReviews.filter(review => review.foodTruckId === foodTruck.id));
  const [isFavorite, setIsFavorite] = useState(false);

  const handleCheckIn = () => {
    Alert.alert(
      'Check In',
      `You've checked in at ${foodTruck.name}!`,
      [{ text: 'OK' }]
    );
  };

  const handleShare = () => {
    Alert.alert(
      'Share',
      `Share ${foodTruck.name} with your friends!`,
      [{ text: 'OK' }]
    );
  };

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const getCurrentDay = () => {
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    return days[new Date().getDay()];
  };

  const getCurrentHours = () => {
    const currentDay = getCurrentDay();
    return foodTruck.hours[currentDay];
  };

  const renderStars = (rating: number) => {
    return '⭐'.repeat(Math.floor(rating)) + (rating % 1 >= 0.5 ? '⭐' : '');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header Image */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: foodTruck.image }} style={styles.image} />
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Text style={styles.backText}>←</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.favoriteButton} onPress={handleFavorite}>
            <Text style={styles.favoriteText}>{isFavorite ? '❤️' : '🤍'}</Text>
          </TouchableOpacity>
        </View>

        {/* Content */}
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.titleContainer}>
              <Text style={styles.name}>{foodTruck.name}</Text>
              <Text style={styles.cuisine}>{foodTruck.cuisine}</Text>
            </View>
            <Text style={styles.priceRange}>{foodTruck.priceRange}</Text>
          </View>

          {/* Rating and Status */}
          <View style={styles.ratingContainer}>
            <View style={styles.ratingInfo}>
              <Text style={styles.rating}>{renderStars(foodTruck.rating)}</Text>
              <Text style={styles.ratingText}>{foodTruck.rating.toFixed(1)} ({foodTruck.reviewCount} reviews)</Text>
            </View>
            <View style={[styles.statusContainer, { backgroundColor: foodTruck.isOpen ? '#D5F4E6' : '#FADBD8' }]}>
              <Text style={[styles.statusText, { color: foodTruck.isOpen ? '#27AE60' : '#E74C3C' }]}>
                {foodTruck.isOpen ? 'Open' : 'Closed'}
              </Text>
            </View>
          </View>

          {/* Description */}
          <Text style={styles.description}>{foodTruck.description}</Text>

          {/* Hours */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Hours</Text>
            <View style={styles.hoursContainer}>
              {Object.entries(foodTruck.hours).map(([day, hours]) => (
                <View key={day} style={styles.hourRow}>
                  <Text style={[styles.day, day === getCurrentDay() && styles.currentDay]}>
                    {day.charAt(0).toUpperCase() + day.slice(1)}
                  </Text>
                  <Text style={[styles.hours, day === getCurrentDay() && styles.currentDay]}>
                    {hours.open} - {hours.close}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {/* Features */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Features</Text>
            <View style={styles.featuresContainer}>
              {foodTruck.features.map((feature, index) => (
                <View key={index} style={styles.featureTag}>
                  <Text style={styles.featureText}>{feature}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Reviews */}
          <View style={styles.section}>
            <View style={styles.reviewsHeader}>
              <Text style={styles.sectionTitle}>Reviews</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Reviews', { foodTruckId: foodTruck.id })}>
                <Text style={styles.seeAllText}>See All</Text>
              </TouchableOpacity>
            </View>
            {reviews.slice(0, 3).map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.checkInButton} onPress={handleCheckIn}>
          <Text style={styles.checkInText}>Check In</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
          <Text style={styles.shareText}>Share</Text>
        </TouchableOpacity>
      </View>
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
  imageContainer: {
    position: 'relative',
    height: 250,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  favoriteButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteText: {
    fontSize: 20,
  },
  content: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  titleContainer: {
    flex: 1,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 4,
  },
  cuisine: {
    fontSize: 16,
    color: '#7F8C8D',
  },
  priceRange: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#27AE60',
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  ratingInfo: {
    flex: 1,
  },
  rating: {
    fontSize: 18,
    marginBottom: 4,
  },
  ratingText: {
    fontSize: 14,
    color: '#7F8C8D',
  },
  statusContainer: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
  },
  description: {
    fontSize: 16,
    color: '#5D6D7E',
    lineHeight: 24,
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 12,
  },
  hoursContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
  },
  hourRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  day: {
    fontSize: 14,
    color: '#7F8C8D',
    fontWeight: '500',
  },
  currentDay: {
    color: '#3498DB',
    fontWeight: 'bold',
  },
  hours: {
    fontSize: 14,
    color: '#7F8C8D',
  },
  featuresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  featureTag: {
    backgroundColor: '#E8F4FD',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  featureText: {
    fontSize: 12,
    color: '#3498DB',
    fontWeight: '500',
  },
  reviewsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  seeAllText: {
    fontSize: 14,
    color: '#3498DB',
    fontWeight: '500',
  },
  actionButtons: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  checkInButton: {
    flex: 1,
    backgroundColor: '#3498DB',
    paddingVertical: 16,
    borderRadius: 8,
    marginRight: 8,
    alignItems: 'center',
  },
  checkInText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  shareButton: {
    flex: 1,
    backgroundColor: '#95A5A6',
    paddingVertical: 16,
    borderRadius: 8,
    marginLeft: 8,
    alignItems: 'center',
  },
  shareText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default FoodTruckDetailScreen;
