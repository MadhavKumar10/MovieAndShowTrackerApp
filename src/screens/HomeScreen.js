/* eslint-disable no-trailing-spaces */
// src/screens/HomeScreen.js
import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  TextInput,
  FlatList,
  Button,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import {getMoviesList} from '../services/api';
import MovieCard from '../components/MovieCard';
import Header from '../components/Header';
import GridToggle from '../components/GridToggle';

const HomeScreen = ({navigation}) => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [isGrid, setIsGrid] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const loadMovies = useCallback(() => {
    setRefreshing(true);
    getMoviesList()
      .then(response => {
        setMovies(response.data);
        setFilteredMovies(response.data);
      })
      .finally(() => setRefreshing(false));
  }, []);

  useEffect(() => loadMovies(), [loadMovies]);

  const sortAlphabetically = () => {
    setFilteredMovies(prevMovies =>
      [...prevMovies].sort((a, b) => a.title.localeCompare(b.title)),
    );
  };

  const toggleFilterType = () => {
    const newType = filterType === 'movie' ? 'show' : 'movie';
    setFilterType(newType);
    setFilteredMovies(
      movies.filter(movie => movie.type.toLowerCase() === newType),
    );
  };

  const toggleView = () => setIsGrid(!isGrid);

  return (
    <View style={styles.container}>
      <Header
        title="Profile"
        onProfilePress={() => navigation.navigate('Profile')}
        // eslint-disable-next-line no-alert
        onMenuPress={() => alert('Menu Placeholder')}
      />
      <TextInput
        style={styles.searchBar}
        placeholder="Search Movies/Shows"
        onChangeText={setSearchTerm}
        value={searchTerm}
      />
      <Button
       style={styles.searchBar}
       title="Sort Alphabetically"
       onPress={sortAlphabetically} />
      <Button
       title={`Filter by ${filterType}`}
       onPress={toggleFilterType} />
      <GridToggle isGrid={isGrid} 
       toggleView={toggleView} />
      <FlatList
        key={isGrid ? 'grid' : 'list'}
        data={filteredMovies.filter(movie =>
          movie.title.toLowerCase().includes(searchTerm.toLowerCase()),
        )}
        renderItem={({item}) => (
          <MovieCard
            movie={item}
            onPress={() =>
              navigation.navigate('MovieDetails', {movieId: item.id})
            }
            isGrid={isGrid}
          />
        )}
        keyExtractor={item => item.id.toString()}
        numColumns={isGrid ? 2 : 1}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={loadMovies} />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#f5f5f5'},
  searchBar: {
    padding: 10,
    margin: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
  },
});

export default HomeScreen;
