import { ICreatePost, IRawPost, IUpdatePost } from "@/types";
import axios from "axios";
import { authConfig } from "./authConfig";
import { uploadPhoto } from "./photoService";
const baseURL = import.meta.env.VITE_API_URL;

export const createPost = async (params: ICreatePost) => {
  try {
    let photoId = params.photoId;

    if (params.photoId === "0") {
      // D'abord, télécharger la photo
      const photoResponse = await uploadPhoto(
        params.imageFile,
        params.authToken
      );
      photoId = photoResponse.photoId;

      if (!photoResponse || !photoResponse.photoId) {
        throw new Error("Erreur lors du téléchargement de la photo.");
      }
    }

    // convert tags in array
    const tags = JSON.stringify(
      params.postDetails.tags
        ?.split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag)
    );

    const completePostDetails = {
      ...params.postDetails,
      tags,
      photoId: photoId,
    };

    const config = authConfig(params.authToken);

    const postResponse = await axios.post(
      `${baseURL}/post/create`,
      completePostDetails,
      config
    );

    return postResponse.data;
  } catch (error) {
    console.error(
      "Une erreur s'est produite lors de la création du post :",
      error
    );
    return "Une erreur s'est produite lors de la création du post.";
  }
};

export const getPosts = async (jwtToken: string) => {
  try {
    const config = authConfig(jwtToken);

    const response = await axios.get(`${baseURL}/posts`, config);

    const postsWithParsedTags = response.data.posts.map((post: IRawPost) => ({
      ...post,
      tags: post.tags ? JSON.parse(post.tags) : [],
    }));
    
    return postsWithParsedTags;
  } catch (error) {
    console.error(
      "Une erreur s'est produite lors de la récupération des posts :",
      error
    );
    return "Une erreur s'est produite lors de la récupération des posts.";
  }
};

export const getOnePost = async (postId: number, jwtToken: string) => {
  try {
    const config = authConfig(jwtToken);

    const response = await axios.get(`${baseURL}/post/${postId}`, config);
    return response.data;
  } catch (error) {
    console.error(
      "Une erreur s'est produite lors de la récupération du post :",
      error
    );
    return "Une erreur s'est produite lors de la récupération du post.";
  }
};

export const updatePost = async (
  postId: number,
  updateData: IUpdatePost,
  jwtToken: string
) => {
  try {
    const config = authConfig(jwtToken);

    const tags = updateData.tags?.replace(/ /g, "").split(",") || [];

    // Ensuite, utiliser l'ID de la photo dans la création du post
    const completeUpdateData = {
      ...updateData,
      tags,
    };
    // Utiliser PUT ou POST selon la configuration de votre API
    const response = await axios.put(
      `${process.env.REACT_APP_API_URL}/post/update/${postId}`,
      completeUpdateData,
      config
    );
    return response.data;
  } catch (error) {
    console.error(
      "Une erreur s'est produite lors de la mise à jour du post :",
      error
    );
    return "Une erreur s'est produite lors de la mise à jour du post.";
  }
};

export const deletePost = async (postId: number, jwtToken: string) => {
  try {
    const config = authConfig(jwtToken);

    const response = await axios.delete(
      `${process.env.REACT_APP_API_URL}/post/delete/${postId}`,
      config
    );
    return response.data;
  } catch (error) {
    console.error(
      "Une erreur s'est produite lors de la suppression du post :",
      error
    );
    return "Une erreur s'est produite lors de la suppression du post.";
  }
};
