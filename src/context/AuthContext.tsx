import jwtHandler from "@/lib/services/JWTHandlerInstance";
import { IContextType, IUser } from "@/types";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const INITIAL_USER = {
  id: "",
  username: "",
  email: "",
  height: "",
  size: "",
  profilePicture: "",
};

const INITIAL_STATE = {
  user: INITIAL_USER,
  isLoading: false,
  isAuthenticated: false,
  setUser: () => {},
  setIsAuthenticated: () => {},
  checkAuthUser: async () => false as boolean,
  authToken: "",
};

const AuthContext = createContext<IContextType>(INITIAL_STATE);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser>(INITIAL_USER);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authToken, setAuthToken] = useState<string>("");
  const navigate = useNavigate();

  const checkAuthUser = async () => {
    setIsLoading(true);

    try {
      // Retrieve the token from Cookie
      const userToken = document.cookie
        .split("; ")
        .find((row) => row.startsWith("userToken="))
        ?.split("=")[1];

      if (userToken) {
        const userDetails = (await jwtHandler.verifyToken(userToken)) as IUser;
        setAuthToken(userToken);

        // Assuming userDetails is structured correctly and contains necessary info
        if (userDetails) {
          setUser({
            id: userDetails.id,
            username: userDetails.username,
            email: userDetails.email,
            height: userDetails.height,
            size: userDetails.size,
            profilePicture: userDetails.profilePicture,
          });

          setIsAuthenticated(true);
          return true;
        }
      }
      return false;
    } catch (error) {
      console.error(error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("cookiesFallback") === "[]") {
      navigate("/sign-in");
    }

    checkAuthUser();
  }, []);

  const value = {
    user,
    setUser,
    isLoading,
    isAuthenticated,
    setIsAuthenticated,
    checkAuthUser,
    authToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

export const useUserContext = () => useContext(AuthContext);
