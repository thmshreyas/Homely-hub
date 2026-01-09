import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, Users, Bed } from "lucide-react";
import "./PropertyList.css";

const PropertyCard = ({ property }) => (
  <Link
    key={property._id}
    to={`/property/${property._id}`}
    className="property-card bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
  >
  <div className="relative h-56 overflow-hidden">
      <img
        src={property.images?.[0]?.url || `/assets/image${Math.floor(Math.random() * 8) + 1}.jpeg`}
        alt={property.propertyName}
        className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
        onError={(e) => {
          e.target.src = "/assets/template.jpeg";
        }}
      />
      <div className="absolute top-2 right-2 text-white px-3 py-1 rounded-full text-sm font-semibold" style={{ backgroundColor: 'var(--primary)' }}>
        ₹{property.price}/night
      </div>
    </div>
    <div className="p-4">
      <h3 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-1">
        {property.propertyName}
      </h3>
      <p className="text-gray-600 text-sm mb-3 line-clamp-2">{property.description}</p>
      <div className="flex items-center text-gray-500 text-sm space-x-4">
        <div className="flex items-center space-x-1">
          <MapPin className="h-4 w-4" />
          <span>
            {property.address?.city}, {property.address?.state}
          </span>
        </div>
        <div className="flex items-center space-x-1">
          <Users className="h-4 w-4" />
          <span>{property.maximumGuest} guests</span>
        </div>
        <div className="flex items-center space-x-1">
          <Bed className="h-4 w-4" />
          <span>{property.propertyType}</span>
        </div>
      </div>
    </div>
  </Link>
);

const chunk = (arr, size) => {
  const res = [];
  for (let i = 0; i < arr.length; i += size) res.push(arr.slice(i, i + size));
  return res;
};

const PropertyList = ({ properties = [] }) => {
  const itemsPerPage = 6;
  const pages = useMemo(() => chunk(properties, itemsPerPage), [properties]);
  const [pageIndex, setPageIndex] = useState(0);

  if (!properties || properties.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No properties found. Try adjusting your search filters.</p>
      </div>
    );
  }

  const current = pages[pageIndex] || [];
  const prev = () => setPageIndex((p) => Math.max(0, p - 1));
  const next = () => setPageIndex((p) => Math.min(pages.length - 1, p + 1));

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {current.map((property) => (
          <PropertyCard property={property} key={property._id} />
        ))}
      </div>

      <div className="flex items-center justify-between mt-6">
        <div>
          <button className="slider-btn mr-3" onClick={prev} disabled={pageIndex === 0}>
            Prev
          </button>
          <button className="slider-btn" onClick={next} disabled={pageIndex === pages.length - 1}>
            Next
          </button>
        </div>
        <div className="text-sm text-gray-600">
          Page {pageIndex + 1} of {pages.length}
        </div>
      </div>
    </div>
  );
};

export default PropertyList;

