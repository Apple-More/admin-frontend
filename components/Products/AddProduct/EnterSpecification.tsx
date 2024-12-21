import React from "react";

interface EnterSpecificationProps {
  specifications: string;
  setSpecifications: (value: string) => void;
}

const EnterSpecification: React.FC<EnterSpecificationProps> = ({
  specifications, setSpecifications
}) => {
  return (
    <>
      <label htmlFor="specification" className="mb-0 w-1/3 ltr:mr-2 rtl:ml-2">
        Specification
      </label>
      <textarea
        id="specification"
        name="specification"
        className="form-input flex-1"
        placeholder="Enter Specification"
        rows={4}
        value={specifications}
        onChange={(e) => setSpecifications(e.target.value)}
      />
    </>
  );
};

export default EnterSpecification;
