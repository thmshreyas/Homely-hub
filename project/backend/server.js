import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import connectDB from './backend/src/utils/db.js';
import { router } from './backend/src/routes/userRoutes.js';
import { propertyRouter } from './backend/src/routes/propertyRouter.js';
import { bookingRouter } from './backend/src/routes/bookingRouter.js';

// Get the directory name for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ✅ Load environment variables from .env file in backend directory
dotenv.config({ path: `${__dirname}/.env` });

const app = express();

// ✅ Middleware setup
app.use(
  cors({
    origin: process.env.ORIGIN_ACCESS_URL || 'http://localhost:5173',
    credentials: true,
  })
);
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));
app.use(cookieParser());

// ✅ Connect to MongoDB
connectDB();

// ✅ Routes
app.use('/api/v1/rent/user', router);
app.use('/api/v1/rent/listing', propertyRouter);
app.use('/api/v1/rent/user/booking', bookingRouter);

// ✅ Start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`App running on port: ${port}`);
});
