import { useState } from "react";
import { useDispatch } from "react-redux";
import { setFilters } from "../../store/Property/property-slice.js";
import { Search as SearchIcon } from "lucide-react";
import FilterModal from "./FilterModal.jsx";

const Search = () => {
  const dispatch = useDispatch();
  const [searchCity, setSearchCity] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(setFilters({ city: searchCity }));
  };

  return (
    <form onSubmit={handleSearch} className="max-w-xl mx-auto">
      <div className="flex items-center bg-white rounded-lg shadow-lg p-1">
        <input
          type="text"
          value={searchCity}
          onChange={(e) => setSearchCity(e.target.value)}
          placeholder="Search by city, state, or area..."
          className="flex-1 px-3 py-2 outline-none text-gray-800 rounded-l-lg"
        />
        <div className="flex items-center space-x-4 px-1">
          <FilterModal />
          <button
            type="submit"
            className="btn-primary px-4 py-2 rounded-lg hover:opacity-90 transition-colors flex items-center space-x-2"
            style={{ border: 'none' }}
          >
            <SearchIcon className="h-5 w-5" />
            <span>Search</span>
          </button>
        </div>
      </div>
    </form>
  );
};

export default Search;

