import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect } from "react";
import { auth } from "../../firebase";
import { useDispatch, useSelector } from "react-redux";
import { removeUser, setUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { netflix_logo, user_icon } from "../utils/constant";
import { setLoading } from "../utils/gptSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user.user);
  const loading = useSelector((store) => store.gpt.loading);

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

  const openGPTAI = () => {
    dispatch(setLoading());
  };

  return (
    <>
      <header className="bg-gradient-to-b from-[#141414] to-[#000000] flex items-center justify-between px-6 py-4">
        <img className="w-40 " src={netflix_logo} alt="Netflix Logo" />
        {user && (
          <div className=" flex items-center space-x-4">
            <button
              className="text-white font-semibold bg-gray-700 px-4 py-2 rounded cursor-pointer hover: bg-gray-900 transition"
              onClick={openGPTAI}
            >
              {loading ? "Home" : "GPT Search"}
            </button>
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
