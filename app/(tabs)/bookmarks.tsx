
import { getBookmarks, initDB } from '@/utils/bookmarkDB.ts';
import { useFocusEffect } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function BookmarksScreen() {
  const [bookmarks, setBookmarks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ Initialize DB only once when the component mounts
  useEffect(() => {
    try {
      initDB(); // Should not be called on Web — assumed safe due to platform check in initDB()
    } catch (err) {
      console.error('❌ Error initializing DB:', err);
      Alert.alert('Database Error', 'Failed to initialize bookmarks database.');
    }
  }, []);

  // ✅ Fetch bookmarks when the screen/tab regains focus
  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const fetchBookmarks = async () => {
        try {
          setLoading(true);
          const data = await getBookmarks();
          if (isActive) {
            setBookmarks(data);
          }
        } catch (err) {
          console.error('❌ Error loading bookmarks:', err);
          Alert.alert('Error', 'Could not load bookmarks');
        } finally {
          if (isActive) {
            setLoading(false);
          }
        }
      };

      fetchBookmarks();

      // ✅ Cleanup to prevent state update if unmounted
      return () => {
        isActive = false;
      };
    }, [])
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0f172a" />
        <Text>Loading Bookmarks...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>🔖 Saved Bookmarked Jobs</Text>
      {bookmarks.length === 0 ? (
        <Text style={styles.noData}>No bookmarks yet 😔</Text>
      ) : (
        bookmarks.map((job, index) => {
          let jobData: any;

          try {
            jobData = job.job_json ? JSON.parse(job.job_json) : job;
          } catch (e) {
            console.error('❌ Failed to parse bookmark JSON:', e);
            return null;
          }

          return (
            <View key={index} style={styles.card}>
              <Text style={styles.title}>{jobData.title}</Text>
              <Text>📍 {jobData.primary_details?.Place ?? 'N/A'}</Text>
              <Text>💰 {jobData.primary_details?.Salary ?? 'N/A'}</Text>
              <Text>📞 {jobData.primary_details?.Phone ?? 'No contact provided'}</Text>
            </View>
          );
        })
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 50,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#1e293b',
  },
  card: {
    backgroundColor: '#f8fafc',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    elevation: 2,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
    color: '#0f172a',
  },
  noData: {
    textAlign: 'center',
    fontSize: 16,
    color: '#64748b',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});