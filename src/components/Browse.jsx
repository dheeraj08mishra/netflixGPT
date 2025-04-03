import Header from "./Header";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../utils/userSlice";

const Browse = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user.user);
  console.log(user);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        dispatch(removeUser());
      })
      .catch((error) => {
        navigate("/error");
      });
  };

  return (
    <>
      <div className="h-screen bg-gradient-to-b from-[#141414] to-[#000000]">
        <Header />

        {/* Container for profile image and signout button */}
        <div className="absolute top-5 right-10 flex items-center space-x-4">
          {/* Profile Image */}
          <img
            src={user?.photoURL}
            alt="user"
            className="w-10 h-10 rounded-full"
          />

          {/* Sign Out Button */}
          <button
            onClick={handleSignOut}
            className="bg-red-600 text-white px-4 py-2 rounded cursor-pointer"
          >
            Sign Out
          </button>
        </div>
      </div>
    </>
  );
};

export default Browse;
