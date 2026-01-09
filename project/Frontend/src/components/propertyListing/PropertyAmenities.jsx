const PropertyAmenities = ({ amenities }) => {
  if (!amenities || amenities.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Amenities</h2>
        <p className="text-gray-600">No amenities listed</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Amenities</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {amenities.map((amenity, index) => (
          <div key={index} className="flex items-center space-x-2">
            <span className="text-2xl">{amenity.icon || "✓"}</span>
            <span className="text-gray-700">{amenity.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyAmenities;

