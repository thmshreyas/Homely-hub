import { useState } from "react";
import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { setFilters, clearFilters } from "../../store/Property/property-slice.js";
import { fetchProperties } from "../../store/Property/property-action.js";
import { X } from "lucide-react";

const FilterModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const { filters } = useSelector((state) => state.property);

  const [localFilters, setLocalFilters] = useState({
    minPrice: filters.minPrice || "",
    maxPrice: filters.maxPrice || "",
    propertyType: filters.propertyType || [],
    roomType: filters.roomType || "",
    amenities: filters.amenities || [],
    guests: filters.guests || "",
  });

  const propertyTypes = ["House", "Flat", "Guest House", "Hotel"];
  const amenitiesList = ["Wifi", "Kitchen", "Ac", "Washing Machine", "Tv", "Pool", "Free Parking"];

  const handleFilterChange = (key, value) => {
    if (key === "propertyType" || key === "amenities") {
      const currentValues = Array.isArray(localFilters[key]) ? localFilters[key] : [];
      const newValues = currentValues.includes(value)
        ? currentValues.filter((v) => v !== value)
        : [...currentValues, value];
      setLocalFilters({ ...localFilters, [key]: newValues });
    } else {
      setLocalFilters({ ...localFilters, [key]: value });
    }
  };

  const handleApplyFilters = () => {
    dispatch(setFilters(localFilters));
    dispatch(fetchProperties(localFilters));
    setIsOpen(false);
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      minPrice: "",
      maxPrice: "",
      propertyType: [],
      roomType: "",
      amenities: [],
      guests: "",
    };
    setLocalFilters(clearedFilters);
    dispatch(clearFilters());
    dispatch(fetchProperties({}));
    setIsOpen(false);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="bg-white border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors text-gray-800"
      >
        Filters
      </button>

      {isOpen && createPortal(
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto text-gray-900">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-900">Filters</h2>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-2">
                    Price Range
                  </label>
                <div className="flex space-x-4">
                  <input
                    type="number"
                    placeholder="Min"
                    value={localFilters.minPrice}
                    onChange={(e) => setLocalFilters({ ...localFilters, minPrice: e.target.value })}
                    className="border border-gray-300 rounded-lg px-4 py-2 w-full"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={localFilters.maxPrice}
                    onChange={(e) => setLocalFilters({ ...localFilters, maxPrice: e.target.value })}
                    className="border border-gray-300 rounded-lg px-4 py-2 w-full"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Property Type
                </label>
                  <div className="flex flex-wrap gap-2">
                  {propertyTypes.map((type) => {
                    const active = localFilters.propertyType.includes(type);
                    return (
                      <button
                        key={type}
                        onClick={() => handleFilterChange("propertyType", type)}
                          className={`px-4 py-2 rounded-lg border transition-colors ${
                            active ? "text-white" : "bg-white border-gray-300 text-gray-800 hover:bg-gray-50"
                          }`}
                        style={
                          active
                            ? { backgroundColor: "var(--primary)", borderColor: "var(--primary)" }
                            : undefined
                        }
                      >
                        {type}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Room Type
                </label>
                <select
                  value={localFilters.roomType}
                  onChange={(e) => setLocalFilters({ ...localFilters, roomType: e.target.value })}
                  className="border border-gray-300 rounded-lg px-4 py-2 w-full"
                >
                  <option value="">Any Type</option>
                  <option value="Room">Room</option>
                  <option value="Entire Home">Entire Home</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Amenities
                </label>
                <div className="flex flex-wrap gap-2">
                  {amenitiesList.map((amenity) => {
                    const active = localFilters.amenities.includes(amenity);
                    return (
                      <button
                        key={amenity}
                        onClick={() => handleFilterChange("amenities", amenity)}
                        className={`px-4 py-2 rounded-lg border transition-colors ${
                          active ? "text-white" : "bg-white border-gray-300 text-gray-800 hover:bg-gray-50"
                        }`}
                        style={
                          active
                            ? { backgroundColor: "var(--primary)", borderColor: "var(--primary)" }
                            : undefined
                        }
                      >
                        {amenity}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Guests
                </label>
                <input
                  type="number"
                  min="1"
                  value={localFilters.guests}
                  onChange={(e) => setLocalFilters({ ...localFilters, guests: e.target.value })}
                  className="border border-gray-300 rounded-lg px-4 py-2 w-full"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-4 p-6 border-t">
              <button
                type="button"
                onClick={handleClearFilters}
                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-gray-900"
              >
                Clear
              </button>
              <button
                type="button"
                onClick={handleApplyFilters}
                className="px-6 py-2 btn-primary text-white rounded-lg hover:opacity-90 transition-colors"
                style={{ border: "none" }}
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>, document.body
      )}
    </>
  );
};

export default FilterModal;

