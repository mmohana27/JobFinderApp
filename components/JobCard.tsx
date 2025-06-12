/*import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

const JobCard = ({ job }: { job: any }) => {
  const router = useRouter();

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push({
        pathname: '/job-details/[id]',
        params: { job: JSON.stringify(job) }
      })}
    >
      <Text style={styles.title}>{job.title}</Text>
      <Text style={styles.subtitle}>📍 {job.primary_details?.Place ?? 'Unknown'}</Text>
      <Text style={styles.salary}>💰 {job.primary_details?.Salary ?? 'Not Specified'}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f8fafc',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 4,
  },
  subtitle: {
    color: '#475569',
  },
  salary: {
    marginTop: 4,
    color: '#059669',
  },
});

export default JobCard;
*/
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

const JobCard = ({ job }: { job: any }) => {
  const router = useRouter();

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        router.push({
          pathname: '/job-details/[id]',
          params: { job: JSON.stringify(job) },
        })
      }
    >
      <Text style={styles.title}>{job.title}</Text>
      <Text style={styles.subtitle}>📍 {job.primary_details?.Place ?? 'Unknown'}</Text>
      <Text style={styles.salary}>💰 {job.primary_details?.Salary ?? 'Not Specified'}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f8fafc',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  title: { fontSize: 16, fontWeight: 'bold', color: '#1e293b', marginBottom: 4 },
  subtitle: { color: '#475569' },
  salary: { marginTop: 4, color: '#059669' },
});

export default JobCard;
