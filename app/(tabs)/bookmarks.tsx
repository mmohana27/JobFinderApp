
import { getBookmarks, removeBookmark } from '@/utils/bookmark';
import { LinearGradient } from 'expo-linear-gradient';
import { useFocusEffect } from 'expo-router';
import React, { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function BookmarksScreen() {
  const [bookmarks, setBookmarks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBookmarks = async () => {
    try {
      setLoading(true);
      const data = await getBookmarks();
      setBookmarks(data);
    } catch (err) {
      console.error('❌ Error loading bookmarks:', err);
      Alert.alert('Error', 'Could not load bookmarks');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (jobId: number) => {
    try {
      await removeBookmark(jobId);
      await fetchBookmarks();
      Alert.alert('🗑️ Removed', 'Job removed from bookmarks');
    } catch (error) {
      console.error('❌ Error removing bookmark:', error);
      Alert.alert('Error', 'Could not remove bookmark');
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchBookmarks();
    }, [])
  );

  if (loading) {
    return (
      <LinearGradient colors={['#6a11cb', '#2575fc']} style={styles.fullscreen}>
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#ffffff" />
          <Text style={styles.loadingText}>Loading Bookmarks...</Text>
        </View>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={['#6a11cb', '#2575fc']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.heading}>🔖 Saved Bookmarked Jobs</Text>

        {bookmarks.length === 0 ? (
          <Text style={styles.noData}>No bookmarks yet 😔</Text>
        ) : (
          bookmarks.map((job, index) => (
            <View key={index} style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.title}>💼 {job.title}</Text>
                <Pressable onPress={() => handleDelete(job.id)}>
                  <Text style={styles.deleteIcon}>🗑️</Text>
                </Pressable>
              </View>

              <LinearGradient colors={['#d0f0fd', '#a6e3f4']} style={styles.badge}>
                <Text style={styles.badgeText}>📍 {job.primary_details?.Place ?? 'N/A'}</Text>
              </LinearGradient>

              <LinearGradient colors={['#d0f0fd', '#a6e3f4']} style={styles.badge}>
                <Text style={styles.badgeText}>💰 {job.primary_details?.Salary ?? 'N/A'}</Text>
              </LinearGradient>

              <LinearGradient colors={['#d0f0fd', '#a6e3f4']} style={styles.badge}>
                <Text style={styles.badgeText}>
                  📞 {job.primary_details?.Phone ?? 'No contact provided'}
                </Text>
              </LinearGradient>
            </View>
          ))
        )}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  fullscreen: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#ffffff',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#e6e6fa', // lavender
    padding: 16,
    borderRadius: 16,
    marginBottom: 20,
    elevation: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4b0082',
    flex: 1,
    paddingRight: 12,
  },
  deleteIcon: {
    fontSize: 20,
    color: '#8b0000',
  },
  badge: {
    borderRadius: 12,
    paddingVertical: 6,
    paddingHorizontal: 10,
    marginVertical: 4,
  },
  badgeText: {
    fontSize: 14,
    color: '#1e3a5f',
    fontWeight: '500',
  },
  noData: {
    textAlign: 'center',
    fontSize: 16,
    color: '#e0e7ff',
    marginTop: 60,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#ffffff',
  },
});

