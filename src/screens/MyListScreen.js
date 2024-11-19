import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import {getMyList} from '../services/api'; // Assuming this is your API call

const MyListScreen = () => {
  const [myList, setMyList] = useState({ watched: [], toWatch: [] });
  const [error, setError] = useState(null);

  useEffect(() => {
    getMyList()
      .then((response) => {
        console.log('API Response:', response.data);
        if (response && response.data) {
          const myListData = response.data; // Response data structure
          const watched = Array.isArray(myListData["Watched"]) ? myListData["Watched"] : [];
          const toWatch = Array.isArray(myListData["To Watch"]) ? myListData["To Watch"] : [];
          
          setMyList({ watched, toWatch });
        } else {
          throw new Error('Invalid API response format');
        }
      })
      .catch((err) => {
        console.error('Error fetching my list:', err);
        setError(err.message || 'Something went wrong');
        setMyList({ watched: [], toWatch: [] });
      });
  }, []);

  return (
    <View style={styles.container}>
      {error && <Text style={styles.error}>Error: {error}</Text>}

      <Text style={styles.subtitle}>Watched</Text>
      <FlatList
        data={myList.watched}
        keyExtractor={(item, index) => `watched-${index}`}
        renderItem={({ item }) => <Text style={styles.item}>{item.title}</Text>}
      />

      <Text style={styles.subtitle}>To Watch</Text>
      <FlatList
        data={myList.toWatch}
        keyExtractor={(item, index) => `toWatch-${index}`}
        renderItem={({ item }) => <Text style={styles.item}>{item.title}</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  subtitle: { fontSize: 20,fontWeight:'bold', marginTop: 16, marginBottom: 8 },
  item: { fontSize: 16, padding: 8, borderBottomWidth: 1, borderBottomColor: '#ccc' },
  error: { color: 'red', marginBottom: 16 },
});

export default MyListScreen;
