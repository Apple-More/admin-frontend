import axiosInstance from "./AxiosInstances";
import axios from "axios";

/**
 * Handles user login by making a POST request using the custom Axios instance.
 *
 * @param {string} email - The user's email.
 * @param {string} password - The user's password.
 * @returns {Promise<any>} - The response data from the API.
 * @throws {Error} - If the login fails.
 */
export const loginService = async (email: string, password: string) => {
  try {
    const response = await axiosInstance.post(
      "/users/v1/auth/customers/login",
      {
        email,
        password,
      }
    );
    return response; // Returns token and user details
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Handle Axios-specific errors
      throw new Error(error.response?.data?.message || "Login failed");
    }
    throw new Error("An unexpected error occurred");
  }
};
