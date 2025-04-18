import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPopularMovies, addMovies } from "../utils/movieSlice";
import { options } from "../utils/constant";

const usePopularPlaying = () => {
  const dispatch = useDispatch();
  const movies = useSelector((store) => store.movies.popularMovies || []);

  useEffect(() => {
    if (movies.length > 0) return;
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          "https://api.themoviedb.org/3/movie/popular",
          options
        );
        const data = await response.json();

        if (data.results && data.results.length > 0) {
          dispatch(addPopularMovies(data.results));
          dispatch(addMovies(data.results));
        }
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      }
    };

    fetchMovies();
  }, [dispatch, movies.length]);
};

export default usePopularPlaying;
