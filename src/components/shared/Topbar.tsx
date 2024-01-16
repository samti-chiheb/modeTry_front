import { Link, useNavigate } from "react-router-dom";

import { Button } from "../ui/button";
import { INITIAL_USER, useUserContext } from "@/context/AuthContext";
import { signOutAccount } from "@/lib/services/userService";
import Logo from "./Logo";

const Topbar = () => {
  const navigate = useNavigate();
  const { user, setIsAuthenticated, setUser } = useUserContext();

  const signOut = () => {
    const response = signOutAccount();

    if (response.status === "success") {
      setIsAuthenticated(false);
      setUser(INITIAL_USER);
      navigate("/sign-in");
    } else {
      // toast error
      console.log("====================================");
      console.log(response.message);
      console.log("====================================");
    }
  };

  return (
    <section className="topbar">
      <div className="flex-between py-4 px-5">
        <Link to="/" className="flex gap-3 items-center">
          <Logo />
        </Link>

        <div className="flex gap-4">
          <Button
            variant="ghost"
            className="shad-button_ghost"
            onClick={() => signOut()}
          >
            <img src="/assets/icons/logout.svg" alt="logout" />
          </Button>
          <Link to={`/profile/${user.username}`} className="flex-center gap-3">
            <img
              src={
                user.profilePicture || "/assets/icons/profile-placeholder.svg"
              }
              alt="profile"
              className="h-8 w-8 rounded-full"
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Topbar;
