import React from "react";

interface EditStockProps {
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

const EditStock: React.FC<EditStockProps> = ({ formData, setFormData }) => {
  return (
    <>
      <label htmlFor="stock" className="mb-0 w-1/3 ltr:mr-2 rtl:ml-2">
        Stock
      </label>
      <input
        id="stock"
        type="string"
        name="stock"
        className="form-input flex-1 appearance-none" // Use Tailwind's utility class
        placeholder="Enter Stock"
        defaultValue={formData.stock}
        onChange={(e) => {
          if (/^\d*$/.test(e.target.value)) {
            setFormData((prevData) => ({
              ...prevData,
              stock: e.target.value,
            })); // Allows only numeric input
          }
        }}
      />
    </>
  );
};

export default EditStock;
