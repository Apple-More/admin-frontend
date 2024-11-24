"use client";

import IconSave from "@/components/icon/icon-save";
import React, { useState, useEffect } from "react";

interface EditCategoryProps {
  categoryId: string; // Define the type of categoryId
}

const EditCategory: React.FC<EditCategoryProps> = ({ categoryId }) => {
  const [categoryName, setCategoryName] = useState<string>(""); // Specify the type as string
  const [isLoading, setIsLoading] = useState<boolean>(false); // Specify the type as boolean

  // Fetch the existing category data
  useEffect(() => {
    const fetchCategory = async (): Promise<void> => {
      try {
        setIsLoading(true);
        // Simulate an API call to fetch category data by ID
        const categoryData = await fetch(`/api/categories/${categoryId}`).then(
          (res) => {
            if (!res.ok) {
              throw new Error("Failed to fetch category details");
            }
            return res.json();
          }
        );
        setCategoryName(categoryData.name || "");
      } catch (error) {
        console.error("Error fetching category:", error);
        alert("Failed to fetch category details.");
      } finally {
        setIsLoading(false);
      }
    };

    if (categoryId) {
      fetchCategory();
    }
  }, [categoryId]);

  const handleUpdate = async (): Promise<void> => {
    try {
      setIsLoading(true);
      // Simulate an API call to update the category
      const response = await fetch(`/api/categories/${categoryId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: categoryName }),
      });

      if (!response.ok) {
        throw new Error("Failed to update category");
      }
      alert("Category updated successfully!");
    } catch (error) {
      console.error("Error updating category:", error);
      alert("An error occurred while updating the category.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2.5 xl:flex-row">
      <div className="panel flex-1 px-0 py-6 ltr:xl:mr-6 rtl:xl:ml-6">
        <div className="mt-8 px-4">
          <div className="flex flex-col justify-between lg:flex-row">
            <div className="mb-6 w-full ltr:lg:mr-6 rtl:lg:ml-6">
              <div className="text-lg">Edit Category:</div>
              <div className="mt-4 flex items-center">
                <label
                  htmlFor="categoryName"
                  className="mb-0 w-1/3 ltr:mr-2 rtl:ml-2"
                >
                  Category Name
                </label>
                <input
                  id="categoryName"
                  type="text"
                  name="categoryName"
                  className="form-input flex-1"
                  placeholder="Enter Category Name"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  disabled={isLoading}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 w-full xl:mt-0">
          <div className="panel">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-1">
              <button
                type="button"
                className="btn btn-success w-full gap-2"
                onClick={handleUpdate}
                disabled={isLoading}
              >
                <IconSave className="shrink-0 ltr:mr-2 rtl:ml-2" />
                {isLoading ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCategory;
