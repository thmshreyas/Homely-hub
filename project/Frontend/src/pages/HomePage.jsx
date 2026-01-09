import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProperties } from "../store/Property/property-action.js";
import PropertyList from "../components/home/PropertyList.jsx";
import Search from "../components/home/Search.jsx";
import LoadingSpinner from "../components/LoadingSpinner.jsx";

const HomePage = () => {
  const dispatch = useDispatch();
  const { properties, loading, filters } = useSelector((state) => state.property);

  useEffect(() => {
    dispatch(fetchProperties(filters));
  }, [dispatch, filters]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="text-white py-16" style={{ background: 'linear-gradient(90deg, var(--primary), var(--primary-600))' }}>
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
            Find Your Perfect Stay
          </h1>
          <p className="text-xl text-center mb-8">
            Discover amazing places to stay around the world
          </p>
          <Search />
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {properties.length} Properties Available
          </h2>
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : (
          <PropertyList properties={properties} />
        )}
      </div>
    </div>
  );
};

export default HomePage;

