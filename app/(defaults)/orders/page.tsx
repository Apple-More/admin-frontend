import ComponentsTablesHover from "@/components/tables/components-tables-hover";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div>
      <ul className="flex space-x-2 rtl:space-x-reverse">
        <li>
          <Link href="/sales" className="text-primary hover:underline">
            Dashboard
          </Link>
        </li>
        <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
          <span>Order List</span>
        </li>
      </ul>
      <div className="pt-5">
        <ComponentsTablesHover />
      </div>
    </div>
  );
};

export default page;
