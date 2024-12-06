import React, { useState } from "react";

interface AddHeroImageProps {
  previewHeroImage: string[];
  setPreviewHeroImage: React.Dispatch<React.SetStateAction<string[]>>;
}

const AddHeroImage: React.FC<AddHeroImageProps> = ({
  previewHeroImage,
  setPreviewHeroImage,
}) => {
  const handleHeroImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newPreviewHeroImages = files.map((file) => URL.createObjectURL(file));
    setPreviewHeroImage((prev) => [...prev, ...newPreviewHeroImages]);
  };

  return (
    <>
      <label className="mb-0 w-1/3 ltr:mr-2 rtl:ml-2" htmlFor="heroImages">
        Upload Hero Images
      </label>
      <label
        htmlFor="heroImages"
        className="mt-2 inline-flex cursor-pointer items-center justify-center rounded bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
      >
        Choose Files
      </label>
      <input
        id="heroImages"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleHeroImageUpload}
      />
    </>
  );
};

export default AddHeroImage;
