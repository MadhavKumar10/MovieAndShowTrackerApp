import React from 'react';
import AppNavigation from './navigation/AppNavigation';
import { MovieProvider } from './context/MovieContext';

const App = () => (
  <MovieProvider>
    <AppNavigation />
  </MovieProvider>
);

export default App;
