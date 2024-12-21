"use client";
import IconEdit from "@/components/icon/icon-edit";
import IconEye from "@/components/icon/icon-eye";
import IconPlus from "@/components/icon/icon-plus";
import IconTrashLines from "@/components/icon/icon-trash-lines";
import CategoryTable from "@/components/Category/CategoryTable";
import { sortBy } from "lodash";
import { DataTableSortStatus, DataTable } from "mantine-datatable";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const CategorysList = () => {
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
            <span>Category List</span>
          </li>
        </ul>
        <div className="pt-5">
          <CategoryTable />
        </div>
      </div>
    </>
  );
};

export default CategorysList;
