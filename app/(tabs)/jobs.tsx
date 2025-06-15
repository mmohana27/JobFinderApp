
import axios from 'axios';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

type Job = {
  id: number;
  title: string;
  primary_details: {
    Place?: string;
    Salary?: string;
    Phone?: string;
    Job_Type?: string;
    Experience?: string;
    Qualification?: string;
  };
};

export default function JobsScreen() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const router = useRouter();

  const fetchJobs = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const response = await axios.get(
        `https://testapi.getlokalapp.com/common/jobs?page=${page}`
      );
      const newJobs: Job[] = response.data?.results ?? [];
      if (newJobs.length === 0) setHasMore(false);
      setJobs(prev => [...prev, ...newJobs]);
      setPage(prev => prev + 1);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const renderItem = ({ item }: { item: Job }) => (
    <Pressable
      onPress={() =>
        router.push({
          pathname: `/job-details/${item.id}`,
          params: { job: JSON.stringify(item) },
        })
      }
      style={({ pressed }) => [styles.cardWrapper, pressed && styles.pressed]}
    >
      <BlurView intensity={60} tint="light" style={styles.card}>
        <Text style={styles.title}>💼 {item.title}</Text>

        <View style={styles.detailRow}>
          <LinearGradient colors={['#3b82f6', '#06b6d4']} style={styles.badge}>
            <Text style={styles.badgeText}>📍 {item.primary_details?.Place ?? 'Unknown'}</Text>
          </LinearGradient>
          <LinearGradient colors={['#10b981', '#3b82f6']} style={styles.badge}>
            <Text style={styles.badgeText}>💰 {item.primary_details?.Salary ?? 'N/A'}</Text>
          </LinearGradient>
        </View>

        <Text style={styles.phone}>
          📞 {item.primary_details?.Phone ?? 'No contact provided'}
        </Text>
      </BlurView>
    </Pressable>
  );

  return (
    <LinearGradient
      colors={['#0f172a', '#1e293b']}
      style={styles.background}
    >
      <FlatList
        data={jobs}
        renderItem={renderItem}
        keyExtractor={(item, index) => (item?.id ? item.id.toString() : `job-${index}`)}
        onEndReached={fetchJobs}
        onEndReachedThreshold={0.4}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={loading ? (
          <ActivityIndicator size="large" color="#facc15" />
        ) : null}
        ListEmptyComponent={
          !loading && (
            <Text style={styles.emptyText}>
              🚫 No jobs available at the moment.
            </Text>
          )
        }
        contentContainerStyle={styles.listContainer}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  listContainer: {
    padding: 16,
  },
  cardWrapper: {
    marginBottom: 18,
    borderRadius: 16,
    overflow: 'hidden',
  },
  card: {
    padding: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  pressed: {
    opacity: 0.85,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#f8fafc',
    marginBottom: 10,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  badge: {
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  badgeText: {
    fontSize: 14,
    color: '#ffffff',
    fontWeight: '600',
  },
  phone: {
    marginTop: 6,
    fontSize: 14,
    color: '#e2e8f0',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
    color: '#94a3b8',
  },
});
