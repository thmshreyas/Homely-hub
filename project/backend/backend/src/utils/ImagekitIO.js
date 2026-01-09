import ImageKit from 'imagekit';
import dotenv from 'dotenv';
dotenv.config({ path: '.env' });

// Only initialize ImageKit if credentials are provided
let imagekit = null;

const publicKey = process.env.IMAGEKIT_PUBLICKEY || process.env.IMAGEKIT_PUBLIC_KEY;
const privateKey = process.env.IMAGEKIT_PRIVATEKEY || process.env.IMAGEKIT_PRIVATE_KEY;
const urlEndpoint = process.env.IMAGEKIT_URLENDPOINT || process.env.IMAGEKIT_URL_ENDPOINT;

if (publicKey && privateKey && urlEndpoint) {
  try {
    imagekit = new ImageKit({
      publicKey: publicKey,
      privateKey: privateKey,
      urlEndpoint: urlEndpoint
    });
    console.log('ImageKit initialized successfully');
  } catch (error) {
    console.warn('ImageKit initialization failed:', error.message);
    imagekit = null;
  }
} else {
  console.warn('ImageKit credentials not found. Image uploads will be disabled. Add IMAGEKIT_PUBLIC_KEY, IMAGEKIT_PRIVATE_KEY, and IMAGEKIT_URL_ENDPOINT to .env to enable.');
}

// Create a mock upload function if ImageKit is not available
const mockImagekit = {
  upload: async (options) => {
    console.warn('ImageKit is not configured. Returning mock image URL.');
    return {
      fileId: 'mock_id_' + Date.now(),
      url: options.file || 'https://via.placeholder.com/600x400?text=Image+Upload+Disabled',
      name: options.fileName || 'mock_image.jpg'
    };
  }
};

export default imagekit || mockImagekit;
