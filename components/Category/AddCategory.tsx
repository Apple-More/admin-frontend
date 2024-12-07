"use client";
import IconDownload from "@/components/icon/icon-download";
import IconEye from "@/components/icon/icon-eye";
import IconSave from "@/components/icon/icon-save";
import IconSend from "@/components/icon/icon-send";
import IconX from "@/components/icon/icon-x";
import Link from "next/link";
import React, { useState } from "react";
import { addCategory } from "@/services/ProductService";
import { useRouter } from "next/navigation";

const AddCategory = () => {
  const [categoryName, setCategoryName] = useState("");

  const router = useRouter();

  const handleSave = async () => {
    try {
      await addCategory({ categoryName });

      alert("Category saved successfully!");

      router.push("/apps/Category/list");
    } catch (error) {
      console.error("Error saving product:", error);
      alert("An error occurred while saving the product.");
    }
  };

  return (
    <div className="flex flex-col gap-2.5 xl:flex-row">
      <div className="panel flex-1 px-0 py-6 ltr:xl:mr-6 rtl:xl:ml-6">
        <div className="mt-8 px-4">
          <div className="flex flex-col justify-between lg:flex-row">
            <div className="mb-6 w-full ltr:lg:mr-6 rtl:lg:ml-6">
              <div className="text-lg">Add Category</div>
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
                  onChange={(e) => setCategoryName(e.target.value)} // Corrected line
                />
              </div>
            </div>
            </div>
          </div>
          
          <div className="mt-6 w-full xl:mt-0 ">
            <div className="panel">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-1">
                <button
                  type="button"
                  className="btn btn-success w-full gap-2"
                  onClick={handleSave}
                >
                  <IconSave className="shrink-0 ltr:mr-2 rtl:ml-2" />
                  Save
                </button>
              </div>
              </div>
          
        </div>
      </div>
    </div>
  );
};

export default AddCategory;
