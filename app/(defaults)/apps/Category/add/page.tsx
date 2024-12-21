import AddCategory from "@/components/Category/AddCategory";
import React from "react";
import Link from "next/link";

const AddCategoryPage = () => {
  return (
    <>
      <div>
        <ul className="flex space-x-2 rtl:space-x-reverse">
          <li>
            <Link href="/sales" className="text-primary hover:underline">
              Dashboard
            </Link>
          </li>
          <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
            <span>Add Category</span>
          </li>
        </ul>
        <div className="pt-5">
          <AddCategory />
        </div>
      </div>
    </>
  );
};

export default AddCategoryPage;
