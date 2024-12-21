import axiosInstance from "./AxiosInstances";
import axios from "axios";

export const getAllOrders = async () => {
    try {
        const response = await axiosInstance.get("/order-service/v1/");
        return response;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error(error.response?.data);
        }
        throw new Error("An unexpected error occurred");

    }
}