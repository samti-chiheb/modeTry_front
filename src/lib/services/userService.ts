import axios, { AxiosError } from "axios";
import jwtHandler from "./JWTHandlerInstance";
import { INewUser, IUserLogin } from "@/types";

const baseURL = import.meta.env.VITE_API_URL;

export const createUserAccount = async (userData: INewUser) => {
  try {
    // Generate a token with the user's data
    const token = await jwtHandler.generateToken(userData);

    // Set up headers with the token
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    // Make the POST request to the registration endpoint
    const response = await axios.post(`${baseURL}/registration`, {}, config);

    return response.data.message;
  } catch (error) {
    console.error("An error occurred during registration:", error);

    if ((error as AxiosError).response) {
      return { error: (error as any).response.data.error };
    }
    return { error: error || "An error occurred during registration." };
  }
};

export const signInAccount = async (credentials: IUserLogin) => {
  try {
    // Generate a token with the credentials
    const token = await jwtHandler.generateToken(credentials);

    // Set up headers
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    };
    const response = await axios.post(`${baseURL}/login`, credentials, config);
    document.cookie = `userToken=${response.data.token}; path=/; max-age=${
      3600 * 60
    }`;

    if (response.data.user)
    
    return response.data;
  } catch (error) {
    console.error("An error occurred during login:", error);
    return error || "An error occurred during login.";
  }
};

export const signOutAccount = () => {
  try {
    document.cookie =
      "userToken=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";

    return {
      status: "success",
      message: "You have been signed out successfully.",
    };
  } catch (error) {
    console.error("An error occurred during sign-out:", error);
    return { status: "fail", message: "An error occurred during sign-out." };
  }
};
