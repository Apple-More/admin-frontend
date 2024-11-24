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
      <CategoryTable />
    </>
  );
};

export default CategorysList;
