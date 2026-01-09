import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserBookings } from "../store/Booking/booking-action.js";
import { Link } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
import moment from "moment";
import { Calendar, Users, Home, MapPin } from "lucide-react";

const MyBookingsPage = () => {
  const dispatch = useDispatch();
  const { bookings, loading } = useSelector((state) => state.booking);

  useEffect(() => {
    dispatch(fetchUserBookings());
  }, [dispatch]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">My Bookings</h1>

        {bookings.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">No bookings yet</h2>
            <p className="text-gray-600 mb-6">Start exploring and book your perfect stay!</p>
            <Link
              to="/"
              className="inline-block btn-primary text-white px-6 py-3 rounded-lg hover:opacity-90 transition-colors"
              style={{ border: 'none' }}
            >
              Browse Properties
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {bookings.map((booking) => (
              <div key={booking._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                {booking.property?.images?.[0] && (
                  <img
                    src={booking.property.images[0].url}
                    alt={booking.property.propertyName}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2 flex items-center">
                    <Home className="h-5 w-5 mr-2 text-primary" />
                    {booking.property?.propertyName || "Property"}
                  </h3>
                  <p className="text-gray-600 mb-4 flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {booking.property?.address?.city}, {booking.property?.address?.state}
                  </p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-gray-700">
                      <Calendar className="h-4 w-4 mr-2 text-primary" />
                      <span className="text-sm">
                        {moment(booking.fromDate).format("MMM DD, YYYY")} - {moment(booking.toDate).format("MMM DD, YYYY")}
                      </span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <Users className="h-4 w-4 mr-2 text-primary" />
                      <span className="text-sm">{booking.guests || 1} guests</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <span className="text-sm">{booking.numberOfnights || 0} nights</span>
                    </div>
                  </div>

                  <div className="border-t pt-4 flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-600">Total Amount</p>
                      <p className="text-xl font-bold text-primary">
                        ₹{booking.price?.toFixed(2) || "0.00"}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        booking.paid
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {booking.paid ? "Paid" : "Pending"}
                    </span>
                  </div>

                  <Link
                    to={`/booking/${booking.property?._id}`}
                    className="block mt-4 text-center btn-primary text-white py-2 rounded-lg hover:opacity-90 transition-colors"
                    style={{ border: 'none' }}
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookingsPage;

