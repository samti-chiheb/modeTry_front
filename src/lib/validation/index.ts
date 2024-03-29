import * as z from "zod";

// ============================================================
// USER
// ============================================================
export const SignupValidation = z.object({
  username: z
    .string()
    .min(2, { message: "Le nom doit comporter au moins 2 caractères." }),
  email: z.string().email(),
  password: z.string().min(8, {
    message: "Le mot de passe doit comporter au moins 8 caractères.",
  }),
  size: z.string().min(1, { message: "La taille doit être comprise entre. " }),
  height: z.string().min(1, { message: "La taille doit être comprise entre. " }),
});

export const SigninValidation = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, {
      message: "Le mot de passe doit comporter au moins 8 caractères.",
    }),
});

export const ProfileValidation = z.object({
  file: z.custom<File[]>(),
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  username: z
    .string()
    .min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email(),
  bio: z.string(),
});

// ============================================================
// POST
// ============================================================
export const PostValidation = z.object({
  description: z
    .string()
    .min(5, { message: "Minimum 5 characters." })
    .max(2200, { message: "Maximum 2,200 caracters" }),
  file: z.custom<File[]>(),
  tags: z.string(),
});
