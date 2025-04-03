import Header from "./Header";
import { checkValidation } from "../utils/Validate";
import { useRef, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../firebase";
import { useDispatch } from "react-redux";
import { setUser } from "../utils/userSlice";
import { user_icon } from "../utils/constant";

const Login = () => {
  const [error, setError] = useState({});
  const [signUp, setSignUp] = useState(false);

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const nameRef = useRef(null);

  const dispatch = useDispatch();

  const toggleSignUp = () => {
    setSignUp(!signUp);
    setError({});
  };

  const checkInformation = () => {
    const name = nameRef.current ? nameRef.current.value : null;
    return checkValidation(
      emailRef.current.value,
      passwordRef.current.value,
      name
    );
  };

  const handleUserAuth = () => {
    let validationInfo = checkInformation();
    if (validationInfo) {
      setError({ message: validationInfo, success: false });
      return;
    }
    if (signUp) {
      createUserWithEmailAndPassword(
        auth,
        emailRef.current.value,
        passwordRef.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          if (user) {
            updateProfile(user, {
              displayName: nameRef.current.value,
              photoURL: user_icon,
            })
              .then(() => {
                console.log(auth.currentUser);
                const { email, photoURL, displayName, uid } = auth.currentUser;
                dispatch(
                  setUser({
                    email: email,
                    name: displayName,
                    photoURL: photoURL,
                    uid: uid,
                  })
                );
              })
              .catch((error) => {
                setError({
                  message: error.code + "- " + error.message,
                  success: false,
                });
              });
          }
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setError({
            message: errorCode + "- " + errorMessage,
            success: false,
          });
        });
    } else {
      signInWithEmailAndPassword(
        auth,
        emailRef.current.value,
        passwordRef.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setError({
            message: errorCode + "- " + errorMessage,
            success: false,
          });
        });
    }

    setError({ message: "Login Successful", success: true });
  };

  return (
    <>
      <Header />
      <div className="relative w-full h-screen flex items-center justify-center">
        {/* Background Image */}
        <img
          className="absolute top-0 left-0 w-full h-full object-cover"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/fbf440b2-24a0-49f5-b2ba-a5cbe8ea8736/web/IN-en-20250324-TRIFECTA-perspective_d7c906ec-0531-47de-8ece-470d5061c88a_large.jpg"
          alt="Netflix Background"
        />

        {/* Dark Overlay */}
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-60"></div>

        {/* Login Form */}
        <form
          onSubmit={(e) => e.preventDefault()}
          className="relative bg-black bg-opacity-80 p-10 rounded-lg text-white flex flex-col items-center z-10 w-96"
        >
          <h1 className="text-3xl font-bold mb-5">
            {signUp ? "Sign Up" : "Sign In"}
          </h1>

          {signUp && (
            <input
              ref={nameRef}
              className="w-full p-3 mb-4 rounded bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-red-500 outline-none"
              type="text"
              placeholder="Name"
            />
          )}

          <input
            ref={emailRef}
            className="w-full p-3 mb-4 rounded bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-red-500 outline-none"
            type="email"
            placeholder="Email or phone number"
          />

          <input
            ref={passwordRef}
            className="w-full p-3 mb-4 rounded bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-red-500 outline-none"
            type="password"
            placeholder="Password"
          />
          {error.message && (
            <p
              className={`mt-4 m-4 text-center ${
                error.success ? "text-green-500" : "text-red-500"
              }`}
            >
              {error.message}
            </p>
          )}

          <button
            onClick={handleUserAuth}
            className="w-full bg-red-600 p-3 rounded font-bold hover:bg-red-700 transition cursor-pointer"
          >
            {signUp ? "Sign Up" : "Sign In"}
          </button>

          <p className="text-gray-400 mt-4">
            {signUp ? "Already have an account?" : "New to Netflix?"}
            <span
              onClick={toggleSignUp}
              className="text-white cursor-pointer hover:underline ml-2"
            >
              {signUp ? "Sign in now." : "Sign up now."}
            </span>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
