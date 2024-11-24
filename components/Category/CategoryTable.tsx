"use client";
import IconEdit from "@/components/icon/icon-edit";
import IconEye from "@/components/icon/icon-eye";
import IconPlus from "@/components/icon/icon-plus";
import IconTrashLines from "@/components/icon/icon-trash-lines";
import { sortBy } from "lodash";
import { DataTableSortStatus, DataTable } from "mantine-datatable";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const CategoryTable = () => {
  const [items, setItems] = useState([
    {
      CategoryId: 1,
      CategoryName: "Laurie Fox",
      description: "Laurie Fox",
      specification: "Laurie Fox",
      categoryId: 1,
      CategoryImage: "example.jpg",
    },
  ]);
  const [initialRecords, setInitialRecords] = useState(
    sortBy(items, "CategoryId")
  );
  const [records, setRecords] = useState(initialRecords);
  const [search, setSearch] = useState("");
  const deleteRow = (id: any = null) => {
    console.log("deleteRow", id);
  };

  return (
    <>
      <div className="panel border-white-light px-0 dark:border-[#1b2e4b]">
        <div className="Category-table">
          <div className="mb-4.5 flex flex-col gap-5 px-5 md:flex-row md:items-center">
            <div className="flex items-center gap-2">
              {/* <button
                type="button"
                className="btn btn-danger gap-2"
                onClick={() => deleteRow()}
              >
                <IconTrashLines />
                Delete
              </button> */}
              <Link href="/apps/Category/add" className="btn btn-primary gap-2">
                <IconPlus />
                Add New
              </Link>
            </div>
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
                  accessor: "Category ID",
                  sortable: true,
                  render: ({ CategoryId }) => (
                    <Link href="/apps/Category/preview">
                      <div className="font-semibold text-primary underline hover:no-underline">{`${CategoryId}`}</div>
                    </Link>
                  ),
                },
                {
                  accessor: "Category Name",
                  sortable: true,
                  render: ({ CategoryName }) => (
                    <div className="font-semibold">{`${CategoryName}`}</div>
                  ),
                },
                
                {
                  accessor: "action",
                  title: "Actions",
                  sortable: false,
                  textAlignment: "center",
                  render: ({ CategoryId }) => (
                    <div className="mx-auto flex w-max items-center gap-4">
                      <Link
                        href="/apps/Category/edit"
                        className="flex hover:text-info"
                      >
                        <IconEdit className="h-4.5 w-4.5" />
                      </Link>
                      {/* <Link
                        href="/apps/Categorys/preview"
                        className="flex hover:text-primary"
                      >
                        <IconEye />
                      </Link> */}
                      <button
                        type="button"
                        className="flex hover:text-danger"
                        onClick={(e) => deleteRow(CategoryId)}
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

export default CategoryTable;
