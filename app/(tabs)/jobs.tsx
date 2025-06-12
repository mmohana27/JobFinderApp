/*import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  Pressable,
  Platform,
} from 'react-native';
import axios from 'axios';
import { useRouter } from 'expo-router';

type Job = {
  id: number;
  title: string;
  primary_details: {
    Place?: string;
    Salary?: string;
    Phone?: string;
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
      onPress={() => router.push(`/job-details/${item.id}`)}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      <Text style={styles.title}>{item.title}</Text>

      <View style={styles.detailRow}>
        <Text style={styles.badge}>📍 {item.primary_details?.Place ?? 'Unknown'}</Text>
        <Text style={styles.badge}>💰 {item.primary_details?.Salary ?? 'N/A'}</Text>
      </View>

      <Text style={styles.phone}>
        📞 {item.primary_details?.Phone ?? 'No contact provided'}
      </Text>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={jobs}
        renderItem={renderItem}
        keyExtractor={(item, index) => (item?.id ? item.id.toString() : `job-${index}`)}
        onEndReached={fetchJobs}
        onEndReachedThreshold={0.4}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={loading ? <ActivityIndicator size="large" color="#007AFF" /> : null}
        ListEmptyComponent={
          !loading && (
            <Text style={styles.emptyText}>
              🚫 No jobs available at the moment.
            </Text>
          )
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },

  card: {
    backgroundColor: '#f0f4f8',
    padding: 18,
    borderRadius: 16,
    marginBottom: 14,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.15,
        shadowRadius: 6,
      },
      android: {
        elevation: 4,
      },
    }),
  },

  pressed: {
    opacity: 0.8,
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 8,
  },

  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },

  badge: {
    backgroundColor: '#e2e8f0',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
    fontSize: 14,
    color: '#334155',
  },

  phone: {
    fontSize: 14,
    marginTop: 6,
    color: '#475569',
  },

  emptyText: {
    textAlign: 'center',
    marginTop: 24,
    fontSize: 16,
    color: '#888',
  },
});
*/
// app/jobs.tsx

import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  Pressable,
  Platform,
} from 'react-native';
import axios from 'axios';
import { useRouter } from 'expo-router';

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
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      <Text style={styles.title}>{item.title}</Text>

      <View style={styles.detailRow}>
        <Text style={styles.badge}>📍 {item.primary_details?.Place ?? 'Unknown'}</Text>
        <Text style={styles.badge}>💰 {item.primary_details?.Salary ?? 'N/A'}</Text>
      </View>

      <Text style={styles.phone}>
        📞 {item.primary_details?.Phone ?? 'No contact provided'}
      </Text>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={jobs}
        renderItem={renderItem}
        keyExtractor={(item, index) => (item?.id ? item.id.toString() : `job-${index}`)}
        onEndReached={fetchJobs}
        onEndReachedThreshold={0.4}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={loading ? <ActivityIndicator size="large" color="#007AFF" /> : null}
        ListEmptyComponent={
          !loading && (
            <Text style={styles.emptyText}>
              🚫 No jobs available at the moment.
            </Text>
          )
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  card: {
    backgroundColor: '#f0f4f8',
    padding: 18,
    borderRadius: 16,
    marginBottom: 14,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.15,
        shadowRadius: 6,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  pressed: { opacity: 0.8 },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 8,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  badge: {
    backgroundColor: '#e2e8f0',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
    fontSize: 14,
    color: '#334155',
  },
  phone: {
    fontSize: 14,
    marginTop: 6,
    color: '#475569',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 24,
    fontSize: 16,
    color: '#888',
  },
}); 