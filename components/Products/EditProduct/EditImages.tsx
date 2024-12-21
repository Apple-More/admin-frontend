import React, { useState } from "react";

interface EditImagesProps {
  previewImages: string[];
  setPreviewImages: React.Dispatch<React.SetStateAction<string[]>>;
}

const EditImages: React.FC<EditImagesProps> = ({
  previewImages,
  setPreviewImages,
}) => {
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newPreviewImages = files.map((file) => URL.createObjectURL(file));
    setPreviewImages((prev) => [...prev, ...newPreviewImages]);
  };

  return (
    <>
      <label className="mb-0 w-1/3 ltr:mr-2 rtl:ml-2" htmlFor="images">
        Upload All Images
      </label>
      <label
        htmlFor="images"
        className="mt-2 inline-flex cursor-pointer items-center justify-center rounded bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
      >
        Choose Files
      </label>
      <input
        id="images"
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={handleImageUpload}
      />
    </>
  );
};

export default EditImages;
