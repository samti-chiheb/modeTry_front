import axios from "axios";
import jwtHandler from "./JWTHandlerInstance";
import { INewUser, IUserLogin } from "@/types";

const baseURL = import.meta.env.VITE_API_URL;

export const createUserAccount = async (userData: INewUser) => {
  try {
    // Generate a token with the user's data
    const token = await jwtHandler.generateToken(userData);

    // Set up headers
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    };

    // Make the POST request to the registration endpoint
    const response = await axios.post(
      `${baseURL}/registration`,
      userData,
      config
    );

    // Use the message directly from the API response
    return response.data.message;
  } catch (error) {
    console.error("An error occurred during registration:", error);
    // Use the message from the API response if available, else a generic error message
    return error || "An error occurred during registration.";
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

    return response.data;
  } catch (error) {
    console.error("An error occurred during login:", error);
    // Use the message from the API response if available, else a generic error message
    return error || "An error occurred during login.";
  }
};
