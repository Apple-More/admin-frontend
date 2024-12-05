import React from "react";
interface EnterDescriptionProps {
  formData: {
    productName: string;
    description: string;
    price: string;
    stock: string;
    attributes: Record<string, string>;
  };
  handleInputChange: React.ChangeEventHandler<HTMLTextAreaElement>;
}

const EnterDescription: React.FC<EnterDescriptionProps> = ({
  formData,
  handleInputChange,
}) => {
  return (
    <>
      <label htmlFor="description" className="mb-0 w-1/3 ltr:mr-2 rtl:ml-2">
        Description
      </label>
      <textarea
        id="description"
        name="description"
        className="form-input flex-1"
        placeholder="Enter Description"
        rows={4}
        value={formData.description}
        onChange={handleInputChange}
      />
    </>
  );
};

export default EnterDescription;
