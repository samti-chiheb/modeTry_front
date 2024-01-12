import { ICreatePost, INewUser, IUserLogin } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUserAccount, signInAccount } from "../services/userService";
import { createPost } from "../services/postService";
import { QUERY_KEYS } from "./queryKeys";

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

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: ICreatePost) => createPost(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
      });
    },
  });
};
