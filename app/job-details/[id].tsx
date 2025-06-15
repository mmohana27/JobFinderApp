import { addBookmark, isBookmarked, removeBookmark } from '@/utils/bookmark';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Button,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function JobDetailScreen() {
  const { job: jobParam } = useLocalSearchParams();
  const [bookmarking, setBookmarking] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  let job: any = null;
  try {
    if (typeof jobParam === 'string') {
      job = JSON.parse(jobParam);
    }
  } catch (err) {
    console.warn('❌ Failed to parse job param:', err);
  }

  useEffect(() => {
    if (job?.id) {
      isBookmarked(Number(job.id))
        .then(setBookmarked)
        .catch(err => {
          console.error('❌ Error checking bookmark:', err);
        });
    }
  }, [job]);

  const handleBookmark = async () => {
    if (!job) return;

    setBookmarking(true);
    try {
      if (bookmarked) {
        await removeBookmark(Number(job.id));
        if (Platform.OS !== 'web') {
          Alert.alert('🔓 Removed from Bookmarks');
        }
        setBookmarked(false);
      } else {
        await addBookmark(job);
        if (Platform.OS !== 'web') {
          Alert.alert('✅ Bookmarked successfully!');
        }
        setBookmarked(true);
      }
    } catch (err) {
      console.error('❌ Bookmark error:', err);
      if (Platform.OS !== 'web') {
        Alert.alert('⚠️ Bookmark failed');
      }
    } finally {
      setBookmarking(false);
    }
  };

  if (!job) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>❌ Job not found or invalid.</Text>
      </View>
    );
  }

  const details = job.primary_details || {};

  return (
    <LinearGradient
      colors={['#0f172a', '#1e3a8a']}
      style={styles.gradient}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.headerStrip} />

        <Text style={styles.title}>{job.title}</Text>

        <View style={styles.bookmarkBtn}>
          <Button
            title={bookmarked ? 'Remove Bookmark' : 'Bookmark This Job'}
            onPress={handleBookmark}
            disabled={bookmarking}
            color={bookmarked ? '#ef4444' : '#10b981'}
          />
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.label}>
            📍 Location: <Text style={styles.value}>{details.Place ?? 'N/A'}</Text>
          </Text>
          <Text style={styles.label}>
            💰 Salary: <Text style={styles.value}>{details.Salary ?? 'N/A'}</Text>
          </Text>
          <Text style={styles.label}>
            📞 Phone: <Text style={styles.value}>{details.Phone ?? 'N/A'}</Text>
          </Text>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  scrollContainer: {
    padding: 20,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0f172a',
  },
  error: {
    fontSize: 18,
    color: 'crimson',
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 40,
  },
  headerStrip: {
    height: 6,
    width: '100%',
    backgroundColor: '#9333ea',
    borderRadius: 3,
    marginBottom: 12,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 16,
    color: '#f8fafc',
    textAlign: 'center',
  },
  infoBox: {
    backgroundColor: '#e0f2fe', // Light blue
    padding: 20,
    borderRadius: 18,
    marginTop: 20,
    marginBottom: 24,
    shadowColor: '#0ea5e9',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 6,
    borderWidth: 1,
    borderColor: '#bae6fd',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    color: '#0c4a6e',
  },
  value: {
    fontWeight: '400',
    color: '#1e293b',
  },
  bookmarkBtn: {
    marginTop: 10,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 24,
  },
});
