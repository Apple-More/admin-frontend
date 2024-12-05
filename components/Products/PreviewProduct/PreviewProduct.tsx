"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Product } from "@/types/ProductType";

interface PreviewProductProps {
  productId: string;
}

const PreviewProduct: React.FC<PreviewProductProps> = ({ productId }) => {
  const router = useRouter();
  // Get product ID from URL
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch product data from the backend
  useEffect(() => {
    if (productId) {
      fetch(`/api/products/${productId}`)
        .then((res) => res.json())
        .then((data) => {
          setProduct(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching product:", error);
          setLoading(false);
        });
    }
  }, [productId]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex h-screen items-center justify-center">
        Product not found!
      </div>
    );
  }

  const { productName, description, images, heroImage, variants } = product;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Hero Image */}
        <div className="relative">
          <img
            src={heroImage}
            alt={productName}
            className="h-96 w-full rounded-lg object-cover shadow-lg"
          />
          {/* Thumbnail Images */}
          <div className="mt-4 flex gap-2">
            {images.map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`Thumbnail ${index + 1}`}
                className="h-20 w-20 cursor-pointer rounded border border-gray-300 object-cover hover:opacity-80"
              />
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{productName}</h1>
          <p className="mt-4 text-gray-600">{description}</p>

          {/* Variants */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold">Variants</h3>
            {variants.map((variant, index) => (
              <div key={index} className="mt-2 rounded-lg border p-4">
                <p>
                  <strong>Attributes:</strong>{" "}
                  {Object.entries(variant.attributes).map(([key, value]) => (
                    <span key={key} className="mr-2">
                      {key}: {value}
                    </span>
                  ))}
                </p>
                <p>
                  <strong>Price:</strong> ${variant.price}
                </p>
                <p>
                  <strong>Stock:</strong> {variant.stock}
                </p>
              </div>
            ))}
          </div>

          {/* Purchase Section */}
          <div className="mt-6">
            <button className="btn rounded-lg bg-blue-600 px-4 py-2 text-white shadow hover:bg-blue-700">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewProduct;
