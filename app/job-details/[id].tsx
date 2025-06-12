/*import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Button,
  Alert,
} from 'react-native';
import {
  addBookmark,
  removeBookmark,
  isBookmarked,
} from '@/utils/bookmarkDB';

export default function JobDetailScreen() {
  const { job: jobParam } = useLocalSearchParams();
  const job = jobParam ? JSON.parse(jobParam as string) : null;

  const [bookmarking, setBookmarking] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    if (job?.id) {
      isBookmarked(Number(job.id)).then(status => {
        setBookmarked(status);
      });
    }
  }, [job]);

  const handleBookmark = async () => {
    if (!job) return;

    setBookmarking(true);
    try {
      if (bookmarked) {
        await removeBookmark(Number(job.id));
        Alert.alert('🔓 Removed from Bookmarks');
      } else {
        await addBookmark(job);
        Alert.alert('🔖 Saved to Bookmarks');
      }
      setBookmarked(!bookmarked);
    } catch (err) {
      Alert.alert('⚠️ Error updating bookmark');
    } finally {
      setBookmarking(false);
    }
  };

  if (!job) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>❌ Job not found.</Text>
      </View>
    );
  }

  const details = job.primary_details || {};
  const tags = job.job_tags || [];
  const contentBlocks = job.content ? JSON.parse(job.content) : {};

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{job.title}</Text>

      <Button
        title={bookmarked ? 'Remove Bookmark' : 'Bookmark this Job'}
        onPress={handleBookmark}
        disabled={bookmarking}
        color={bookmarked ? '#ef4444' : '#10b981'}
      />

      <View style={styles.infoBox}>
        <Text style={styles.label}>
          📍 Location: <Text style={styles.value}>{details.Place ?? 'N/A'}</Text>
        </Text>
        <Text style={styles.label}>
          💰 Salary: <Text style={styles.value}>{details.Salary ?? 'N/A'}</Text>
        </Text>
        <Text style={styles.label}>
          🕒 Job Type: <Text style={styles.value}>{details.Job_Type ?? 'N/A'}</Text>
        </Text>
        <Text style={styles.label}>
          🧠 Experience: <Text style={styles.value}>{details.Experience ?? 'N/A'}</Text>
        </Text>
        <Text style={styles.label}>
          🎓 Qualification:{' '}
          <Text style={styles.value}>{details.Qualification ?? 'N/A'}</Text>
        </Text>
      </View>

      {tags.length > 0 && (
        <View style={styles.tagsContainer}>
          {tags.map((tag, index) => (
            <Text
              key={index}
              style={[styles.tag, { backgroundColor: tag.bg_color, color: tag.text_color }]}
            >
              {tag.value}
            </Text>
          ))}
        </View>
      )}

      <View style={styles.contentSection}>
        <Text style={styles.sectionTitle}>📄 Description:</Text>
        {Object.values(contentBlocks).map((block: any, idx) => (
          <Text key={idx} style={styles.contentText}>
            {block}
          </Text>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  error: { fontSize: 18, color: 'red' },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#1e293b',
  },
  infoBox: {
    marginBottom: 20,
    backgroundColor: '#f1f5f9',
    padding: 12,
    borderRadius: 10,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#334155',
  },
  value: {
    fontWeight: 'normal',
    color: '#475569',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  tag: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
    fontSize: 12,
    fontWeight: '500',
  },
  contentSection: {
    marginTop: 10,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 6,
    color: '#0f172a',
  },
  contentText: {
    fontSize: 14,
    color: '#475569',
    marginBottom: 8,
  },
});
===================================================================
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Button,
  Alert,
} from 'react-native';
import {
  addBookmark,
  removeBookmark,
  isBookmarked,
} from '@/utils/bookmarkDB';

export default function JobDetailScreen() {
  const { job: jobParam } = useLocalSearchParams();
  const job = jobParam ? JSON.parse(jobParam as string) : null;

  const [bookmarking, setBookmarking] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    if (job?.id) {
      isBookmarked(Number(job.id)).then(setBookmarked);
    }
  }, [job]);

  const handleBookmark = async () => {
    if (!job) return;

    setBookmarking(true);
    try {
      if (bookmarked) {
        await removeBookmark(Number(job.id));
        Alert.alert('🔓 Removed from Bookmarks');
      } else {
        await addBookmark(job);
        Alert.alert('🔖 Saved to Bookmarks');
      }
      setBookmarked(!bookmarked);
    } catch (err) {
      console.error('Bookmark error:', err);
      Alert.alert('⚠️ Error updating bookmark');
    } finally {
      setBookmarking(false);
    }
  };

  if (!job) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>❌ Job not found.</Text>
      </View>
    );
  }

  const details = job.primary_details || {};
  const tags = job.job_tags || [];
  const contentBlocks = job.content ? JSON.parse(job.content) : {};

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{job.title}</Text>

      <Button
        title={bookmarked ? 'Remove Bookmark' : 'Bookmark this Job'}
        onPress={handleBookmark}
        disabled={bookmarking}
        color={bookmarked ? '#ef4444' : '#10b981'}
      />

      <View style={styles.infoBox}>
        <Text style={styles.label}>
          📍 Location: <Text style={styles.value}>{details.Place ?? 'N/A'}</Text>
        </Text>
        <Text style={styles.label}>
          💰 Salary: <Text style={styles.value}>{details.Salary ?? 'N/A'}</Text>
        </Text>
        <Text style={styles.label}>
          🕒 Job Type: <Text style={styles.value}>{details.Job_Type ?? 'N/A'}</Text>
        </Text>
        <Text style={styles.label}>
          🧠 Experience: <Text style={styles.value}>{details.Experience ?? 'N/A'}</Text>
        </Text>
        <Text style={styles.label}>
          🎓 Qualification:{' '}
          <Text style={styles.value}>{details.Qualification ?? 'N/A'}</Text>
        </Text>
      </View>

      {tags.length > 0 && (
        <View style={styles.tagsContainer}>
          {tags.map((tag, index) => (
            <Text
              key={index}
              style={[styles.tag, { backgroundColor: tag.bg_color, color: tag.text_color }]}
            >
              {tag.value}
            </Text>
          ))}
        </View>
      )}

      <View style={styles.contentSection}>
        <Text style={styles.sectionTitle}>📄 Description:</Text>
        {Object.values(contentBlocks).map((block: any, idx) => (
          <Text key={idx} style={styles.contentText}>
            {block}
          </Text>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  error: { fontSize: 18, color: 'red' },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#1e293b',
  },
  infoBox: {
    marginBottom: 20,
    backgroundColor: '#f1f5f9',
    padding: 12,
    borderRadius: 10,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#334155',
  },
  value: {
    fontWeight: 'normal',
    color: '#475569',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  tag: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
    fontSize: 12,
    fontWeight: '500',
  },
  contentSection: {
    marginTop: 10,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 6,
    color: '#0f172a',
  },
  contentText: {
    fontSize: 14,
    color: '#475569',
    marginBottom: 8,
  },
});
*//*
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Button, Alert } from 'react-native';
import { addBookmark, removeBookmark, isBookmarked } from '@/utils/bookmarkDB';

export default function JobDetailScreen() {
  const { job: jobParam } = useLocalSearchParams();
  const job = jobParam ? JSON.parse(jobParam as string) : null;

  const [bookmarking, setBookmarking] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    if (job?.id) {
      isBookmarked(Number(job.id)).then(setBookmarked);
    }
  }, [job]);
/* 
  const handleBookmark = async () => {
    if (!job) return;

    setBookmarking(true);
    try {
      if (bookmarked) {
        await removeBookmark(Number(job.id));
        Alert.alert('🔓 Removed from Bookmarks');
      } else {
        await addBookmark(job);
        Alert.alert('🔖 Saved to Bookmarks');
      }
      setBookmarked(!bookmarked);
    } catch (err) {
      console.error('Bookmark error:', err);
      Alert.alert('⚠️ Error updating bookmark');
    } finally {
      setBookmarking(false);
    }
  };

================================================
  const handleBookmark = async () => {
  if (!job) return;

  setBookmarking(true);

  try {
    if (bookmarked) {
      await removeBookmark(Number(job.id));
      Alert.alert('🔓 Removed from Bookmarks');
    } else {
      // ✅ Debug log for checking bookmark inputs
      console.log("🔍 Trying to bookmark job:", job);

      await addBookmark(job)
        .then(() => {
          console.log("✅ Job bookmarked");
          Alert.alert("Success", "Job bookmarked!");
        })
        .catch(err => {
          console.log("❌ Failed to bookmark job:", err);
          Alert.alert("Error", "Could not bookmark job");
        });

      setBookmarked(true);
    }
  } catch (err) {
    console.error('Bookmark error:', err);
    Alert.alert('⚠️ Error updating bookmark');
  } finally {
    setBookmarking(false);
  }
};



  if (!job) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>❌ Job not found.</Text>
      </View>
    );
  }

  const details = job.primary_details || {};
  const tags = job.job_tags || [];
  const contentBlocks = job.content ? JSON.parse(job.content) : {};

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{job.title}</Text>

      <Button
        title={bookmarked ? 'Remove Bookmark' : 'Bookmark this Job'}
        onPress={handleBookmark}
        disabled={bookmarking}
        color={bookmarked ? '#ef4444' : '#10b981'}
      />

      <View style={styles.infoBox}>
        <Text style={styles.label}>📍 Location: <Text style={styles.value}>{details.Place ?? 'N/A'}</Text></Text>
        <Text style={styles.label}>💰 Salary: <Text style={styles.value}>{details.Salary ?? 'N/A'}</Text></Text>
        <Text style={styles.label}>📞 Phone: <Text style={styles.value}>{details.Phone ?? 'N/A'}</Text></Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  error: { fontSize: 18, color: 'red' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16, color: '#1e293b' },
  infoBox: { marginBottom: 20, backgroundColor: '#f1f5f9', padding: 12, borderRadius: 10 },
  label: { fontWeight: 'bold', marginBottom: 6, color: '#334155' },
  value: { fontWeight: 'normal', color: '#475569' },
});
*/









