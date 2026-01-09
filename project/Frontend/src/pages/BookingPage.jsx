import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPropertyDetails } from "../store/PropertyDetails/propertyDetails-action.js";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
import moment from "moment";
import { Calendar, Users, Home } from "lucide-react";

const BookingPage = () => {
  const { propertyId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { property } = useSelector((state) => state.propertyDetails);
  const { bookingDetails } = useSelector((state) => state.booking);
  const { loading } = useSelector((state) => state.propertyDetails);

  useEffect(() => {
    if (propertyId) {
      dispatch(fetchPropertyDetails(propertyId));
    }
  }, [dispatch, propertyId]);

  const handleConfirmBooking = () => {
    navigate("/payment");
  };

  if (loading || !property) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Confirm Your Booking</h1>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
            <Home className="h-6 w-6 mr-2 text-primary" />
            {property.propertyName}
          </h2>
          <p className="text-gray-600 mb-4">{property.address?.area}, {property.address?.city}</p>
          {property.images?.[0] && (
            <img
              src={property.images[0].url}
              alt={property.propertyName}
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
          )}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Booking Details</h2>
          <div className="space-y-4">
            <div className="flex items-center">
              <Calendar className="h-5 w-5 mr-3 text-primary" />
              <div>
                <p className="text-sm text-gray-600">Check-in</p>
                <p className="font-semibold text-gray-800">
                  {bookingDetails.fromDate
                    ? moment(bookingDetails.fromDate).format("MMMM DD, YYYY")
                    : "Not selected"}
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <Calendar className="h-5 w-5 mr-3 text-primary" />
              <div>
                <p className="text-sm text-gray-600">Check-out</p>
                <p className="font-semibold text-gray-800">
                  {bookingDetails.toDate
                    ? moment(bookingDetails.toDate).format("MMMM DD, YYYY")
                    : "Not selected"}
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <Users className="h-5 w-5 mr-3 text-primary" />
              <div>
                <p className="text-sm text-gray-600">Guests</p>
                <p className="font-semibold text-gray-800">{bookingDetails.guests || 1} guests</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Price Breakdown</h2>
          <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      ₹{property.price} x {bookingDetails.nights || 0} nights
                    </span>
                    <span className="text-gray-800">₹{(property.price * (bookingDetails.nights || 0)).toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold text-gray-800">Total</span>
                      <div className="flex items-center">
                        <span className="text-2xl font-bold text-primary">
                          ₹{bookingDetails.totalAmount?.toFixed(2) || "0.00"}
                        </span>
                      </div>
                    </div>
                  </div>
          </div>
        </div>

        <button
          onClick={handleConfirmBooking}
          className="w-full btn-primary text-white py-4 rounded-lg font-semibold text-lg hover:opacity-90 transition-colors"
          style={{ border: 'none' }}
        >
          Continue to Payment
        </button>
      </div>
    </div>
  );
};

export default BookingPage;

