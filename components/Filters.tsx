import React, { ChangeEvent } from "react";
import { Genre } from "../utils/models";

interface FiltersProps {
  genres: Genre[];
  handleFilterChange: (
    e: ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => void;
}

const Filters: React.FC<FiltersProps> = ({ genres, handleFilterChange }) => {
  return (
    <div className="w-1/2 flex items-center space-x-4">
      <select
        name="genre"
        onChange={handleFilterChange}
        className="p-2 rounded-lg text-blue-600 w-full"
      >
        <option value="">Select Genre</option>
        {genres.map((genre) => (
          <option key={genre.id} value={genre.id}>
            {genre.name}
          </option>
        ))}
      </select>
      <input
        type="number"
        name="releaseYear"
        placeholder="Release Year"
        onChange={handleFilterChange}
        className="p-2 rounded-lg text-blue-600 w-full"
      />
      <input
        type="number"
        name="rating"
        placeholder="Min Rating"
        onChange={handleFilterChange}
        className="p-2 rounded-lg text-blue-600 w-full"
      />
    </div>
  );
};

export default Filters;
