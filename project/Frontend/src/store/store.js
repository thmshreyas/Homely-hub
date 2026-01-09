import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./User/user-slice.js";
import propertyReducer from "./Property/property-slice.js";
import propertyDetailsReducer from "./PropertyDetails/propertyDetails-slice.js";
import bookingReducer from "./Booking/booking-slice.js";
import paymentReducer from "./Payment/payment-slice.js";
import accommodationReducer from "./Accomodation/Accomodation-slice.js";

export const store = configureStore({
  reducer: {
    user: userReducer,
    property: propertyReducer,
    propertyDetails: propertyDetailsReducer,
    booking: bookingReducer,
    payment: paymentReducer,
    accommodation: accommodationReducer,
  },
});

