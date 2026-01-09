# HomelyHub Backend

Backend server for the HomelyHub MERN stack application.

## Setup Instructions

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory with the following variables:
```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/homelyhub
JWT_SECRET=your_super_secret_jwt_key_here_change_this_in_production
JWT_EXPIRES_IN=90d
JWT_COOKIE_EXPIRES_IN=90
ORIGIN_ACCESS_URL=http://localhost:5173
```

3. Make sure MongoDB is running (local or cloud instance)

4. Start the server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

The server will run on `http://localhost:5000`

## API Endpoints

All API endpoints are prefixed with `/api/v1`

### Authentication Routes
- `POST /api/v1/rent/user/signup` - User registration
- `POST /api/v1/rent/user/login` - User login
- `GET /api/v1/rent/user/logout` - User logout
- `GET /api/v1/rent/user/me` - Get current user (protected)
- `PATCH /api/v1/rent/user/updateMe` - Update profile (protected)
- `PATCH /api/v1/rent/user/updateMyPassword` - Update password (protected)

### Property Routes
- `GET /api/v1/rent/listing` - Get all properties (with optional filters)
- `GET /api/v1/rent/listing/:id` - Get property by ID
- `POST /api/v1/rent/user/newAccommodation` - Create new property (protected)
- `GET /api/v1/rent/user/myAccommodation` - Get user's properties (protected)

### Booking Routes
- `GET /api/v1/rent/user/booking` - Get user bookings (protected)
- `GET /api/v1/rent/user/booking/:bookingId` - Get booking details (protected)
- `POST /api/v1/rent/user/booking/create-order` - Create booking order (protected)
- `POST /api/v1/rent/user/booking/verify-payment` - Verify payment (protected)

## Notes

- JWT tokens are sent via cookies or Authorization header
- Payment processing is simulated (no actual payment gateway)
- Image uploads use ImageKit (optional, configure in .env)

