import { co } from "@fullcalendar/core/internal-common";
import axiosInstance from "./AxiosInstances";
import axios from "axios";

export const getAllProducts = async () => {
    try {
        const response = await axiosInstance.get("/product-service/v1/admin/product");
        return response;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error(error.response?.data);
        }
        throw new Error("An unexpected error occurred");

    }
}

export const getSingleProduct = async (productId: string) => {
    try {
        const response = await axiosInstance.get(`/product-service/v1/admin/product/${productId}`);
        return response;
    } catch (error) {

        if (axios.isAxiosError(error)) {
            console.error(error.response?.data);
        }
        throw new Error("An unexpected error occurred");
    }
}

// export const addProduct = async (productData: any) => {
//     try {
//         const response = await axiosInstance.post("/products/v1/admin/product", productData);
//         return response;
//     } catch (error) {
//         if (axios.isAxiosError(error)) {
//             console.error(error.response?.data);
//         }
//         throw new Error("An unexpected error occurred");
//     }
// }

export const updateProduct = async (productId: string, productData: any) => {
    try {
        const response = await axiosInstance.put(`/products/v1/admin/product/${productId}`, productData);
        return response;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error(error.response?.data);
        }
        throw new Error("An unexpected error occurred");
    }
}

export const getCategories = async () => {
    const response = await axiosInstance.get("/product-service/v1/admin/categories");

    return response.data;

    try {
        
    } catch (error) {
        
    }
}

export const addCategory = async (categoryData: any) => {
    try {
        const response = await axiosInstance.post("/product-service/v1/admin/categories", categoryData);
        return response;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error(error.response?.data);
        }
        throw new Error("An unexpected error occurred");
    }
}

export const getProductAttributes = async () => {
    const response = await axiosInstance.get("/product-service/v1/admin/product-attributes");

    return response.data;
}

export const addProductAttribute = async (attributeData: any) => {
    const response = await axiosInstance.post("/product-service/v1/admin/product-attributes", attributeData);

    return response.data;
}

export const addProduct = async (productData: any) => {
    const response = await axiosInstance.post("/product-service/v1/admin/product", productData);

    return response.data;
}

export const addProductAttributeValue = async (productAttributeData: any) => {
    const response = await axiosInstance.post(`/product-service/v1/admin/attribute-values`, productAttributeData);

    return response.data;
}

export const addProductVariant = async (productVariantData: any) => {
    const response = await axiosInstance.post(`/product-service/v1/admin/product-variant`, productVariantData);

    return response.data;
}

export const addProductVariantAttribute = async (productVariantAttributeData: any) => {
    const response = await axiosInstance.post(`/product-service/v1/admin/product-variant-attribute`, productVariantAttributeData);

    return response.data;
}

export const addHeroImage = async (productId: string, heroImageFile: File) => {
    const formData = new FormData();
    formData.append("productId", productId);
    formData.append("isHero", "true");
    formData.append("image", heroImageFile);

    const response = await axiosInstance.post(`/product-service/v1/admin/product-images`, formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });

    return response.data;
}

export const addProductImage = async (productId: string, productImageFile: File) => {
    const formData = new FormData();
    formData.append("productId", productId);
    formData.append("image", productImageFile);

    const response = await axiosInstance.post(`/product-service/v1/admin/product-images`, formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });

    return response.data;
}
