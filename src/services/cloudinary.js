import axios from 'axios';
import { cloudinary } from './creds';

// Cloudinary upload service
const uploadImageToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', cloudinary.appPreset); // Replace with your Cloudinary preset
  formData.append('cloud_name', cloudinary.appName); // Replace with your Cloudinary cloud name

  try {
    const response = await axios.post(`https://api.cloudinary.com/v1_1/${cloudinary.appName}/image/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data.secure_url; // Return the image URL
  } catch (error) {
    console.error('Error uploading image to Cloudinary', error);
    return null;
  }
};

export { uploadImageToCloudinary };
