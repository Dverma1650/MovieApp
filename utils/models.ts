import { ChangeEvent } from "react";

export interface Movie {
  id: number;
  title: string;
  release_date: string;
  poster_path: string;
}

export interface Genre {
  id: number;
  name: string;
}

export interface MovieCardProps {
  movie: Movie;
  toggleFavorite: (movie: Movie) => void;
  isFavorite: boolean;
}

export interface SearchBarProps {
  search: string;
  setSearch: (value: string) => void;
  suggestions: Movie[];
  handleSearch: (e: ChangeEvent<HTMLInputElement>) => void;
  setSuggestions: (value: Movie[]) => void;
}

export interface Filters {
  genre?: string;
  releaseYear?: string;
  rating?: string;
}
