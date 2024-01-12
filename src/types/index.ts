export type IContextType = {
  user: IUser;
  isLoading: boolean;
  isAuthenticated: boolean;
  setUser: React.Dispatch<React.SetStateAction<IUser>>;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  checkAuthUser: () => Promise<boolean>;
  authToken: string;
};

export type INavLink = {
  imgURL: string;
  route: string;
  label: string;
};

export type IUpdateUser = {
  userId: string;
  name: string;
  bio: string;
  imageId: string;
  imageUrl: URL | string;
  file: File[];
};

export type IUser = {
  id: string;
  username: string;
  email: string;
  height: string;
  size: string;
  profilePicture: string;
};

export type INewUser = {
  email: string;
  username: string;
  password: string;
  height: string;
  size: string;
};

export type IUserLogin = {
  email: string;
  password: string;
};

export type INewPost = {
  description: string;
  tags: string;
  visibility: string;
};

export type ICreatePost = {
  imageFile: File;
  postDetails: INewPost;
  jwtToken: string;
  newPhoto: string;
};

export type IUpdatePost = {
  description: string;
  tags: string;
  visibility: string;
};

export type IPost = {
  id: string;
  imageUrl: string;
  user_id: string;
  description: string;
  tags: string;
  visibility: string;
};
