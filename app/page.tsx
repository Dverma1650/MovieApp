"use client";

import { useState, useEffect, ChangeEvent, useRef, useCallback } from "react";
import { fetchMovies, fetchGenres } from "../utils/api";
import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import Filters from "@/components/Filters";
import { Movie, Genre } from "../utils/models";
import Loader from "@/components/Loader";

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<{ [key: string]: string }>({});
  const [appliedFilters, setAppliedFilters] = useState<{
    [key: string]: string;
  }>({});
  const [page, setPage] = useState<number>(1);
  const [favorites, setFavorites] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [suggestions, setSuggestions] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [isFavoritesTab, setIsFavoritesTab] = useState<boolean>(false);
  const observer = useRef<IntersectionObserver | null>(null);

  // Fetch genres dynamically
  useEffect(() => {
    fetchGenres().then(setGenres);
  }, []);

  // Fetch movies when "Search Movies" button is clicked
  useEffect(() => {
    if (page >= 1 || Object.keys(appliedFilters).length > 0) {
      setIsLoading(true);
      fetchMovies(page, search, appliedFilters).then((data) => {
        setMovies((prev) => (page === 1 ? data : [...prev, ...data]));
        setIsLoading(false);
      });
    }
  }, [page, appliedFilters]);

  // Handle "Search Movies" button click
  const fetchFilteredMovies = () => {
    setAppliedFilters(filters);
    setPage(1);
  };

  // Handle search input with debounce
  let debounceTimer: NodeJS.Timeout;
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);

    clearTimeout(debounceTimer);
    if (value.trim().length > 2) {
      setIsLoading(true);
      debounceTimer = setTimeout(async () => {
        const data = await fetchMovies(1, value, {});
        setSuggestions(data);
        setIsLoading(false);
      }, 800);
    } else {
      setSuggestions([]);
    }
  };

  const handleFilterChange = (
    e: ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const isSearchButtonEnabled = Object.keys(filters).length > 0;

  // favorite movies
  const toggleFavorite = (movie: Movie) => {
    const updatedFavorites = favorites.some((fav) => fav.id === movie.id)
      ? favorites.filter((fav) => fav.id !== movie.id)
      : [...favorites, movie];

    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  // Infinite scroll observer
  const lastMovieRef = useCallback(
    (node: HTMLDivElement) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading]
  );
  {
  }

  return (
    <div className="min-h-screen bg-gray-800 text-white">
      <header className="p-4 bg-gray-900 flex items-center justify-between">
        <SearchBar
          search={search}
          setSearch={setSearch}
          suggestions={suggestions}
          handleSearch={handleSearch}
          setSuggestions={setSuggestions}
        />
      </header>

      <div className="flex flex-col md:flex-row flex-col-reverse justify-between items-start p-4 bg-gray-700">
        <button
          className={`px-4 py-2 ${
            isFavoritesTab ? "bg-gray-900" : "bg-gray-600"
          } rounded`}
          onClick={() => setIsFavoritesTab(!isFavoritesTab)}
        >
          Favorites
        </button>

        <div className="flex flex-wrap gap-4 items-center pb-2">
          <Filters genres={genres} handleFilterChange={handleFilterChange} />
          <button
            className={`px-4 py-2 ${
              isSearchButtonEnabled
                ? "bg-blue-500"
                : "bg-gray-500 cursor-not-allowed"
            } rounded`}
            onClick={fetchFilteredMovies}
            disabled={!isSearchButtonEnabled}
          >
            Search Movies
          </button>
        </div>
      </div>

      <main className="relative p-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {isFavoritesTab
          ? favorites.map((movie, index) => (
              <MovieCard
                key={index}
                movie={movie}
                toggleFavorite={toggleFavorite}
                isFavorite
              />
            ))
          : movies.map((movie, index) => {
              if (index === movies.length - 1) {
                return (
                  <div ref={lastMovieRef} key={index}>
                    <MovieCard
                      movie={movie}
                      toggleFavorite={toggleFavorite}
                      isFavorite={favorites.some((fav) => fav.id === movie.id)}
                    />
                  </div>
                );
              } else {
                return (
                  <MovieCard
                    key={index}
                    movie={movie}
                    toggleFavorite={toggleFavorite}
                    isFavorite={favorites.some((fav) => fav.id === movie.id)}
                  />
                );
              }
            })}

        {isLoading && <Loader />}
      </main>
    </div>
  );
}
