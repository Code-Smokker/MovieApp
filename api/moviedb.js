import axios from 'axios';
import { apiKey } from '../constants';

const fallbackApiUrl = 'http://www.omdbapi.com/';

export const apiCall = async (params) => {
    try {
        const response = await axios.get(fallbackApiUrl, { params });
        return response.data;
    } catch (error) {
        console.log('API Error: ', error);
        return {};
    }
}

export const fetchMoviesBySearch = (query) => {
    return apiCall({
        apikey: apiKey,
        s: query
    });
}

export const fetchMovieDetails = (imdbID) => {
    return apiCall({
        apikey: apiKey,
        i: imdbID
    });
}
