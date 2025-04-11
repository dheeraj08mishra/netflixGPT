import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMovies, setTrailerId, addMovies } from "../utils/movieSlice";
import { options } from "../utils/constant";

const useNowPlaying = () => {
  const dispatch = useDispatch();
  const movies = useSelector((store) => store.movies.movies || []);

  useEffect(() => {
    if (movies.length > 0) return;
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          "https://api.themoviedb.org/3/movie/now_playing",
          options
        );
        const data = await response.json();

        if (data.results && data.results.length > 0) {
          dispatch(setMovies(data.results));
          dispatch(setTrailerId(data.results[0].id));
          dispatch(addMovies(data.results));
        }
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      }
    };
    fetchMovies();
  }, [dispatch, movies.length]); // added dependencies
};

export default useNowPlaying;
