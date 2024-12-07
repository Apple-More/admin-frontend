import AddProduct from "@/components/Products/AddProduct/AddProduct";
import React from "react";
import Link from "next/link";

const AddProductPage = () => {
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
            <span>Add Product</span>
          </li>
        </ul>
        <div className="pt-5">
          <AddProduct />
        </div>
      </div>
    </>
  );
};

export default AddProductPage;
