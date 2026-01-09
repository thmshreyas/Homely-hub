import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPropertyDetails } from "../store/PropertyDetails/propertyDetails-action.js";
import { setBookingDetails } from "../store/Booking/booking-slice.js";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
import MapComponent from "../components/propertyListing/MapComponent.jsx";
import Modal from "../components/propertyListing/Modal.jsx";
import PropertyImg from "../components/propertyListing/PropertyImg.jsx";
import PropertyAmenities from "../components/propertyListing/PropertyAmenities.jsx";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Calendar, Users, MapPin } from "lucide-react";

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { property, loading } = useSelector((state) => state.propertyDetails);
  const { isAuthenticated } = useSelector((state) => state.user);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [guests, setGuests] = useState(1);
  const [showBookingModal, setShowBookingModal] = useState(false);

  useEffect(() => {
    dispatch(fetchPropertyDetails(id));
  }, [dispatch, id]);

  const calculateNights = () => {
    if (startDate && endDate) {
      const diffTime = Math.abs(endDate - startDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays;
    }
    return 0;
  };

  const calculateTotal = () => {
    const nights = calculateNights();
    return property ? nights * property.price : 0;
  };

  const handleBookNow = () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    if (!startDate || !endDate) {
      alert("Please select check-in and check-out dates");
      return;
    }

    const nights = calculateNights();
    const totalAmount = calculateTotal();

    dispatch(
      setBookingDetails({
        propertyId: property._id,
        fromDate: startDate.toISOString(),
        toDate: endDate.toISOString(),
        guests,
        nights,
        price: property.price,
        totalAmount,
      })
    );

    navigate("/booking/" + property._id);
  };

  if (loading) return <LoadingSpinner />;
  if (!property) return <div className="container mx-auto px-4 py-8">Property not found</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{property.propertyName}</h1>

        <div className="flex items-center text-gray-600 mb-6">
          <MapPin className="h-5 w-5 mr-2" />
          <span>
            {property.address?.area}, {property.address?.city}, {property.address?.state}
          </span>
        </div>

        <PropertyImg images={property.images || []} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Description</h2>
              <p className="text-gray-600 mb-4">{property.description}</p>
              <p className="text-gray-600">{property.extraInfo}</p>
            </div>

            <PropertyAmenities amenities={property.amenities || []} />

            <div className="bg-white rounded-lg shadow-md p-6 mt-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Location</h2>
              <MapComponent address={property.address} />
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl font-bold text-gray-800">₹{property.price}</span>
                  <span className="text-gray-600">per night</span>
                </div>

                <div className="border border-gray-300 rounded-lg p-4 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Calendar className="inline h-4 w-4 mr-1" />
                      Check-in
                    </label>
                    <DatePicker
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      selectsStart
                      startDate={startDate}
                      endDate={endDate}
                      minDate={new Date()}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                      placeholderText="Select check-in date"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Calendar className="inline h-4 w-4 mr-1" />
                      Check-out
                    </label>
                    <DatePicker
                      selected={endDate}
                      onChange={(date) => setEndDate(date)}
                      selectsEnd
                      startDate={startDate}
                      endDate={endDate}
                      minDate={startDate || new Date()}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                      placeholderText="Select check-out date"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Users className="inline h-4 w-4 mr-1" />
                      Guests
                    </label>
                    <input
                      type="number"
                      min="1"
                      max={property.maximumGuest}
                      value={guests}
                      onChange={(e) => setGuests(parseInt(e.target.value) || 1)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    />
                  </div>
                </div>

                {startDate && endDate && (
                  <div className="mt-4 pt-4 border-t border-gray-300">
                    <div className="flex justify-between mb-2">
                      <span>₹{property.price} x {calculateNights()} nights</span>
                      <span>₹{calculateTotal()}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg pt-2 border-t">
                      <span>Total</span>
                      <span className="text-primary">₹{calculateTotal()}</span>
                    </div>
                  </div>
                )}

                <button
                  onClick={handleBookNow}
                  className="w-full mt-6 btn-primary text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-colors"
                  style={{ border: 'none' }}
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showBookingModal && (
        <Modal onClose={() => setShowBookingModal(false)}>
          <div>Booking confirmation</div>
        </Modal>
      )}
    </div>
  );
};

export default PropertyDetails;

