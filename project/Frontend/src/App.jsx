import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "./store/User/user-action.js";

import HomePage from "./pages/HomePage.jsx";
import PropertyDetails from "./pages/PropertyDetails.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import BookingPage from "./pages/BookingPage.jsx";
import PaymentPage from "./pages/PaymentPage.jsx";
import MyBookingsPage from "./pages/MyBookingsPage.jsx";
import AccommodationPage from "./pages/AccommodationPage.jsx";
import Layout from "./components/Layout.jsx";

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(checkAuth());
    }
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="property/:id" element={<PropertyDetails />} />
          <Route path="login" element={!isAuthenticated ? <LoginPage /> : <Navigate to="/" />} />
          <Route path="signup" element={!isAuthenticated ? <SignupPage /> : <Navigate to="/" />} />
          <Route
            path="profile"
            element={isAuthenticated ? <ProfilePage /> : <Navigate to="/login" />}
          />
          <Route
            path="booking/:propertyId"
            element={isAuthenticated ? <BookingPage /> : <Navigate to="/login" />}
          />
          <Route
            path="payment"
            element={isAuthenticated ? <PaymentPage /> : <Navigate to="/login" />}
          />
          <Route
            path="my-bookings"
            element={isAuthenticated ? <MyBookingsPage /> : <Navigate to="/login" />}
          />
          <Route
            path="accommodation"
            element={isAuthenticated ? <AccommodationPage /> : <Navigate to="/login" />}
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
