import React from "react";

interface AddStockProps {
  stock: string;
  setStock: (value: string) => void;
}

const AddStock: React.FC<AddStockProps> = ({ stock, setStock }) => {
  return (
    <>
      <label htmlFor="stock" className="mb-0 w-1/3 ltr:mr-2 rtl:ml-2">
        Stock
      </label>
      <input
        id="stock"
        type="text"
        name="stock"
        className="form-input flex-1 appearance-none" // Use Tailwind's utility class
        placeholder="Enter Stock"
        value={stock}
        onChange={(e) => { setStock(e.target.value);}}
      />
    </>
  );
};

export default AddStock;
