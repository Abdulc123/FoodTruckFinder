import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 16 
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: { 
    fontSize: 28, 
    fontWeight: '700', 
    textAlign: 'center',
    marginBottom: 20,
  },
  searchContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  searchInput: {
    borderWidth: 2,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    paddingRight: 50,
  },
  searchIcon: {
    position: 'absolute',
    right: 16,
    top: 14,
    fontSize: 20,
  },
  resultsHeader: {
    marginBottom: 12,
  },
  resultsCount: {
    fontSize: 16,
    fontWeight: '500',
    opacity: 0.8,
  },
  loadingText: {
    fontSize: 18,
    textAlign: 'center',
  },
  listContainer: {
    paddingBottom: 20,
  },
  cartCard: {
    flexDirection: 'row',
    marginBottom: 16,
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cartImageContainer: {
    position: 'relative',
    width: 120,
    height: 100,
  },
  cartImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  ratingBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  ratingText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  cartInfo: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  cartName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    lineHeight: 20,
  },
  cartDetails: {
    flex: 1,
  },
  cartCuisine: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 6,
    opacity: 0.8,
  },
  cartMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  cartLocation: {
    fontSize: 13,
    fontWeight: '500',
  },
  cartPrice: {
    fontSize: 16,
  },
  cartTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 6,
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 6,
    marginBottom: 4,
  },
  tagText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '500',
  },
  paymentMethods: {
    marginTop: 4,
  },
  paymentText: {
    fontSize: 12,
    opacity: 0.7,
  },
});
