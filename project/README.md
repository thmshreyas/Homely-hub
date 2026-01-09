# HomelyHub - Airbnb-style Booking Platform

A full-stack MERN (MongoDB, Express.js, React, Node.js) application for property booking and rental management.

## Features

- **User Authentication**: Signup, Login, Profile Management
- **Property Listings**: Browse, search, and filter properties
- **Booking System**: Select dates, calculate prices, and book properties
- **Payment Simulation**: Dummy payment processing for bookings
- **User Dashboard**: View bookings and manage accommodations
- **Responsive Design**: Modern UI with TailwindCSS

## Tech Stack

### Frontend
- React 18
- Vite
- Redux Toolkit
- React Router
- TailwindCSS
- Axios
- React Leaflet (Maps)
- React DatePicker

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- bcrypt for password hashing
- ImageKit for image uploads (optional)

## Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory:
```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/homelyhub
JWT_SECRET=your_super_secret_jwt_key_here_change_this_in_production
JWT_EXPIRES_IN=90d
JWT_COOKIE_EXPIRES_IN=90
ORIGIN_ACCESS_URL=http://localhost:5173
```

4. Start the backend server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd Frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the Frontend directory:
```env
VITE_API_BASE_URL=http://localhost:5000/api/v1
```

4. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## Project Structure

```
homelyhub/
├── backend/
│   ├── backend/
│   │   ├── src/
│   │   │   ├── controllers/
│   │   │   │   ├── authController.js
│   │   │   │   ├── propertyController.js
│   │   │   │   └── bookingController.js
│   │   │   ├── Models/
│   │   │   │   ├── userModel.js
│   │   │   │   ├── PropertyModel.js
│   │   │   │   └── bookingModel.js
│   │   │   ├── routes/
│   │   │   │   ├── userRoutes.js
│   │   │   │   ├── propertyRouter.js
│   │   │   │   └── bookingRouter.js
│   │   │   └── utils/
│   │   │       ├── db.js
│   │   │       └── APIFeatures.js
│   ├── server.js
│   └── package.json
│
└── Frontend/
    ├── src/
    │   ├── components/
    │   │   ├── home/
    │   │   │   ├── Header.jsx
    │   │   │   ├── Footer.jsx
    │   │   │   ├── Search.jsx
    │   │   │   ├── FilterModal.jsx
    │   │   │   └── PropertyList.jsx
    │   │   ├── propertyListing/
    │   │   │   ├── PropertyImg.jsx
    │   │   │   ├── PropertyAmenities.jsx
    │   │   │   ├── MapComponent.jsx
    │   │   │   ├── Modal.jsx
    │   │   │   └── PaymentForm.jsx
    │   │   └── Layout.jsx
    │   ├── pages/
    │   │   ├── HomePage.jsx
    │   │   ├── PropertyDetails.jsx
    │   │   ├── LoginPage.jsx
    │   │   ├── SignupPage.jsx
    │   │   ├── ProfilePage.jsx
    │   │   ├── BookingPage.jsx
    │   │   ├── PaymentPage.jsx
    │   │   ├── MyBookingsPage.jsx
    │   │   └── AccommodationPage.jsx
    │   ├── store/
    │   │   ├── store.js
    │   │   ├── User/
    │   │   ├── Property/
    │   │   ├── Booking/
    │   │   └── Payment/
    │   ├── utils/
    │   │   └── axios.js
    │   ├── App.jsx
    │   └── main.jsx
    └── package.json
```

## API Endpoints

### Authentication
- `POST /api/v1/rent/user/signup` - User signup
- `POST /api/v1/rent/user/login` - User login
- `GET /api/v1/rent/user/logout` - User logout
- `GET /api/v1/rent/user/me` - Get current user
- `PATCH /api/v1/rent/user/updateMe` - Update profile
- `PATCH /api/v1/rent/user/updateMyPassword` - Update password

### Properties
- `GET /api/v1/rent/listing` - Get all properties (with filters)
- `GET /api/v1/rent/listing/:id` - Get property details
- `POST /api/v1/rent/user/newAccommodation` - Create property (protected)
- `GET /api/v1/rent/user/myAccommodation` - Get user's properties (protected)

### Bookings
- `GET /api/v1/rent/user/booking` - Get user bookings (protected)
- `GET /api/v1/rent/user/booking/:bookingId` - Get booking details (protected)
- `POST /api/v1/rent/user/booking/create-order` - Create booking order (protected)
- `POST /api/v1/rent/user/booking/verify-payment` - Verify payment (protected)

## Usage

1. **Start MongoDB** (if running locally):
```bash
mongod
```

2. **Start Backend**:
```bash
cd backend
npm start
```

3. **Start Frontend**:
```bash
cd Frontend
npm run dev
```

4. **Access the application**: Open `http://localhost:5173` in your browser

## Features Overview

### Homepage
- Browse all available properties
- Search by location
- Filter by price, property type, amenities, etc.
- View property cards with images and details

### Property Details
- View full property information
- See amenities and location on map
- Select check-in/check-out dates
- Calculate total price
- Book property

### Booking Flow
1. Select property and dates
2. Review booking details
3. Proceed to payment
4. Complete dummy payment
5. View booking confirmation

### User Profile
- View and edit profile information
- Change password
- View booking history
- Manage accommodations

## Notes

- Payment processing is simulated - no actual payments are processed
- Image uploads use ImageKit (optional, can be configured in .env)
- JWT tokens are stored in localStorage
- All dates use moment.js for formatting

## License

ISC

## Author

HomelyHub Development Team

