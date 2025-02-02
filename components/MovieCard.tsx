import React from "react";
import { MovieCardProps } from "@/utils/models";

const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  toggleFavorite,
  isFavorite,
}) => {
  const formattedDate = new Date(movie.release_date).toLocaleDateString(
    "en-US",
    {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }
  );

  return (
    <div className="bg-gray-700 p-4 rounded-lg">
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className="w-full h-72 object-cover rounded-md"
      />
      <h2 className="mt-2 text-lg font-semibold">{movie.title}</h2>
      <p className="text-gray-400">{formattedDate}</p>{" "}
      <button
        onClick={() => toggleFavorite(movie)}
        className="mt-2 text-xs text-blue-500"
      >
        {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
      </button>
    </div>
  );
};

export default MovieCard;
