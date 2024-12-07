import React from "react";

interface EnterProductNameProps {
  productName: string;
  setProductName: (name: string) => void;
}

const EnterProductName: React.FC<EnterProductNameProps> = ({
  productName, setProductName,
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
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
      />
    </>
  );
};

export default EnterProductName;
