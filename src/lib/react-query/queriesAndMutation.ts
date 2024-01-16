import { ICreatePost, INewUser, IUserLogin } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createUserAccount, signInAccount } from "../services/userService";
import { createPost, getPosts } from "../services/postService";
import { QUERY_KEYS } from "./queryKeys";

// User Auth
export const useCreateUserAccount = () => {
  return useMutation({
    mutationFn: (user: INewUser) => createUserAccount(user),
  });
};

export const useSignInAccount = () => {
  return useMutation({
    mutationFn: (user: IUserLogin) => signInAccount(user),
  });
};

// Posts
export const useCreatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: ICreatePost) => createPost(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POSTS],
      });
    },
  });
};

export const useGetPosts = (jwtToken: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_POSTS, jwtToken],
    queryFn: () => getPosts(jwtToken),
    enabled: !!jwtToken,
  });
};
