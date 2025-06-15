
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { getBookmarks, removeBookmark } from '@/utils/bookmarkDB';

export default function BookmarksScreen() {
  const [bookmarks, setBookmarks] = useState([]);

  const loadBookmarks = async () => {
    const saved = await getBookmarks();
    setBookmarks(saved);
  };

  const handleRemove = async (id) => {
    Alert.alert(
      'Remove Bookmark',
      'Are you sure you want to remove this job from your bookmarks?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: async () => {
            await removeBookmark(id);
            await loadBookmarks(); 
          },
        },
      ]
    );
  };

  useEffect(() => {
    loadBookmarks();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.title || 'No Title'}</Text>
      <Text style={styles.subtitle}>📍 {item.primary_details?.Place ?? 'Unknown'}</Text>
      <Text style={styles.salary}>💰 {item.primary_details?.Salary ?? 'Not Specified'}</Text>

      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => handleRemove(item.id)}
      >
        <Text style={styles.removeButtonText}>🗑️ Remove Bookmark</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {bookmarks.length === 0 ? (
        <Text style={styles.emptyText}>No bookmarked jobs found.</Text>
      ) : (
        <FlatList
          data={bookmarks}
          keyExtractor={(item) => item.id?.toString()}
          renderItem={renderItem}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
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
  removeButton: {
    marginTop: 12,
    paddingVertical: 8,
    backgroundColor: '#ef4444',
    borderRadius: 8,
    alignItems: 'center',
  },
  removeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  emptyText: {
    marginTop: 40,
    textAlign: 'center',
    fontSize: 16,
    color: '#94a3b8',
  },
});
