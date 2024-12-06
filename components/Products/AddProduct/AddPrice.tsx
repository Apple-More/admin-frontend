import React from "react";

interface AddPriceProps {
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

const AddPrice: React.FC<AddPriceProps> = ({ formData, setFormData }) => {
  return (
    <>
      <label htmlFor="price" className="mb-0 w-1/3 ltr:mr-2 rtl:ml-2">
        Price
      </label>
      <input
        id="price"
        type="text"
        name="price"
        className="form-input flex-1 appearance-none" // Use Tailwind's utility class
        placeholder="Enter Price"
        value={formData.price}
        onChange={(e) => {
          const value = e.target.value;
          if (/^\d*(\.\d{0,2})?$/.test(value)) {
            setFormData({ ...formData, price: value }); // Allows float numbers with up to two decimals
          }
        }}
      />
    </>
  );
};

export default AddPrice;
