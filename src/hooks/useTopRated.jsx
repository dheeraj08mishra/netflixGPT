import { useEffect } from "react";
import { options } from "../utils/constant";
import { addTopRatedMovies, addMovies } from "../utils/movieSlice";
import { useDispatch, useSelector } from "react-redux";

const useTopRated = () => {
  const dispatch = useDispatch();
  const movies = useSelector((store) => store.movies.topRatedMovies || []);

  useEffect(() => {
    if (movies.length > 0) return;

    const fetchTopRatedMovies = async () => {
      try {
        const response = await fetch(
          "https://api.themoviedb.org/3/movie/top_rated",
          options
        );
        const data = await response.json();

        if (data?.results?.length > 0) {
          dispatch(addTopRatedMovies(data.results));
          dispatch(addMovies(data.results));
        }
      } catch (error) {
        console.error("Error fetching top-rated movies:", error);
      }
    };

    fetchTopRatedMovies();
  }, [dispatch, movies.length]); // added dependencies
};

export default useTopRated;
