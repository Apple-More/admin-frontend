"use client";
import Loading from "@/components/layouts/loading";
import EditProduct from "@/components/Products/EditProduct/EditProduct";
import { useParams } from "next/navigation";

const EditProductPage = () => {
  const { id } = useParams();
  return <EditProduct productId={id as string} />;
};

export default EditProductPage;
