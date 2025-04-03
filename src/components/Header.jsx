import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect } from "react";
import { auth } from "../../firebase";
import { useDispatch } from "react-redux";
import { removeUser, setUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { netflix_logo } from "../utils/constant";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
      return () => unsubscribe(); // Cleanup listener
    });
  }, [dispatch]);

  return (
    <div className="absolute top-5 left-10 z-10">
      <img className="w-40" src={netflix_logo} alt="Netflix Logo" />
    </div>
  );
};

export default Header;
