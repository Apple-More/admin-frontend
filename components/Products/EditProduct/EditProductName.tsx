import React from "react";
interface EditProductNameProps {
  formData: {
    productName: string;
    description: string;
    category: string[];
    price: string;
    stock: string;
    attributes: Record<string, string>;
  };
  handleInputChange: React.ChangeEventHandler<HTMLInputElement>;
}

const EditProductName: React.FC<EditProductNameProps> = ({
  formData,
  handleInputChange,
}) => {
  return (
    <>
      <label htmlFor="productName" className="mb-0 w-1/3 ltr:mr-2 rtl:ml-2">
        Product Name
      </label>
      <input
        id="productName"
        type="text"
        name="productName"
        className="form-input flex-1"
        placeholder="Enter Product Name"
        defaultValue={formData.productName}
        onChange={handleInputChange}
      />
    </>
  );
};

export default EditProductName;
