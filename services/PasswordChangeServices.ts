import axiosInstance from "./AxiosInstances";
import axios from "axios";


export const forgotPassword = async (userEmail:string) => {
  try {
    const response = await axiosInstance.post(
      "/user-service/v1/public/auth/admin/forgot-password",userEmail
    );
    console.log(response);
    return response; 
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Handle Axios-specific errors
      console.error(error.response?.data);
    }
    throw new Error("An unexpected error occurred");
  }
};

export const otpVerification = async (OTPNumber:number,userEmail:string|null)=>{
    try {
        const response = await axiosInstance.post("/user-service/v1/public/auth/verify-otp",{
            OTPNumber,
            userEmail
          });
        return response;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            // Handle Axios-specific errors
            console.error(error.response?.data);
          }
          throw new Error("An unexpected error occurred");
        
    }
}

export const resetPassword = async (password:string, userEmail:string| null | undefined)=>{
    try {
        const response = await axiosInstance.post("/user-service/v1/public/auth/admin/reset-password",{
            password,
            userEmail
        })
        return response
    } catch (error) {
        if (axios.isAxiosError(error)) {
            // Handle Axios-specific errors
            console.error(error.response?.data);
          }
          throw new Error("An unexpected error occurred");
    }
}
