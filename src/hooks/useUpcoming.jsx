import { useEffect } from "react";
import { options } from "../utils/constant";
import { addUpcomingMovies, addMovies } from "../utils/movieSlice";
import { useDispatch } from "react-redux";
const useUpcoming = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchUpcoming = async () => {
      try {
        const response = await fetch(
          "https://api.themoviedb.org/3/movie/upcoming",
          options
        );
        const data = await response.json();
        if (data.results && data.results.length > 0) {
          dispatch(addUpcomingMovies(data.results));
          dispatch(addMovies(data.results));
        } else {
          console.error("No top-rated movies found:", data);
        }
      } catch (error) {
        console.error("Error fetching top-rated movies:", error);
      }
    };

    fetchUpcoming();
  }, []);
};
export default useUpcoming;
