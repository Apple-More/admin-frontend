import React from "react";

interface AddPriceProps {
  price: string;
  setPrice: (price: string) => void;
}

const AddPrice: React.FC<AddPriceProps> = ({ price, setPrice }) => {
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
        value={price}
        onChange={(e) => { setPrice(e.target.value); }}
      />
    </>
  );
};

export default AddPrice;
