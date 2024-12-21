"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import SavePanel from "../SavePanel";
import { Product } from "@/types/ProductType";
import { ProductVariant } from "@/types/ProductVariantType";
import EditAttributes from "./EditAttributes";
import EditPrice from "./EditPrice";
import EditStock from "./EditStock";
import EditHeroImage from "./EditHeroImage";
import EditImages from "./EditImages";
import EditDescription from "./EditDescription";
import EditProductName from "./EditProductName";
import AddCategory from "../AddProduct/AddCategory";
import { updateProduct } from "@/services/ProductService";
import { toast } from "react-toastify";

interface EditProductProps {
  productId: string;
}

const EditProduct: React.FC<EditProductProps> = ({ productId }) => {
  const router = useRouter();

  const [attributeList, setAttributeList] = useState<string[]>([
    "Color",
    "Display Size",
    "RAM",
    "Storage",
    "Warranty",
  ]);

  const [selectedAttributes, setSelectedAttributes] = useState<string[]>([]);
  const [newAttribute, setNewAttribute] = useState<string>("");
  const [formData, setFormData] = useState({
    productName: "",
    description: "",
    category: [] as string[],
    price: "",
    stock: "",
    attributes: {} as Record<string, string>,
  });

  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [heroImage, setHeroImage] = useState<File | null>(null);
  const [previewHeroImage, setPreviewHeroImage] = useState<string[]>([]);
  const [productVariants, setProductVariants] = useState<ProductVariant[]>([]);

  // Fetch existing product data
  useEffect(() => {
    const fetchProduct = async () => {
      if (productId) {
        try {
          const response = await fetch(`/api/products/${productId}`);
          if (response.ok) {
            const product = await response.json();
            setFormData({
              productName: product.productName || "",
              description: product.description || "",
              category: product.category || [],
              price: product.price || "",
              stock: product.stock || 0,
              attributes: product.attributes || {},
            });
            setSelectedAttributes(Object.keys(product.attributes || {}));
            setPreviewImages(product.images || []); // Assuming `product.images` is an array of image URLs.
            setPreviewHeroImage(product.heroImage || []); // Assuming `product.heroImage` is an array of image URLs.
            setProductVariants(product.variants || []);
          } else {
            alert("Failed to fetch product data.");
          }
        } catch (error) {
          console.error("Error fetching product:", error);
        }
      }
    };

    fetchProduct();
  }, [productId]);

  const toggleAttribute = (attribute: string) => {
    if (selectedAttributes.includes(attribute)) {
      setSelectedAttributes(
        selectedAttributes.filter((attr) => attr !== attribute)
      );
      setFormData((prev) => {
        const updatedAttributes = { ...prev.attributes };
        delete updatedAttributes[attribute];
        return { ...prev, attributes: updatedAttributes };
      });
    } else {
      setSelectedAttributes([...selectedAttributes, attribute]);
    }
  };

  const addNewAttribute = () => {
    if (newAttribute.trim() && !attributeList.includes(newAttribute)) {
      setAttributeList([...attributeList, newAttribute.trim()]);
      setNewAttribute("");
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleAttributeChange = (attribute: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      attributes: {
        ...prev.attributes,
        [attribute]: value,
      },
    }));
  };

  const handleAddVariant = () => {
    const newVariant: ProductVariant = {
      variantId: "",
      price: formData.price,
      stock: formData.stock,
      attributes: { ...formData.attributes },
    };

    setProductVariants((prev) => [...prev, newVariant]);

    // Reset variant-specific fields
    setFormData((prev) => ({
      ...prev,
      price: "",
      stock: "",
      attributes: {},
    }));
  };

  const handleUpdateProduct = async () => {
    try {
      const product: Product = {
        productId: "",
        productName: formData.productName,
        description: formData.description,
        category: formData.category,
        images: images.map((image) => URL.createObjectURL(image)),
        heroImage: heroImage ? URL.createObjectURL(heroImage) : "",
        variants: productVariants,
      };

      const response = await updateProduct(productId, product);

      if (response.status === 1) {
        toast.success("Product updated successfully!");
        router.push("/apps/products"); // Redirect to the product list page or desired page
      } else {
        toast.error("Failed to update product.");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("An error occurred while updating the product.");
    }
  };

  return (
    <div className="flex flex-col gap-2.5 xl:flex-row">
      <div className="panel flex-1 px-0 py-6 ltr:xl:mr-6 rtl:xl:ml-6">
        <div className="mt-8 px-4">
          <div className="flex flex-col justify-between lg:flex-row">
            <div className="mb-6 w-full  ltr:lg:mr-6 rtl:lg:ml-6">
              <div className="text-lg">Edit Product :-</div>
              <div className="mt-4 flex items-center">
                <EditProductName {...{ formData, handleInputChange }} />
              </div>
              <div className="mt-4 flex items-center">
                <EditDescription {...{ formData, handleInputChange }} />
              </div>
              <div className="mt-4 flex items-center">
                <AddCategory {...{ formData, setFormData }} />
              </div>
              {/* Product Specifications */}
              <div className="mt-8">
                <div className="mb-4 text-lg">
                  Select Product Specifications:
                </div>

                <EditAttributes
                  {...{
                    attributeList,
                    selectedAttributes,
                    newAttribute,
                    formData,
                    handleAttributeChange,
                    toggleAttribute,
                    addNewAttribute,
                    setNewAttribute,
                  }}
                />
              </div>
              {/* End of Product Specifications */}
              <div className="mt-4 flex items-center">
                <EditPrice {...{ formData, setFormData }} />
              </div>
              <div className="mt-4 flex items-center">
                <EditStock {...{ formData, setFormData }} />
              </div>

              {/* Add Product Variant Button */}
              <div className="mt-4">
                <button
                  onClick={handleAddVariant}
                  className="btn btn-primary w-full"
                >
                  Add Product Variant
                </button>
              </div>
              {/* Display Variants */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold">Product Variants</h3>
                {productVariants.length === 0 ? (
                  <p>No variants added yet.</p>
                ) : (
                  <ul className="mt-4 space-y-2">
                    {productVariants.map((variant, index) => (
                      <li key={index} className="rounded border p-2">
                        <div>
                          <strong>Variant {index + 1}:</strong>{" "}
                          {variant.attributes &&
                            Object.entries(variant.attributes).map(
                              ([key, value]) => (
                                <span key={key}>
                                  {key}: {value}{" "}
                                </span>
                              )
                            )}
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

              <div className="mt-4 flex items-center">
                <EditHeroImage
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
                <EditImages {...{ previewImages, setPreviewImages }} />
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
          </div>
        </div>
        <div className="panel m-2">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-1">
            <SavePanel handleSave={handleUpdateProduct} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
