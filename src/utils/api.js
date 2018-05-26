import axios from 'axios';

// TMDB API KEY
const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

// Types of content, decided to use variables to avoid typos
export const TYPES = {
  movie: 'movie',
  tv: 'tv',
};

/**
 * @param {string} query - The name of the Movie or TV Show
 * @param {string: 'movie' or 'tv'} type - Defining if it is a Movie or a TV Show
 * @returns {string} - The API URL for the query passed by
 */
export async function getAPIData(query, type, selector) {
  try {
    const queryURL = `https://api.themoviedb.org/3/search/${type}?api_key=${API_KEY}&query=${query}&page=1`;
    const idURL = `https://api.themoviedb.org/3/${type}/${query}?&api_key=${API_KEY}&append_to_response=videos`;
    const url = (selector === 'query' ? queryURL : idURL);

    const response = await axios(url);
    const results = response.data.results || response.data;

    return results;
  } catch (err) {
    console.error(err);
  }

  return null;
}


/**
 * @param {string} imagePath - the path (provided for the API itself) for the image
 * @param {number} size - the size of the image
 * @returns {string} - The image URL
 */
export function getImage(imagePath, size) {
  return `https://image.tmdb.org/t/p/w${size}${imagePath}`;
}


// export const convertGenresArray = async (genresArray, type) => {
//   try {
//     const genresURL = `https://api.themoviedb.org/3/genre/${type}/list?api_key=${API_KEY}&language=en-US`;

//     const request = await axios(genresURL);
//     const genresListFromAPI = await request.data.genres;

//     const result = genresArray.map(genres => genres.map(genre =>
//       genresListFromAPI.filter(genreFromAPI => genreFromAPI.id === genre).map(g => g.name)));

//     return result;
//   } catch (e) {
//     console.error(e);
//   }
// };

export async function getPopular(type) {
  try {
    const url =
      `https://api.themoviedb.org/3/${type}/popular?api_key=${API_KEY}&language=en-US&page=1`;

    const response = await axios(url);
    const results = await response.data.results;

    const resultsWithType = results.map((result) => ({
      ...result,
      type,
    }));

    return Promise.all(resultsWithType);
  } catch (err) {
    console.error(err);
  }

  return null;
}
