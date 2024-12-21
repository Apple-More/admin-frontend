"use client";
import IconEdit from "@/components/icon/icon-edit";
import IconPlus from "@/components/icon/icon-plus";
import IconTrashLines from "@/components/icon/icon-trash-lines";
import IconEye from "@/components/icon/icon-eye";
import { sortBy } from "lodash";
import { DataTable } from "mantine-datatable";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { getAllProducts, getCategories } from "@/services/ProductService";
import { Product } from "@/types/ProductType";
import EditProduct from "./EditProduct/EditProduct";
import PreviewProduct from "./PreviewProduct/PreviewProduct";
import { Category } from "@/types/CategoryType";
import { useRouter } from "next/navigation";

// Import Mantine Modal
import { Modal, Tooltip } from "@mantine/core";

const ProductTable = () => {
  const router = useRouter();
  const [selectedProduct, setSelectedProduct] = useState<string | undefined>();
  const [items, setItems] = useState([] as Product[]);
  const [search, setSearch] = useState("");
  const [records, setRecords] = useState<Category[]>([]);

  // State to control modal visibility
  const [modalOpened, setModalOpened] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        const categories = response.data;
        categories.forEach((category: any, index: number) => {
          category.categoryId = index + 1;
        });
        setRecords(categories);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getAllProducts();
        setItems(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProduct();
  }, []);

  const getCategoryNameById = (categoryId: string) => {
    const category = records.find((cat: any) => cat.id === categoryId);
    return category ? category.categoryName : "Unknown Category";
  };

  const handlePreviewClick = (productId: string) => {
    console.log(productId);
    setSelectedProduct(productId); // Set the selected product ID to trigger rendering
    setModalOpened(true); // Open the modal
  };

  const deleteRow = (productId: string | null) => {
    console.log("deleteRow", productId);
  };

  const filteredItems = items.filter((item) =>
    item.productName.toLowerCase().includes(search.toLowerCase())
  );

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
              records={filteredItems}
              columns={[
                {
                  accessor: "productNumber",
                  title: "No",
                  textAlignment: "center",
                  sortable: false,
                  render: (_, index) => (
                    <div className="text-center">{index + 1}</div>
                  ),
                },
                {
                  accessor: "Hero Image",
                  title: "Hero Image",
                  textAlignment: "center",
                  sortable: false,
                  render: ({ images }) => {
                    const heroImage = images.find(
                      (image) => image.isHero
                    )?.imageUrl;
                    return heroImage ? (
                      <img
                        src={heroImage}
                        alt="Hero"
                        className="h-16 w-16 rounded object-cover"
                      />
                    ) : (
                      <span>No Image</span>
                    );
                  },
                },
                {
                  accessor: "Product Name",
                  title: "Product Name",
                  textAlignment: "center",
                  sortable: false,
                  render: ({ productName }) => (
                    <div className="font-semibold">{productName}</div>
                  ),
                },
                {
                  accessor: "Description",
                  title: "Description",
                  textAlignment: "center",
                  sortable: false,
                  render: ({ description }) => (
                    <div className="w-48 font-semibold">
                      <Tooltip label={description} withArrow position="top">
                        <p className=" justify-normal truncate text-justify transition-all hover:whitespace-normal hover:text-blue-500">
                          {description}
                        </p>
                      </Tooltip>
                    </div>
                  ),
                },
                {
                  accessor: "Specification",
                  title: "Specification",
                  textAlignment: "center",
                  sortable: false,
                  render: ({ specification }) => (
                    <div className="w-48 font-semibold">
                      <Tooltip label={specification} withArrow position="top">
                        <p className=" justify-normal truncate text-justify transition-all hover:whitespace-normal hover:text-blue-500">
                          {specification}
                        </p>
                      </Tooltip>
                    </div>
                  ),
                },
                {
                  accessor: "Variants",
                  title: "Variants",
                  textAlignment: "center",
                  sortable: false,
                  render: ({ variants }) => (
                    <ul className="list-inside list-disc space-y-4">
                      {variants.map((variant, index) => (
                        <li key={variant.id}>
                          <strong>{`Variant ${index + 1}`}</strong>
                          <ul className="list-circle ml-4 list-inside">
                            <li>Price: {variant.price}</li>
                            <li>Stock: {variant.stock}</li>
                          </ul>
                        </li>
                      ))}
                    </ul>
                  ),
                },
                {
                  accessor: "Category",
                  title: "Category",
                  textAlignment: "center",
                  sortable: false,
                  render: ({ categoryId }) => (
                    <div className="font-semibold">
                      {getCategoryNameById(categoryId)}{" "}
                      {/* Display category name */}
                    </div>
                  ),
                },
                {
                  accessor: "action",
                  title: "Actions",
                  sortable: false,
                  textAlignment: "center",
                  render: ({ id }) => (
                    <div className="mx-auto flex w-max items-center gap-4">
                      <button
                        type="button"
                        className="flex hover:text-primary"
                        onClick={() => handlePreviewClick(id)}
                      >
                        <IconEye />
                      </button>
                      <button
                        type="button"
                        className="flex hover:text-danger"
                        onClick={() => deleteRow(id)}
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

      {/* Conditionally render PreviewProduct inside a Modal when a product is selected */}
      <Modal
        opened={modalOpened}
        onClose={() => setModalOpened(false)} // Close the modal
        title="Product Preview"
        size="lg"
      >
        {selectedProduct && <PreviewProduct productId={selectedProduct} />}
      </Modal>
    </>
  );
};

export default ProductTable;
