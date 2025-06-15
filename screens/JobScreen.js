
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet, Alert } from 'react-native';
import { getBookmarks, removeBookmark } from '@/utils/bookmark';

export default function BookmarksScreen() {
  const [bookmarks, setBookmarks] = useState<any[]>([]);


  const fetchBookmarks = async () => {
    const data = await getBookmarks();
    setBookmarks(data);
  };

  useEffect(() => {
    fetchBookmarks();
  }, []);

  const handleRemove = async (id: string) => {
    await removeBookmark(id);
    fetchBookmarks(); 
  };

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.title}</Text>
      <Text>📍 {item.primary_details?.Place ?? 'Unknown'}</Text>
      <Text>💰 {item.primary_details?.Salary ?? 'Not Specified'}</Text>
      <Button
        title="Remove Bookmark"
        color="red"
        onPress={() =>
          Alert.alert(
            'Confirm',
            'Are you sure you want to remove this bookmark?',
            [
              { text: 'Cancel', style: 'cancel' },
              { text: 'Remove', style: 'destructive', onPress: () => handleRemove(item.id) },
            ]
          )
        }
      />
    </View>
  );

  return (
    <View style={styles.container}>
      {bookmarks.length === 0 ? (
        <Text>No bookmarks found.</Text>
      ) : (
        <FlatList
          data={bookmarks}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    backgroundColor: '#f1f5f9',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
});
