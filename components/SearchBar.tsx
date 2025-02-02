import { SearchBarProps } from "../utils/models";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";



export default function SearchBar({
  search,
  setSearch,
  suggestions,
  handleSearch,
  setSuggestions,
}: SearchBarProps) {
  return (
    <div className="w-full relative flex items-center border-b border-gray-500">
      <MagnifyingGlassIcon className="absolute left-2 w-5 h-5 text-gray-400" />
      <input
        type="text"
        placeholder="Search movies..."
        className="p-2 pl-8 pr-8 w-full bg-transparent text-white focus:outline-none"
        value={search}
        onChange={handleSearch}
      />
      {search && (
        <button
          className="absolute right-2 text-gray-400 hover:text-white"
          onClick={() => {
            setSearch("");
            setSuggestions([]);
          }}
        >
          <XMarkIcon
            className="right-2 w-5 h-5 text-gray-400 hover:text-white cursor-pointer"
            onClick={() => setSearch("")}
          />
        </button>
      )}

      {suggestions.length > 0 && (
        <div className="absolute bg-gray-800 text-white p-2 mt-[18rem]  rounded-lg w-full max-h-60 overflow-auto z-50 shadow-lg">
          {suggestions.map((movie) => (
            <div
              key={movie.id}
              className="p-2 cursor-pointer hover:bg-gray-700"
              onClick={() => {
                setSearch(movie.title);
                setSuggestions([]);
              }}
            >
              {movie.title}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
