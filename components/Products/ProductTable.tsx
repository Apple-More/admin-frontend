"use client";
import IconEdit from "@/components/icon/icon-edit";
import IconPlus from "@/components/icon/icon-plus";
import IconTrashLines from "@/components/icon/icon-trash-lines";
import IconEye from "@/components/icon/icon-eye";
import { sortBy } from "lodash";
import { DataTable } from "mantine-datatable";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { getAllProducts } from "@/services/ProductService";
import { Product } from "@/types/ProductType";
import EditProduct from "./EditProduct/EditProduct";
import PreviewProduct from "./PreviewProduct/PreviewProduct";

const ProductTable = () => {
  const [selectedProduct, setSelectedProduct] = useState<string | undefined>();
  const [items, setItems] = useState([] as Product[]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getAllProducts();
        if (response.status === 1) {
          setItems(response.data);
        } else {
          console.log("Error fetching products");
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchProduct();
  }, []);

  const handleEditClick = (productId: string) => {
    setSelectedProduct(productId);
    if (selectedProduct !== undefined) {
      EditProduct({ productId: selectedProduct });
    }
  };

  const handlePreviewClick = (productId: string) => {
    setSelectedProduct(productId);
    if (selectedProduct !== undefined) {
      PreviewProduct({ productId: selectedProduct });
    }

    const [initialRecords, setInitialRecords] = useState(
      sortBy(items, "productId")
    );
    const [records, setRecords] = useState(initialRecords);
    const [search, setSearch] = useState("");

    const deleteRow = (productId: string | null) => {
      console.log("deleteRow", productId);
    };

    return (
      <>
        <div className="panel border-white-light px-0 dark:border-[#1b2e4b]">
          <div className="product-table">
            <div className="mb-4.5 flex flex-col gap-5 px-5 md:flex-row md:items-center">
              <div className="flex items-center gap-2">
                <Link
                  href="/apps/products/add"
                  className="btn btn-primary gap-2"
                >
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
                        {variants.map((variant) => (
                          <li key={variant.variantId}>
                            <strong>{`Variant ${variant.variantId}`}</strong>
                            <ul className="list-circle ml-4 list-inside">
                              {Object.entries(variant.attributes).map(
                                ([key, value]) => (
                                  <li key={key}>
                                    {key}: {value}
                                  </li>
                                )
                              )}
                              <li>{variant.price}</li>
                              <li>{variant.stock}</li>
                            </ul>
                          </li>
                        ))}
                      </ul>
                    ),
                  },
                  {
                    accessor: "Category",
                    sortable: true,
                    render: ({ category }) => (
                      <div className="font-semibold">{category}</div>
                    ),
                  },
                  {
                    accessor: "action",
                    title: "Actions",
                    sortable: false,
                    textAlignment: "center",
                    render: ({ productId }) => (
                      <div className="mx-auto flex w-max items-center gap-4">
                        <button
                          type="button"
                          className="flex hover:text-info"
                          onClick={() => handleEditClick(productId)}
                        >
                          <IconEdit className="h-4.5 w-4.5" />
                        </button>
                        <button
                          type="button"
                          className="flex hover:text-primary"
                          onClick={() => handlePreviewClick(productId)}
                        >
                          <IconEye />
                        </button>
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
};

export default ProductTable;
