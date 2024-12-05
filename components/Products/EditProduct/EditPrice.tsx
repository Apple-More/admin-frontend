import React from "react";

interface EditPriceProps {
  formData: {
    productName: string;
    description: string;
    category: string[];
    price: string;
    stock: string;
    attributes: Record<string, string>;
  };
  setFormData: React.Dispatch<
    React.SetStateAction<{
      productName: string;
      description: string;
      category: string[];
      price: string;
      stock: string;
      attributes: Record<string, string>;
    }>
  >;
}

const EditPrice: React.FC<EditPriceProps> = ({ formData, setFormData }) => {
  return (
    <>
      <label htmlFor="price" className="mb-0 w-1/3 ltr:mr-2 rtl:ml-2">
        Price
      </label>
      <input
        id="price"
        type="number"
        name="price"
        className="form-input flex-1 appearance-none" // Use Tailwind's utility class
        placeholder="Enter Price"
        defaultValue={formData.price}
        step="0.01"
        min="0"
        onChange={(e) => {
          const value = e.target.value;
          if (/^\d*\.?\d*$/.test(value)) {
            setFormData((prev) => ({
              ...prev,
              price: value,
            }));
          }
        }}
      />
    </>
  );
};

export default EditPrice;
