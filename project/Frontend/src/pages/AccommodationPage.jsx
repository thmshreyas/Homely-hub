import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserAccommodations } from "../store/Accomodation/Accomodation-action.js";
import { Link } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
import { Plus, Edit, Trash2, Home, MapPin } from "lucide-react";

const AccommodationPage = () => {
  const dispatch = useDispatch();
  const { accommodations, loading } = useSelector((state) => state.accommodation);

  useEffect(() => {
    dispatch(fetchUserAccommodations());
  }, [dispatch]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">My Accommodations</h1>
          <Link
            to="/accommodation/new"
            className="flex items-center space-x-2 btn-primary text-white px-6 py-3 rounded-lg hover:opacity-90 transition-colors"
            style={{ border: 'none' }}
          >
            <Plus className="h-5 w-5" />
            <span>Add New</span>
          </Link>
        </div>

        {accommodations.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <Home className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">No accommodations listed</h2>
            <p className="text-gray-600 mb-6">Start listing your property to earn income!</p>
            <Link
              to="/accommodation/new"
              className="inline-block btn-primary text-white px-6 py-3 rounded-lg hover:opacity-90 transition-colors"
              style={{ border: 'none' }}
            >
              List Your Property
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {accommodations.map((accommodation) => (
              <div key={accommodation._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                {accommodation.images?.[0] && (
                  <img
                    src={accommodation.images[0].url}
                    alt={accommodation.propertyName}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {accommodation.propertyName}
                  </h3>
                  <p className="text-gray-600 mb-4 flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {accommodation.address?.city}, {accommodation.address?.state}
                  </p>
                  <p className="text-gray-700 mb-4 line-clamp-2">{accommodation.description}</p>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-primary">
                      ₹{accommodation.price}/night
                    </span>
                    <span className="text-sm text-gray-600">{accommodation.propertyType}</span>
                  </div>
                  <div className="flex space-x-2">
                    <button className="flex-1 flex items-center justify-center space-x-1 text-blue-600 hover:text-blue-700 border border-blue-600 py-2 rounded-lg">
                      <Edit className="h-4 w-4" />
                      <span>Edit</span>
                    </button>
                    <button className="flex-1 flex items-center justify-center space-x-1 text-red-600 hover:text-red-700 border border-red-600 py-2 rounded-lg">
                      <Trash2 className="h-4 w-4" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AccommodationPage;

