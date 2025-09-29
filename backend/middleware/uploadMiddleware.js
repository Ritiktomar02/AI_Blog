
const cloudinary = require("cloudinary").v2;

exports.uploadToCloudinary = async (file, folder = "myapp") => {
  try {
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      folder,
      resource_type: "auto", 
    });
    return result.secure_url;
  } catch (err) {
    throw new Error("Cloudinary upload failed: " + err.message);
  }
};
