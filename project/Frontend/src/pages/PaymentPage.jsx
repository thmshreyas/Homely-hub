import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createOrder, verifyPayment } from "../store/Payment/payment-action.js";
import { clearBookingDetails } from "../store/Booking/booking-slice.js";
import PaymentForm from "../components/propertyListing/PaymentForm.jsx";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
import { CreditCard, Lock, CheckCircle } from "lucide-react";

const PaymentPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { bookingDetails } = useSelector((state) => state.booking);
  const { loading, paymentStatus } = useSelector((state) => state.payment);
  const { property } = useSelector((state) => state.propertyDetails);

  const handlePaymentSubmit = async (paymentData) => {
    // Create order first
    const orderResult = await dispatch(
      createOrder({
        amount: bookingDetails.totalAmount,
        propertyId: bookingDetails.propertyId,
        fromDate: bookingDetails.fromDate,
        toDate: bookingDetails.toDate,
        guests: bookingDetails.guests,
      })
    );

    if (orderResult.success) {
      // Verify payment (simulated)
      const paymentResult = await dispatch(
        verifyPayment({
          orderId: orderResult.orderId,
          bookingDetails: {
            propertyId: bookingDetails.propertyId,
            fromDate: bookingDetails.fromDate,
            toDate: bookingDetails.toDate,
            guests: bookingDetails.guests,
            price: bookingDetails.price,
            nights: bookingDetails.nights,
          },
        })
      );

      if (paymentResult.success) {
        dispatch(clearBookingDetails());
        setTimeout(() => {
          navigate("/my-bookings");
        }, 2000);
      }
    }
  };

  if (paymentStatus === "success") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Payment Successful!</h2>
          <p className="text-gray-600 mb-4">Your booking has been confirmed.</p>
          <p className="text-sm text-gray-500">Redirecting to your bookings...</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center">
            <CreditCard className="h-8 w-8 mr-2 text-primary" />
            Payment
          </h1>
          <p className="text-gray-600 flex items-center">
            <Lock className="h-4 w-4 mr-1" />
            Secure payment processing
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Booking Summary</h2>
          <div className="space-y-2 text-gray-600">
            <p>
              <span className="font-semibold">Property:</span> {property?.propertyName || "N/A"}
            </p>
            <p>
              <span className="font-semibold">Total Amount:</span> ₹{bookingDetails.totalAmount?.toFixed(2) || "0.00"}
            </p>
            <p>
              <span className="font-semibold">Nights:</span> {bookingDetails.nights || 0}
            </p>
          </div>
        </div>

        <PaymentForm onSubmit={handlePaymentSubmit} totalAmount={bookingDetails.totalAmount || 0} />
      </div>
    </div>
  );
};

export default PaymentPage;

