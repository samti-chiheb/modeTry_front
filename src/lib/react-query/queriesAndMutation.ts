import { INewUser, IUserLogin } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { createUserAccount, signInAccount } from "../services/userService";

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
