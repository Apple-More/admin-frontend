"use client";
import IconEdit from "@/components/icon/icon-edit";
import IconEye from "@/components/icon/icon-eye";
import IconPlus from "@/components/icon/icon-plus";
import IconTrashLines from "@/components/icon/icon-trash-lines";
import { sortBy } from "lodash";
import { DataTableSortStatus, DataTable } from "mantine-datatable";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const CustomerTable = () => {
  const [items, setItems] = useState([
    {
      customer_id: 1,
      Customer_Name: "Laurie Fox",
      Email: "laurie.fox@example.com",
      Phone_Number: "123-456-7890",
      Recently_Active: "2024-11-23",
    },
  ]);
  const [initialRecords, setInitialRecords] = useState(
    sortBy(items, "customer_id")
  );
  const [records, setRecords] = useState(initialRecords);
  const [search, setSearch] = useState("");
  const deleteRow = (id: any = null) => {
    console.log("deleteRow", id);
  };

  return (
    <>
      <div className="panel border-white-light px-0 dark:border-[#1b2e4b]">
        <div className="Customer-table">
          <div className="mb-4.5 flex flex-col gap-5 px-5 md:flex-row md:items-center">
           <div className="text-lg">Customers</div>
            <div className="ltr:ml-auto rtl:mr-auto">
              <input
                type="text"
                className="form-input w-auto"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="datatables pagination-padding">
            <DataTable
              className="table-hover whitespace-nowrap"
              records={records}
              columns={[
                {
                  accessor: "Customer ID",
                  sortable: true,
                  render: ({ customer_id }) => (
                    <Link href="/apps/Customers/preview">
                      <div className="font-semibold text-primary underline hover:no-underline">{`${customer_id}`}</div>
                    </Link>
                  ),
                },
                {
                  accessor: "Customer Name",
                  sortable: true,
                  render: ({ Customer_Name }) => (
                    <div className="font-semibold">{`${Customer_Name}`}</div>
                  ),
                },
                {
                  accessor: "Email",
                  sortable: true,
                  render: ({ Email }) => (
                    <div>{`${Email}`}</div>
                  ),
                },
                {
                  accessor: "Phone Number",
                  sortable: true,
                  render: ({ Phone_Number }) => (
                    <div>{`${Phone_Number}`}</div>
                  ),
                },
                {
                  accessor: "Recently Active",
                  sortable: true,
                  render: ({ Recently_Active }) => (
                    <div>{`${Recently_Active}`}</div>
                  ),
                },
                {
                  accessor: "action",
                  title: "Actions",
                  sortable: false,
                  textAlignment: "center",
                  render: ({ customer_id }) => (
                    <div className="mx-auto flex w-max items-center gap-4">
                    
                      <Link
                        href="/apps/Customers/preview"
                        className="flex hover:text-primary"
                      >
                        <IconEye />
                      </Link>
                      <button
                        type="button"
                        className="flex hover:text-danger"
                        onClick={(e) => deleteRow(customer_id)}
                      >
                        <IconTrashLines />
                      </button>
                    </div>
                  ),
                },
              ]}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerTable;

