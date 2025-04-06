import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addTrailerVideo } from "../utils/movieSlice";
import { options } from "../utils/constant";

const useVideoBankGroundVideo = ({ movieId }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!movieId) return; // ✅ Prevent running without a movie ID

    const fetchTrailer = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/videos`,
          options
        );
        const data = await response.json();
        if (data.results && data.results.length > 0) {
          const trailer =
            data.results.find((v) => v.type === "Trailer") || data.results[0];
          dispatch(addTrailerVideo(trailer.key));
        }
      } catch (error) {
        console.error("Failed to fetch trailer:", error);
      }
    };

    fetchTrailer();
  }, [movieId, dispatch]);
};

export default useVideoBankGroundVideo;
