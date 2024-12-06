import { co } from "@fullcalendar/core/internal-common";
import axiosInstance from "./AxiosInstances";
import axios from "axios";

export const getAllProducts = async () => {
    try {
        const response = await axiosInstance.get("/products/v1/admin/product");
        return response;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error(error.response?.data);
        }
        throw new Error("An unexpected error occurred");
        
    }
}

export const getSingleProduct = async (productId :string)=>{
    try {
        const response = await axiosInstance.get(`/admin/product/${productId}`);
        return response;
    } catch (error) {
        
        if (axios.isAxiosError(error)) {
            console.error(error.response?.data);
        }
        throw new Error("An unexpected error occurred");
    }
}

export const addProduct = async (productData: any) => {
    try {
        const response = await axiosInstance.post("/products/v1/admin/product", productData);
        return response;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error(error.response?.data);
        }
        throw new Error("An unexpected error occurred");
    }
}

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