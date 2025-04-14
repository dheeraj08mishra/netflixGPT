import { useEffect } from "react";
import { options } from "../utils/constant";
import { addUpcomingMovies, addMovies } from "../utils/movieSlice";
import { useDispatch, useSelector } from "react-redux";
const useUpcoming = () => {
  const dispatch = useDispatch();
  const movies = useSelector((store) => store.movies.upcomingMovies || []);
  useEffect(() => {
    const fetchUpcoming = async () => {
      if (movies.length > 0) return;
      try {
        const response = await fetch(
          "https://api.themoviedb.org/3/movie/upcoming",
          options
        );
        const data = await response.json();
        if (data.results && data.results.length > 0) {
          dispatch(addUpcomingMovies(data.results));
          dispatch(addMovies(data.results));
        }
      } catch (error) {
        console.error("Error fetching top-rated movies:", error);
      }
    };

    fetchUpcoming();
  }, [dispatch, movies.length]); // added dependencies
};
export default useUpcoming;