/*
==================================================
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Button, Alert } from 'react-native';
import { addBookmark, removeBookmark, isBookmarked } from '@/utils/bookmarkDB';

export default function JobDetailScreen() {
  const { job: jobParam } = useLocalSearchParams();

  // ✅ Handle edge case safely
  let job: any = null;
  try {
    if (typeof jobParam === 'string') {
      job = JSON.parse(jobParam);
    }
  } catch (err) {
    console.warn('❌ Failed to parse jobParam:', err);
  }

  const [bookmarking, setBookmarking] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    if (job?.id) {
      isBookmarked(Number(job.id))
        .then(setBookmarked)
        .catch((err) => {
          console.log('❌ Error checking bookmark:', err);
        });
    }
  }, [job]);

  const handleBookmark = async () => {
    if (!job) return;

    setBookmarking(true);

    try {
      if (bookmarked) {
        await removeBookmark(Number(job.id));
        Alert.alert('🔓 Removed from Bookmarks');
        setBookmarked(false);
      } else {
        console.log("🔍 Trying to bookmark job:", job);
        await addBookmark(job);
        console.log("✅ Job bookmarked");
        Alert.alert("Success", "Job bookmarked!");
        setBookmarked(true);
      }
    } catch (err) {
      console.error('❌ Bookmark error:', err);
      Alert.alert('⚠️ Error updating bookmark');
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
  const tags = job.job_tags || [];

  let contentBlocks = {};
  try {
    if (job.content) {
      contentBlocks = JSON.parse(job.content);
    }
  } catch (err) {
    console.warn('⚠️ Failed to parse job.content:', err);
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{job.title}</Text>

      <Button
        title={bookmarked ? 'Remove Bookmark' : 'Bookmark this Job'}
        onPress={handleBookmark}
        disabled={bookmarking}
        color={bookmarked ? '#ef4444' : '#10b981'}
      />

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
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  error: { fontSize: 18, color: 'red' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16, color: '#1e293b' },
  infoBox: { marginBottom: 20, backgroundColor: '#f1f5f9', padding: 12, borderRadius: 10 },
  label: { fontWeight: 'bold', marginBottom: 6, color: '#334155' },
  value: { fontWeight: 'normal', color: '#475569' },
});
*/

