import React from "react";

interface AddAttributesProps {
  attributeList: string[];
  handleAttributeChange: (attribute: string, value: string) => void;
  addNewAttribute: () => void;
  selectedAttributes: string[];
  newAttribute: string;
  setNewAttribute: React.Dispatch<React.SetStateAction<string>>;
  toggleAttribute: (attribute: string) => void;
  formData: {
    productName: string;
    description: string;
    price: string;
    stock: string;
    attributes: Record<string, string>;
  };
}

const AddAttributes: React.FC<AddAttributesProps> = ({
  attributeList,
  selectedAttributes,
  handleAttributeChange,
  addNewAttribute,
  newAttribute,
  setNewAttribute,
  toggleAttribute,
  formData,
}) => {
  return (
    <>
      {/* Attribute Selection */}
      <div className="mb-6">
        <div className="mb-2">Select Attributes:</div>
        <div className="flex flex-wrap gap-2">
          {attributeList.map((attribute) => (
            <button
              key={attribute}
              type="button"
              className={`btn ${
                selectedAttributes.includes(attribute)
                  ? "btn-primary"
                  : "btn-outline-primary"
              }`}
              onClick={() => toggleAttribute(attribute)}
            >
              {attribute}
            </button>
          ))}
        </div>
      </div>

      {/* Add New Attribute */}
      <div className="mt-4 flex items-center gap-2">
        <input
          type="text"
          value={newAttribute}
          onChange={(e) => setNewAttribute(e.target.value)}
          className="form-input flex-1"
          placeholder="Enter New Attribute"
        />
        <button
          type="button"
          className="btn btn-secondary"
          onClick={addNewAttribute}
        >
          Add
        </button>
      </div>

      {/* Dynamic Attribute Fields */}
      <div className="mt-4">
        {selectedAttributes.map((attribute) => (
          <div key={attribute} className="mt-4 flex items-center">
            <label htmlFor={attribute} className="mb-0 w-1/3 ltr:mr-2 rtl:ml-2">
              {attribute}
            </label>
            <input
              id={attribute}
              type="text"
              name={attribute}
              className="form-input flex-1"
              placeholder={`Enter ${attribute}`}
              value={formData.attributes[attribute] || ""}
              onChange={(e) => handleAttributeChange(attribute, e.target.value)}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default AddAttributes;
