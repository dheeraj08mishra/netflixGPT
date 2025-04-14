import { createSlice } from "@reduxjs/toolkit";
import { db } from "../firebase/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    watchList: [],
    error: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    removeUser: (state) => {
      state.user = null;
      state.watchList = [];
    },
    addWatchList: (state, action) => {
      const exists = state.watchList.find(
        (movie) => movie.id === action.payload.id
      );
      if (!exists) state.watchList.push(action.payload);
    },
    removeWatchList: (state, action) => {
      state.watchList = state.watchList.filter(
        (movie) => movie.id !== action.payload.id
      );
    },
    setWatchList: (state, action) => {
      state.watchList = action.payload;
    },
  },
});

export const {
  setUser,
  removeUser,
  addWatchList,
  removeWatchList,
  setWatchList,
} = userSlice.actions;

export const saveWatchListToFirebase = (uid, watchList) => async () => {
  try {
    await setDoc(doc(db, "watchlists", uid), { movies: watchList });
  } catch (err) {
    console.error("Error saving watchlist:", err);
  }
};

export const fetchWatchListFromFirebase = (uid) => async (dispatch) => {
  try {
    const docRef = doc(db, "watchlists", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      dispatch(setWatchList(data.movies || []));
    } else {
      await setDoc(docRef, { movies: [] });
      dispatch(setWatchList([]));
    }
  } catch (err) {
    console.error("Error fetching watchlist:", err);
  }
};

export default userSlice.reducer;
