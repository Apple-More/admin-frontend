import React from "react";

interface AddAttributesProps {
  attributeList: any[];
  selectedAttributesList: any[];
  setSelectedAttributesList: (attributes: any[]) => void;
  toggleAttribute: (attribute: any) => void;
  newAttribute: string;
  setNewAttribute: (value: string) => void;
  addNewAttribute: () => void;
}

const AddAttributes: React.FC<AddAttributesProps> = ({
    attributeList,
    setSelectedAttributesList,
    selectedAttributesList,
    toggleAttribute,
    newAttribute,
    setNewAttribute,
    addNewAttribute
  }) => {
  return (
    <>
      {/* Attribute Selection */}
      <div className="mb-6">
        <div className="mb-2">Select Attributes:</div>
        <div className="flex flex-wrap gap-2">
          {attributeList.map((attribute:any) => (
            <button
              key={attribute.id}
              type="button"
              className={`btn ${
              selectedAttributesList.some((attr) => attr.id === attribute.id)
                ? "btn-primary"
                : "btn-outline-primary"
              }`}
              onClick={() => toggleAttribute(attribute)}
            >
              {attribute.name}
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
        {selectedAttributesList.map((attribute) => (
            <div key={attribute.id} className="mt-4 flex items-center">
            <label htmlFor={attribute.id} className="mb-0 w-1/3 ltr:mr-2 rtl:ml-2">
              {attribute.name}
            </label>
            <input
              id={attribute.id}
              type="text"
              name={attribute.name}
              className="form-input flex-1"
              placeholder={`Enter ${attribute.name}`}
              value={attribute.value || ""}
              onChange={(e) => {
              const updatedAttributes = selectedAttributesList.map((attr) =>
                attr.id === attribute.id ? { ...attr, value: e.target.value } : attr
              );
              setSelectedAttributesList(updatedAttributes);
              }}
            />
            </div>
        ))}
      </div>
    </>
  );
};

export default AddAttributes;
