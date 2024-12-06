import React, { useState, useEffect } from "react";
import Select from "react-select";

interface Category {
  id: string;
  name: string;
}

interface AddCategoryProps {
  formData: {
    productName: string;
    description: string;
    category: string[]; // Array of selected category IDs
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
  >; // To update formData state
}

const AddCategory: React.FC<AddCategoryProps> = ({ formData, setFormData }) => {
  const [categories, setCategories] = useState<Category[]>([]); // Available categories

  // Fetch categories from backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categories"); // Replace with your backend API
        const data = await response.json();
        setCategories(data); // Assuming data is an array of { id, name }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // Handle category selection
  const handleCategoryChange = (
    selectedOptions: { value: string; label: string }[]
  ) => {
    const selectedIds = selectedOptions.map((option) => option.value);
    setFormData((prevData) => ({
      ...prevData,
      category: selectedIds, // Update category with selected IDs
    }));
  };

  // Format categories for react-select
  const categoryOptions = categories.map((cat) => ({
    value: cat.id,
    label: cat.name,
  }));

  return (
    <div className="mb-4 flex items-center">
      <label htmlFor="category" className="mr-4">
        Categories
      </label>
      <div className="flex-1">
        <Select
          id="category"
          isMulti // Enable multi-selection
          options={categoryOptions} // Options for dropdown
          placeholder="Select Categories"
          value={categoryOptions.filter((option) =>
            formData.category.includes(option.value)
          )} // Show selected categories
          onChange={handleCategoryChange} // Handle selection
        />
      </div>
    </div>
  );
};

export default AddCategory;
