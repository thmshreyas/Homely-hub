import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync } from 'fs';
import { Property } from './backend/src/Models/PropertyModel.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '.env') });

// Helper function to transform property data to match schema
const transformProperty = (prop) => {
  // Transform propertyType
  let propertyType = prop.propertyType;
  if (propertyType === 'guest_house') propertyType = 'Guest House';
  else if (propertyType === 'hotel') propertyType = 'Hotel';
  else if (propertyType === 'house') propertyType = 'House';
  else if (propertyType === 'flat') propertyType = 'Flat';
  else propertyType = 'House'; // default

  // Transform roomType
  let roomType = prop.roomType;
  if (roomType === 'entire home') roomType = 'Entire Home';
  else if (roomType === 'room') roomType = 'Room';
  else if (roomType === 'anytype') roomType = 'Anytype';
  else roomType = 'Anytype'; // default

  // Transform amenities to match schema format (capitalize first letter)
  const amenityMap = {
    'kitchen': 'Kitchen',
    'wifi': 'Wifi',
    'ac': 'Ac',
    'tv': 'Tv',
    'pool': 'Pool',
    'free parking': 'Free Parking',
    'washing machine': 'Washing Machine',
    'local_parking': 'Free Parking',
    'ac_unit': 'Ac',
    'local_laundry_service': 'Washing Machine'
  };

  const amenities = (prop.amenities || [])
    .map(amenity => {
      const amenityName = amenity.name || amenity;
      const normalizedName = amenityName.toLowerCase();
      const mappedName = amenityMap[normalizedName] || amenityName.charAt(0).toUpperCase() + amenityName.slice(1);
      
      // Only include if it's a valid enum value
      const validAmenities = ['Wifi', 'Kitchen', 'Ac', 'Washing Machine', 'Tv', 'Pool', 'Free Parking'];
      if (!validAmenities.includes(mappedName)) {
        console.warn(`Skipping invalid amenity: ${mappedName}`);
        return null;
      }
      
      return {
        name: mappedName,
        icon: amenity.icon || mappedName.charAt(0)
      };
    })
    .filter(a => a !== null); // Remove null entries

  return {
    propertyName: prop.propertyName,
    description: prop.description,
    extraInfo: prop.extraInfo || 'A beautiful property in a great location.',
    propertyType: propertyType,
    roomType: roomType,
    maximumGuest: prop.maximumGuest || prop.maximumNight || 4,
    amenities: amenities,
    images: (() => {
      const imageArray = (prop.images || []).map(img => ({
        public_id: img.public_id || `img_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        url: img.url
      })).filter(img => img.url); // Only include images with URLs
      
      // Schema requires at least 5 images, so duplicate if needed
      const placeholderUrl = 'https://via.placeholder.com/600x400?text=Property+Image';
      while (imageArray.length < 6) { // Schema says at least 5, so we'll make it 6 to be safe
        imageArray.push({
          public_id: `placeholder_${imageArray.length}`,
          url: placeholderUrl
        });
      }
      
      return imageArray;
    })(),
    price: prop.price || 1000,
    address: prop.address || {
      area: 'Unknown',
      city: 'Unknown',
      state: 'Unknown',
      pincode: 0
    },
    userId: null, // You might want to set this to an actual user ID
    chekInTime: prop.checkInTime || '11:00',
    chekOutTime: prop.checkOutTime || '13:00',
    currentBookings: []
  };
};

const seedDatabase = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Read properties.json
    const propertiesPath = join(__dirname, '..', 'properties.json');
    console.log(`Reading properties from: ${propertiesPath}`);
    const propertiesData = JSON.parse(readFileSync(propertiesPath, 'utf8'));

    // Clear existing properties
    console.log('Clearing existing properties...');
    await Property.deleteMany({});
    console.log('✅ Cleared existing properties');

    // Transform and insert properties
    console.log(`Inserting ${propertiesData.length} properties...`);
    const transformedProperties = propertiesData.map(transformProperty);
    await Property.insertMany(transformedProperties);
    console.log(`✅ Successfully inserted ${propertiesData.length} properties!`);

    // Verify
    const count = await Property.countDocuments();
    console.log(`📊 Total properties in database: ${count}`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();

