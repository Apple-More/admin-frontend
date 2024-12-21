import React, { useState, useEffect } from "react";
import Select from "react-select";
import { getCategories } from "@/services/ProductService";

interface AddCategoryProps {
  category: string;
  setCategory: (category: any) => void;
}

const AddCategory: React.FC<AddCategoryProps> = ({ category, setCategory }) => {
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const response = await getCategories();

      const categories = response.data;

      const categoryOptions = categories.map((category: any) => ({
        value: category.id,
        label: category.categoryName,
      }));

      setCategories(categoryOptions);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Handle category selection
  const handleCategoryChange = (selectedOption: { value: string; label: string } | null) => {
    setCategory(selectedOption);
  };

  return (
    <div className="mb-4 flex items-center">
      <label htmlFor="category" className="mr-4">
        Category
      </label>
      <div className="flex-1">
        <Select
          id="category"
          options={categories} // Options for dropdown
          placeholder="Select Category"
          value={category} // Selected value
          onChange={handleCategoryChange} // Handle selection
        />
      </div>
    </div>
  );
};

export default AddCategory;
