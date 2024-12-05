"use client";
import IconEdit from "@/components/icon/icon-edit";
import IconPlus from "@/components/icon/icon-plus";
import IconTrashLines from "@/components/icon/icon-trash-lines";
import IconEye from "@/components/icon/icon-eye";
import { sortBy } from "lodash";
import { DataTable } from "mantine-datatable";
import Link from "next/link";
import React, { useState } from "react";

const ProductTable = () => {
  const [items, setItems] = useState([
    {
      productId: 1,
      productName: "Laurie Fox",
      description: "A stylish and durable smartphone.",
      heroImage: "/images/products/hero-black-edition.jpg",
      variants: [
        {
          variantId: 1,
          variantName: "Black Edition",
          specifications: {
            Color: "Black",
            "Display Size": "6.1 inches",
            RAM: "6GB",
            Storage: "128GB",
            Warranty: "2 years",
          },
        },
        {
          variantId: 2,
          variantName: "Gold Edition",
          specifications: {
            Color: "Gold",
            "Display Size": "6.1 inches",
            RAM: "8GB",
            Storage: "256GB",
            Warranty: "2 years",
          },
        },
      ],
      categoryId: 1,
      productImage: "example.jpg",
    },
  ]);

  const [initialRecords, setInitialRecords] = useState(
    sortBy(items, "productId")
  );
  const [records, setRecords] = useState(initialRecords);
  const [search, setSearch] = useState("");

  const deleteRow = (id: number | null) => {
    console.log("deleteRow", id);
    setRecords(records.filter((item) => item.productId !== id));
  };

  return (
    <>
      <div className="panel border-white-light px-0 dark:border-[#1b2e4b]">
        <div className="product-table">
          <div className="mb-4.5 flex flex-col gap-5 px-5 md:flex-row md:items-center">
            <div className="flex items-center gap-2">
              <Link href="/apps/products/add" className="btn btn-primary gap-2">
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
                  accessor: "Hero Image",
                  title: "Hero Image",
                  sortable: false,
                  render: ({ heroImage }) => (
                    <img
                      src={heroImage}
                      alt="Hero"
                      className="h-16 w-16 rounded object-cover"
                    />
                  ),
                },
                {
                  accessor: "Product Name",
                  sortable: true,
                  render: ({ productName }) => (
                    <div className="font-semibold">{productName}</div>
                  ),
                },
                {
                  accessor: "Specifications",
                  sortable: false,
                  render: ({ variants }) => (
                    <ul className="list-inside list-disc">
                      {variants.map(({ variantId, specifications }) => (
                        <li key={variantId}>
                          <strong>{`Variant ${variantId}`}</strong>
                          <ul className="list-circle ml-4 list-inside">
                            {Object.entries(specifications).map(
                              ([key, value]) => (
                                <li key={key}>
                                  {key}: {value}
                                </li>
                              )
                            )}
                          </ul>
                        </li>
                      ))}
                    </ul>
                  ),
                },
                {
                  accessor: "Category",
                  sortable: true,
                  render: ({ categoryId }) => (
                    <div className="font-semibold">{categoryId}</div>
                  ),
                },
                {
                  accessor: "action",
                  title: "Actions",
                  sortable: false,
                  textAlignment: "center",
                  render: ({ productId }) => (
                    <div className="mx-auto flex w-max items-center gap-4">
                      <Link
                        href="/apps/products/edit"
                        className="flex hover:text-info"
                      >
                        <IconEdit className="h-4.5 w-4.5" />
                      </Link>
                      <Link
                        href="/apps/products/preview"
                        className="flex hover:text-primary"
                      >
                        <IconEye />
                      </Link>
                      <button
                        type="button"
                        className="flex hover:text-danger"
                        onClick={() => deleteRow(productId)}
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

export default ProductTable;
