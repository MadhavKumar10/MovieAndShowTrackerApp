import React, { useState, useEffect } from 'react';
import { View, Text, Button, ActivityIndicator, StyleSheet } from 'react-native';
import { getMovieDetails, addToWatchList } from '../services/api';

const MovieDetailsScreen = ({ route, navigation }) => {
  const { movieId } = route.params || {}; // Get movieId from route.params
  const [movie, setMovie] = useState(null); // State to store the movie details
  const [loading, setLoading] = useState(true); // State to handle loading state
  const [status, setStatus] = useState(null); // Initialize as null and fetch dynamically

  useEffect(() => {
    if (movieId) {
      console.log('Fetching details for movieId:', movieId);
      fetchMovieDetails(movieId);
    }
  }, [movieId]);

  const fetchMovieDetails = async (id) => {
    try {
      setLoading(true); // Set loading state to true when fetching data
      const response = await getMovieDetails(id); // Call your API function
      setMovie(response.data); // Set movie details to state
      setStatus(response.data.status || 'To Watch'); // Set initial status dynamically
    } catch (error) {
      console.error('Error fetching movie details:', error);
    } finally {
      setLoading(false); // Set loading state to false after fetching
    }
  };

  const handleStatusChange = async () => {
    try {
      const newStatus = status === 'To Watch' ? 'Watched' : 'To Watch';
      setStatus(newStatus); // Update local status

      await addToWatchList(movieId, newStatus); // API call to update status
      console.log(`Movie ${movieId} added to ${newStatus} list.`);

      // Pass updated status back to MyListScreen
      navigation.goBack({
        params: { updatedMovie: { ...movie, status: newStatus } },
      });
    } catch (error) {
      console.error('Error updating movie status:', error);
    }
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!movie) {
    return (
      <View style={styles.error}>
        <Text>Error: Movie data not found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{movie.title}</Text>
      <Text>Type: {movie.type}</Text>
      <Text>Description: {movie.description}</Text>

      {/* Add the button for "To Watch" or "Watched" */}
      <Button
        title={status === 'To Watch' ? 'Add to Watched' : 'Add to To Watch'}
        onPress={handleStatusChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  error: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 8 },
});

export default MovieDetailsScreen;
