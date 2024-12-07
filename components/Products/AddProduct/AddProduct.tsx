"use client";
import React, { useEffect, useState } from "react";
import AddImages from "./AddImages";
import AddHeroImage from "./AddHeroImage";
import AddPrice from "./AddPrice";
import AddStock from "./AddStock";
import { Product } from "@/types/ProductType";
import EnterProductName from "./EnterProductName";
import EnterDescription from "./EnterDescription";
import AddAttributes from "./AddAttributes";
import SavePanel from "../SavePanel";
import { ProductVariant } from "@/types/ProductVariantType";
import AddCategory from "./AddCategory";
import { toast } from "react-toastify";
import { addProduct, getProductAttributes, addProductAttribute, addProductAttributeValue, addProductVariant, addProductVariantAttribute, addHeroImage, addProductImage } from "@/services/ProductService";
import { forEach } from "lodash";

const AddProduct = () => {
  // form data
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<any>("");
  const [specifications, setSpecifications] = useState("");
  const [productId, setProductId] = useState("false");

  // PRODUCT
  const handleAddProduct = async () => {
    try {
      const response = await addProduct({
        productName,
        description,
        specifications,
        categoryId: category.value,
        adminId: "42be0901-cb11-4d86-a0cf-9319d498747c"
      });

      console.log('new product', response.data.id);
      setProductId(response.data.id);
    } catch (error) {
      console.error("Error saving product:", error);
      toast.error("An error occurred while saving the product.");
    }
  };

  // PRODUCT ATTRIBUTES
  const [attributeList, setAttributeList] = useState<any[]>([]);
  const [selectedAttributesList, setSelectedAttributesList] = useState<any[]>([]);
  const [newAttribute, setNewAttribute] = useState<string>("");

  const fetchAttributeList = async () => {
    try {
      const response = await getProductAttributes();

      console.log(response.data);

      setAttributeList(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  const addNewAttribute = async () => {
    try {
      const response = await addProductAttribute({ name: newAttribute });

      console.log(response);

      setNewAttribute("");
      fetchAttributeList();
    } catch (error) {
      console.error(error);
    }
  }

  const toggleAttribute = (attribute: any) => {
    console.log(attribute);

    if (selectedAttributesList.some((attr) => attr.id === attribute.id)) {
      setSelectedAttributesList(
        selectedAttributesList.filter((attr) => attr.id !== attribute.id)
      );
    } else {
      setSelectedAttributesList([...selectedAttributesList, attribute]);
    }
  };

  useEffect(() => {
    console.log("selected", selectedAttributesList);
  }, [selectedAttributesList]);

  useEffect(() => {
    fetchAttributeList();
  }, []);

  // PRODUCT VARIANTS
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [productVariantList, setProductVariantList] = useState<any[]>([]);

  const handleAddProductVariant = () => {
    const attributeValueList: { attributeId: string; value: string }[] = []

    selectedAttributesList.forEach((attribute) => {
      const newVariant = {
        attributeId: attribute.id,
        value: attribute.value,
      }

      attributeValueList.push(newVariant);
    })

    const productVariant = {
      price,
      stock,
      attributeValueList
    }

    setPrice("");
    setStock("");
    setSelectedAttributesList(selectedAttributesList.map(attr => ({ ...attr, value: "" })));
    setProductVariantList([...productVariantList, productVariant]);
  }

  useEffect(() => {
    console.log("variants", productVariantList);
  }, [productVariantList]);

  const saveProductVariant = async () => {
    try {
      console.log("PRODUCT", productId);

      for (let i = 0; i < productVariantList.length; i++) {
        const variant = productVariantList[i];
        console.log("VARIANT", variant);

        const productVariant = await addProductVariant({
          productId,
          price: parseFloat(variant.price),
          stock: parseInt(variant.stock)
        });

        console.log("PRODUCT VARIANT", productVariant);
        console.log("PRODUCT VARIANT ID", productVariant.data.id);

        const variantId = productVariant.data.id;

        // Create attributes values
        const attributeValueIdList: string[] = [];

        for (let j = 0; j < variant.attributeValueList.length; j++) {
          const attribute = variant.attributeValueList[j];
          const response = await addProductAttributeValue({
            attributeId: attribute.attributeId,
            value: attribute.value
          });

          console.log('ATTRIBUTE VALUE ADDED', response.data);
          attributeValueIdList.push(response.data.id);
        }

        console.log("ATTRIBUTE VALUE ID LIST", attributeValueIdList);

        // link attribute values to product variants
        for (let k = 0; k < attributeValueIdList.length; k++) {
          const attributeValueId = attributeValueIdList[k];
          await addProductVariantAttribute({
            productVariantId: variantId,
            attributeValueId
          });
        }

        console.log("COMPLETED");
      }
    } catch (error) {
      console.error(error);
    }
  }

  // PRODUCT IMAGES
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [previewHeroImage, setPreviewHeroImage] = useState<string[]>([]);

  const handleImageUpload = async () => {
    try {
        for (const heroImage of previewHeroImage) {
            const response = await fetch(heroImage);
            const blob = await response.blob();
            const file = new File([blob], "heroImage.jpg", { type: blob.type });
            await addHeroImage(productId, file);
        }

        for (const productImage of previewImages) {
            const response = await fetch(productImage);
            const blob = await response.blob();
            const file = new File([blob], "productImage.jpg", { type: blob.type });
            await addProductImage(productId, file);
        }

        toast.success("Images uploaded successfully.");
    } catch (error) {
        console.error("Error uploading images:", error);
        toast.error("An error occurred while uploading images.");
    }
}

  return (
    <div className="flex flex-col gap-2.5 xl:flex-row">
      <div className="panel flex-1 px-0 py-6 ltr:xl:mr-6 rtl:xl:ml-6">
        <div className="mt-8 px-4">
          <div className="flex flex-col justify-between lg:flex-row">
            <div className="mb-6 w-full  ltr:lg:mr-6 rtl:lg:ml-6">
              <div className="text-lg">Add Product</div>
              <div className="mt-4 flex items-center">
                <EnterProductName {...{ productName, setProductName }} />
              </div>
              <div className="mt-4 flex items-center">
                <EnterDescription {...{ description, setDescription }} />
              </div>
              <div className="mt-4 flex items-center">
                <AddCategory category={category} setCategory={setCategory} />
              </div>

              <div className="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-1">
                <SavePanel handleSave={handleAddProduct} />
              </div>

              {/* Product Specifications */}
              <div className="mt-8">
                <div className="panel">
                  <div className="mb-4 text-lg">
                    Select Product Specifications:
                  </div>

                  <AddAttributes
                    {...{
                      attributeList,
                      setSelectedAttributesList,
                      selectedAttributesList,
                      toggleAttribute,
                      newAttribute,
                      setNewAttribute,
                      addNewAttribute
                    }}
                  />

                  {/* End of Product Specifications */}
                  <div className="mt-4 flex items-center">
                    <AddPrice {...{ price, setPrice }} />
                  </div>
                  <div className="mt-4 flex items-center">
                    <AddStock {...{ stock, setStock }} />
                  </div>

                  {/* Add Product Variant Button */}
                  <div className="mt-4 justify-center">
                    <button
                      onClick={handleAddProductVariant}
                      className="btn bg-secondary text-white"
                    >
                      Add Product Variant
                    </button>
                  </div>
                  {/* Display Variants */}
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold">Product Variants</h3>
                    {productVariantList.length === 0 ? (
                      <p>No variants added yet.</p>
                    ) : (
                      <ul className="mt-4 space-y-2">
                        {productVariantList.map((variant, index) => (
                          <li key={index} className="rounded border p-2">
                            <div key={index}>
                              <strong>Variant {index + 1}:</strong>{" "}
                              {
                                variant.attributeValueList.map((attr: any, index:any) => (
                                  <span key={index}>{attr.value} </span>
                                ))
                              }
                              {variant.price && (
                                <span>Price: {variant.price} </span>
                              )}
                              {variant.stock && (
                                <span>Stock: {variant.stock} </span>
                              )}
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-1">
                  <SavePanel handleSave={saveProductVariant} />
                </div>

                {/* Product Images */}
                <div className="panel mt-4">
                  <div className="mt-4 flex items-center">
                    <AddHeroImage
                      {...{
                        previewHeroImage,
                        setPreviewHeroImage,
                      }}
                    />
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {previewHeroImage.map((src, index) => (
                      <img
                        key={index}
                        src={src}
                        alt={`Preview ${index + 1}`}
                        className="h-20 w-20 rounded border border-gray-300 object-cover"
                      />
                    ))}
                  </div>
                  <div className="mt-4 flex items-center">
                    <AddImages {...{ previewImages, setPreviewImages }} />
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {previewImages.map((src, index) => (
                      <img
                        key={index}
                        src={src}
                        alt={`Preview ${index + 1}`}
                        className="h-20 w-20 rounded border border-gray-300 object-cover"
                      />
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-1">
                    <SavePanel handleSave={handleImageUpload} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
