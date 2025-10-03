import React, { useRef, useState } from "react";
import { LuTrash, LuFileImage } from "react-icons/lu";

const CoverImageSelector = ({ image, setImage, preview, setPreview }) => {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      const newPreviewUrl = URL.createObjectURL(file);
      setPreviewUrl(newPreviewUrl);
      if (setPreview) setPreview(newPreviewUrl);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreviewUrl(null);
    if (setPreview) setPreview(null);
    if (inputRef.current) inputRef.current.value = ""; // reset input
  };

  const onChooseFile = () => {
    inputRef.current.click();
  };

  return (
    <div className="mb-6">
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        className="hidden"
      />

      {!image && !preview ? (
        <div
          className="w-full h-56 flex flex-col items-center justify-center gap-2 bg-gray-50/50 rounded-md border border-dashed border-gray-300 cursor-pointer"
          onClick={onChooseFile}
        >
          <div className="w-14 h-14 flex items-center justify-center bg-sky-50 rounded-full">
            <LuFileImage className="text-xl text-sky-600" />
          </div>
          <p className="text-sm text-gray-700">Click to upload a cover image</p>
        </div>
      ) : (
        <div className="relative w-full h-56">
          <img
            src={previewUrl || preview}
            alt="Cover"
            className="w-full h-full rounded-md object-cover"
          />
          <button
            type="button"
            aria-label="Remove cover image"
            onClick={handleRemoveImage}
            className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full shadow-md cursor-pointer"
          >
            <LuTrash />
          </button>
        </div>
      )}
    </div>
  );
};

export default CoverImageSelector;
