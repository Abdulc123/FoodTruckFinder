import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: { flex: 1 },
  contentContainer: { padding: 20, paddingTop: 100 },
  headerRow: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' },
  headerLeft: { flexDirection: 'row', alignItems: 'flex-start', flex: 1 },
  headerRight: { alignItems: 'flex-end', marginLeft: 12 },
  avatar: { width: 120, height: 120, borderRadius: 12, marginRight: 16 },
  titleBlock: { flex: 1 },
  name: { fontSize: 22, fontWeight: '700', marginBottom: 4 },
  handle: { fontSize: 14, fontWeight: '600', marginBottom: 6 },
  bio: { fontSize: 14, lineHeight: 20 },

  editButton: { borderWidth: 1, paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8, marginBottom: 8 },
  editButtonText: { fontSize: 14, fontWeight: '600' },
  followButton: { paddingHorizontal: 14, paddingVertical: 10, borderRadius: 8 },
  followButtonText: { fontSize: 14, fontWeight: '700' },

  statsRow: { flexDirection: 'row', marginTop: 18, marginBottom: 18, justifyContent: 'space-between' },
  statItem: { alignItems: 'center', flex: 1 },
  statNumber: { fontSize: 18, fontWeight: '700' },
  statLabel: { fontSize: 12, marginTop: 6 },

  section: { marginTop: 10 },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 12 },

  pinnedList: { paddingLeft: 2 },
  pinCard: { width: 220, borderWidth: 1, borderRadius: 10, overflow: 'hidden', marginRight: 12, flexDirection: 'row', alignItems: 'center' },
  pinImage: { width: 90, height: 90 },
  pinInfo: { padding: 10, flex: 1 },
  pinName: { fontSize: 14, fontWeight: '700' },
  pinCuisine: { fontSize: 12, marginTop: 4 },
  pinRating: { fontSize: 12, marginTop: 6 },

  reviewCard: { borderWidth: 1, borderRadius: 10, padding: 12, marginBottom: 12 },
  reviewTitle: { fontSize: 16, fontWeight: '700', marginBottom: 6 },
  reviewBody: { fontSize: 14, lineHeight: 20, marginBottom: 8 },
  reviewMeta: { fontSize: 12, color: '#666' },
});
