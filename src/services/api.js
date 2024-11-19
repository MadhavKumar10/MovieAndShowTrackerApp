// src/services/api.js
import axios from 'axios';

const API_BASE_URL = 'https://api.rapidmock.com/api/vikuman/v1';

export const getMoviesList = () => axios.get(`${API_BASE_URL}/movies/all`);
export const getMovieDetails = (id) => axios.get(`${API_BASE_URL}/movies`, { params: { id } });
export const getMyList = () => axios.get(`${API_BASE_URL}/mylist`);
export const addToWatchList = (movieId, status) => axios.post(`${API_BASE_URL}/mylist/add`, { movieId, status });
