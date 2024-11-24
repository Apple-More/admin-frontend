"use client";
import Loading from "@/components/layouts/loading";
import EditCategory from "@/components/Category/EditCategory";
import { useParams } from "next/navigation";

const EditCategoryPage = () => {
  const { id } = useParams();
  //   if (!id) {
  //     return (
  //       <div>
  //         <Loading />
  //       </div>
  //     ); // Handle loading state
  //   }

  return <EditCategory CategoryId={id as string} />;
};

export default EditCategoryPage;
