import { createSlice } from "@reduxjs/toolkit";
const movieSlice = createSlice({
  name: "movie",
  initialState: {
    movies: [],
    selectedMovie: null,
    popularMovies: [],
    trailerVideo: null,
    trailerId: null,
    topRatedMovies: [],
    addUpcomingMovies: [],
    addMovies: [],
  },
  reducers: {
    setMovies: (state, action) => {
      state.movies = action.payload;
    },
    setSelectedMovie: (state, action) => {
      state.selectedMovie = action.payload;
    },
    clearSelectedMovie: (state) => {
      state.selectedMovie = null;
    },
    addTrailerVideo: (state, action) => {
      state.trailerVideo = action.payload;
    },
    setTrailerId: (state, action) => {
      state.trailerId = action.payload;
    },
    addPopularMovies: (state, action) => {
      state.popularMovies = action.payload;
    },
    addTopRatedMovies: (state, action) => {
      state.topRatedMovies = action.payload;
    },
    addUpcomingMovies: (state, action) => {
      state.addUpcomingMovies = action.payload;
    },
    addMovies: (state, action) => {
      // only add unique movies
      const existingIds = new Set(state.movies.map((movie) => movie.id));
      const newMovies = action.payload.filter(
        (movie) => !existingIds.has(movie.id)
      );
      state.addMovies = [...state.movies, ...newMovies];
    },
  },
});
export const {
  setMovies,
  setSelectedMovie,
  clearSelectedMovie,
  addPopularMovies,
  addTrailerVideo,
  setTrailerId,
  addTopRatedMovies,
  addUpcomingMovies,
  addMovies,
} = movieSlice.actions;
export default movieSlice.reducer;
