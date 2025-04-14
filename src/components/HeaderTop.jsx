import { netflix_logo, user_icon } from "../utils/constant";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { setLoading } from "../utils/gptSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeUser } from "../utils/userSlice";
const HeaderTop = () => {
  const user = useSelector((store) => store.user.user);
  const loading = useSelector((store) => store.gpt.loading);
  const watchList = useSelector((store) => store.user.watchList);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const navigateToList = () => {
    navigate("/watchList");
  };
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
    navigate("/");
  };
  return (
    <header className="bg-gradient-to-b from-[#141414] to-[#000000] flex items-center justify-between px-6 py-4">
      <img className="w-40 " src={netflix_logo} alt="Netflix Logo" />
      {user && (
        <div className=" flex items-center space-x-4">
          {/* <button
            className="text-white font-semibold bg-red px-4 py-2 rounded cursor-pointer hover:bg-gray-900 transition"
            onClick={() => navigate("/")}
          >
            Home
          </button> */}
          <button
            onClick={navigateToList}
            className="text-white font-semibold px-4 py-2 rounded cursor-pointer "
          >
            My List
          </button>
          <button
            className="text-white font-semibold bg-red px-4 py-2 rounded cursor-pointer hover: bg-gray-900 transition"
            onClick={openGPTAI}
          >
            {loading ? "Home" : "GPT Search"}
          </button>
          <img src={user_icon} alt="user" className="w-10 h-10 rounded-full" />
          <button
            onClick={handleSignOut}
            className="bg-red-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-red-700 transition"
          >
            Sign Out
          </button>
        </div>
      )}
    </header>
  );
};

export default HeaderTop;
