import { v2 as cloudinary } from "cloudinary";
import { Multer } from "multer";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;

export const upload = async (file: Express.Multer.File) => {
  return await new Promise((resolve) => {
    cloudinary.uploader
      .upload_stream({ resource_type: "image" }, (error, result: any) => {
        return resolve(result);
      })
      .end(file.buffer);
  });
};

export const deleteImage = async (publicId: string) => {
  return await new Promise((resolve) => {
    cloudinary.uploader.destroy(publicId, (error, result) => {
      return resolve(result);
    });
  });
};

export const getPublicIdFromUrl = (url: string) => {
  const regex = /\/v\d+\/([^/]+)\.\w+$/;
  const match = url.match(regex);
  if (match) {
    return match[1];
  } else {
    return null; // Jika tidak ada kecocokan, kembalikan null
  }
};
