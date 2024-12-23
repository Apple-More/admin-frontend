import React from "react";
interface EnterDescriptionProps {
  description: string;
  setDescription: (value: string) => void;
}

const EnterDescription: React.FC<EnterDescriptionProps> = ({
  description, setDescription
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
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
    </>
  );
};

export default EnterDescription;
