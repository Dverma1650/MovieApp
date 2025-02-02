import { Filters, Genre, Movie } from "./models";

const API_KEY = "a241b8c0d6aa2946073506c739edf4e2";
const BASE_URL = "https://api.themoviedb.org/3";

export const fetchMovies = async (
  page = 1,
  query = "",
  filters: Filters = {}
): Promise<Movie[]> => {
  const { genre, releaseYear, rating } = filters;

  const basePath = query.trim().length > 0 ? "search/movie" : "discover/movie";
  const genreQuery = genre ? `&with_genres=${genre}` : "";
  const releaseYearQuery = releaseYear
    ? `&primary_release_year=${releaseYear}`
    : "";
  const ratingQuery = rating ? `&vote_average.gte=${rating}` : "";
  const searchQuery = query ? `&query=${encodeURIComponent(query)}` : "";

  try {
    const res = await fetch(
      `${BASE_URL}/${basePath}?api_key=${API_KEY}&page=${page}${genreQuery}${releaseYearQuery}${ratingQuery}${searchQuery}`
    );

    if (!res.ok) {
      throw new Error(`Error: ${res.statusText}`);
    }

    const data = await res.json();
    return data.results || [];
  } catch (error) {
    console.error("Failed to fetch movies:", error);
    return [];
  }
};

export const fetchGenres = async (): Promise<Genre[]> => {
  const res = await fetch(
    `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`
  );
  const data = await res.json();
  return data.genres;
};
