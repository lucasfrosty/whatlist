/* eslint-disable consistent-return */
import axios from 'axios';

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

export const TYPES = {
  movie: 'movie',
  tv: 'tv',
};

/**
 * @param {string} query - The name of the Movie or TV Show
 * @param {string: 'movie' or 'tv'} type - Defining if it is a Movie or a TV Show
 * @returns {string} - The API URL for the query passed by
 */
export const getAPIData = async (query, type, selector) => {
  try {
    const queryURL = `https://api.themoviedb.org/3/search/${type}?api_key=${API_KEY}&query=${query}&page=1`;
    const idURL = `https://api.themoviedb.org/3/${type}/${query}?&api_key=${API_KEY}&append_to_response=videos`;
    const URL = (selector === 'query' ? queryURL : idURL);

    const response = await axios(URL);
    const results = response.data.results || response.data;

    return results;
  } catch (e) {
    console.error(e);
  }

  return null;
};


/**
 * @param {string} image_path - the path (provided for the API itself) for the image
 * @param {number} size - the size of the image
 * @returns {string} - The image URL
 */
export const getImage = (image_path, size) =>
  `https://image.tmdb.org/t/p/w${size}${image_path}`;


/**
 * @description Given an genre_ids array, convert to string and display it on the provided Query
 * @param {arrayOf(genres_ids)} genres - The Array with the genres, provided by the API.
 * @param {string: 'movie' or 'tv'} type - Defining if it is a Movie or a TV Show
 * @param {string} selector - A query selector to define where to put the list converted
 * @returns nothing (i'm not happy with this approach but was the only way i founded)
 */
export const convertGenresArray = async (genresArray, type) => {
  try {
    const genresURL = `https://api.themoviedb.org/3/genre/${type}/list?api_key=${API_KEY}&language=en-US`;

    const request = await axios(genresURL);
    const genresListFromAPI = await request.data.genres;

    const result = genresArray.map(genres => genres.map(genre =>
      genresListFromAPI.filter(genreFromAPI => genreFromAPI.id === genre).map(g => g.name)));

    return result;
  } catch (e) {
    console.error(e);
  }
};

export const getPopular = async (type) => {
  try {
    const URL =
      `https://api.themoviedb.org/3/${type}/popular?api_key=${API_KEY}&language=en-US&page=1`;

    const response = await axios(URL);
    const results = await response.data.results;
    const resultGenresArrays = results.map(r => r.genre_ids);
    const genresToString = await convertGenresArray(resultGenresArrays, type);

    const resultsWithTypeAndGenres = results.map((r, index) => ({
      ...r,
      type,
      genresToString: genresToString[index].join(', '),
    }));

    return Promise.all(resultsWithTypeAndGenres);
  } catch (e) {
    console.error(e);
  }
};
