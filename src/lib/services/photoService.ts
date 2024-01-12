import axios from "axios";
import { authConfig } from "./authConfig";

const baseURL = import.meta.env.VITE_API_URL;

export const uploadPhoto = async (imageFile: File, jwtToken: string) => {
  try {
    const formData = new FormData();
    formData.append("photo", imageFile);

    const config = authConfig(jwtToken, {
      "Content-Type": "multipart/form-data",
    });

    const response = await axios.post(
      `${baseURL}/photo/upload`,
      formData,
      config
    );
    return response.data;
  } catch (error) {
    console.error(
      "Une erreur s'est produite lors du téléchargement de la photo :",
      error
    );
    return "Une erreur s'est produite lors du téléchargement de la photo.";
  }
};
