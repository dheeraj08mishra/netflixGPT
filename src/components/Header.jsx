import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { use, useEffect } from "react";
import { auth } from "../../firebase";
import { useDispatch, useSelector } from "react-redux";
import { removeUser, setUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { netflix_logo, user_icon } from "../utils/constant";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user.user);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          setUser({
            email: user.email,
            name: user.displayName,
            photoURL: user.photoURL,
            uid: user.uid,
          })
        );
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
      return () => unsubscribe();
    });
  }, [dispatch]);
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
      <header className="bg-gradient-to-b from-[#141414] to-[#000000] flex items-center justify-between px-6 py-4">
        <img className="w-40 " src={netflix_logo} alt="Netflix Logo" />
        {user && (
          <div className=" flex items-center space-x-4">
            <img
              src={user_icon}
              alt="user"
              className="w-10 h-10 rounded-full"
            />
            <button
              onClick={handleSignOut}
              className="bg-red-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-red-700 transition"
            >
              Sign Out
            </button>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
