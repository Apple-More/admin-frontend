import axiosInstance from "./AxiosInstances";
import axios from "axios";

export const getAllCustomers = async () => {
    try {
        const response = await axiosInstance.get("/user-service/v1/customers");
        return response;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error(error.response?.data);
        }
        throw new Error("An unexpected error occurred");

    }
}