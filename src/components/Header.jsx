import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect } from "react";
import { auth } from "../firebase/firebase";
import { useDispatch } from "react-redux";
import { removeUser, setUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import HeaderTop from "./HeaderTop";
import { fetchWatchListFromFirebase } from "../utils/userSlice";

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
        dispatch(fetchWatchListFromFirebase(user.uid));
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
      return () => unsubscribe();
    });
  }, [dispatch, navigate]);

  return (
    <>
      <HeaderTop />
    </>
  );
};

export default Header;