import { addBookmark, isBookmarked, removeBookmark } from '@/utils/bookmarkDB';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, Button, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function JobDetailScreen() {
  const { job: jobParam } = useLocalSearchParams();

  // ✅ Handle edge case safely
  let job: any = null;
  try {
    if (typeof jobParam === 'string') {
      job = JSON.parse(jobParam);
    }
  } catch (err) {
    console.warn('❌ Failed to parse jobParam:', err);
  }

  const [bookmarking, setBookmarking] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    if (job?.id) {
      isBookmarked(Number(job.id))
        .then(setBookmarked)
        .catch((err) => {
          console.log('❌ Error checking bookmark:', err);
        });
    }
  }, [job]);

  const handleBookmark = async () => {
    if (!job) return;

    setBookmarking(true);

    try {
      if (bookmarked) {
        await removeBookmark(Number(job.id));
        Alert.alert('🔓 Removed from Bookmarks');
        setBookmarked(false);
      } else {
        console.log("🔍 Trying to bookmark job:", job);
        await addBookmark(job);
        console.log("✅ Job bookmarked");
        Alert.alert("Success", "Job bookmarked!");
        setBookmarked(true);
      }
    } catch (err) {
      console.error('❌ Bookmark error:', err);
      Alert.alert('⚠️ Error updating bookmark');
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
  const tags = job.job_tags || [];

  let contentBlocks = {};
  try {
    if (job.content) {
      contentBlocks = JSON.parse(job.content);
    }
  } catch (err) {
    console.warn('⚠️ Failed to parse job.content:', err);
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{job.title}</Text>

      <Button
        title={bookmarked ? 'Remove Bookmark' : 'Bookmark this Job'}
        onPress={handleBookmark}
        disabled={bookmarking}
        color={bookmarked ? '#ef4444' : '#10b981'}
      />

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
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  error: { fontSize: 18, color: 'red' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16, color: '#1e293b' },
  infoBox: { marginBottom: 20, backgroundColor: '#f1f5f9', padding: 12, borderRadius: 10 },
  label: { fontWeight: 'bold', marginBottom: 10, color: '#334155' },
  value: { fontWeight: 'normal', color: '#475569' },
});