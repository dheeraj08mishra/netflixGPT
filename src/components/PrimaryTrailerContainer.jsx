import { useSelector } from "react-redux";
import VideoTitle from "./VideoTitle";
import VideoBackGround from "./VideoBackGround";
import useVideoBankGroundVideo from "../hooks/useVideoBankGroundVideo";
import ShimmerUI from "./ShimmerUI";

const PrimaryTrailerContainer = () => {
  const moviesList = useSelector((store) => store.movies.addMovies);
  const selectedMovie = useSelector((store) => store.movies.selectedMovie);
  useVideoBankGroundVideo({ movieId: selectedMovie?.id });

  if (!moviesList || moviesList.length === 0) {
    return (
      <div className="relative w-full h-screen">
        <ShimmerUI />
      </div>
    );
  }

  const currentMovie = selectedMovie || moviesList[0];
  const { backdrop_path, original_title, overview, id } = currentMovie;

  return (
    <div className="relative w-full h-screen">
      <VideoBackGround movieId={id} />
      <div className="absolute top-24 left-10 z-10">
        <VideoTitle
          original_title={original_title}
          overview={overview}
          currentMovie={currentMovie}
        />
      </div>
    </div>
  );
};

export default PrimaryTrailerContainer;
