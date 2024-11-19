// src/components/MovieCard.js
import React from 'react';
import { TouchableOpacity, Image, Text, View, StyleSheet } from 'react-native';

const MovieCard = ({ movie, onPress, isGrid }) => (
  <TouchableOpacity style={[styles.card, isGrid && styles.gridCard]} onPress={onPress}>
    <Image source={{ uri: movie.poster_url }} style={[styles.image, isGrid && styles.gridImage]} />
    <View style={styles.details}>
      <Text style={styles.title}>{movie.title}</Text>
      <Text style={styles.type}>{movie.type}</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: { flexDirection: 'row', padding: 10, margin: 8, backgroundColor: '#fff', borderRadius: 8 },
  gridCard: { flexDirection: 'column', alignItems: 'center', width: '48%' },
  image: { width: 80, height: 120, borderRadius: 8 },
  gridImage: { width: '100%', height: 150 },
  details: { marginLeft: 10, justifyContent: 'center', flex: 1 },
  title: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  type: { fontSize: 14, color: '#666' },
});

export default MovieCard;
