"use client";

import React, { useEffect, useState } from "react";
// Ensure this function is implemented correctly
import { getCategories, getSingleProduct } from "@/services/ProductService";
import { Product } from "@/types/ProductType";
import { Category } from "@/types/CategoryType";

interface ProductPreviewProps {
  productId: string; // The product ID passed to this component for preview
}

const PreviewProduct: React.FC<ProductPreviewProps> = ({ productId }) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const [records, setRecords] = useState<Category[]>([]);

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
  const fetchProduct = async () => {
    try {
      const response = await getSingleProduct(productId); // Replace with actual API call
      console.log(response.data.data);
      setProduct(response.data.data); // Assuming response.data contains the product details
      setLoading(false);
    } catch (error) {
      setError("Error fetching product details.");
      setLoading(false);
    }
  };

  const getCategoryNameById = (categoryId: string) => {
    const category = records.find((cat: any) => cat.id === categoryId);
    return category ? category.categoryName : "Unknown Category";
  };
  // Fetch product details based on the productId
  useEffect(() => {
    fetchCategories();
    if (productId) fetchProduct();
  }, [productId]);

  // Show loading state while fetching product
  if (loading) return <p>Loading product details...</p>;

  // Show error message if there's an issue with fetching product data
  if (error) return <p>{error}</p>;

  // If product is not found
  if (!product) return <p>Product not found.</p>;

  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-bold">{product.productName}</h1>
      <p className="mb-2 pt-5">
        <strong>Description:</strong>{" "}
        {product.description || "No description available"}
      </p>
      {product.specification && (
        <p className="mb-2 pt-5">
          <strong>Specification:</strong>{" "}
          {product.specification || "No specification available"}
        </p>
      )}
      <p className="mb-2 pt-5">
        <strong>Category :</strong> {getCategoryNameById(product.categoryId)}{" "}
      </p>

      <h2 className="mt-4 text-xl font-semibold">Images:</h2>
      <div className="mb-4 flex flex-wrap gap-2">
        {product.images && product.images.length > 0 ? (
          product.images.map((image) => (
            <img
              key={image.id}
              src={image.imageUrl}
              alt={product.productName}
              className={`h-32 w-32 rounded border object-cover ${
                image.isHero ? "border-green-500" : "border-gray-300"
              }`}
            />
          ))
        ) : (
          <p>No images available.</p>
        )}
      </div>

      <h2 className="mt-4 text-xl font-semibold">Variants:</h2>
      {product.variants && product.variants.length > 0 ? (
        <ul className="list-disc pl-5 pt-3">
          {product.variants.map((variant, index) => (
            <li className="pt-3" key={variant.id}>
              <strong className="mb-3">{`Variant ${index + 1}`}</strong>
              <p>
                <strong>Price:</strong> ${variant.price.toFixed(2)}
              </p>
              <p>
                <strong>Stock:</strong> {variant.stock}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No variants available.</p>
      )}
    </div>
  );
};

export default PreviewProduct;
