import { useEffect } from "react";
import { options } from "../utils/constant";
import { addTopRatedMovies, addMovies } from "../utils/movieSlice";
import { useDispatch } from "react-redux";
const useTopRated = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchTopRatedMovies = async () => {
      try {
        const response = await fetch(
          "https://api.themoviedb.org/3/movie/top_rated",
          options
        );
        const data = await response.json();
        if (data.results && data.results.length > 0) {
          dispatch(addTopRatedMovies(data.results));
          dispatch(addMovies(data.results));
        } else {
          console.error("No top-rated movies found:", data);
        }
      } catch (error) {
        console.error("Error fetching top-rated movies:", error);
      }
    };

    fetchTopRatedMovies();
  }, []);
};
export default useTopRated;
