import { useSelector } from "react-redux";
import { FaPlay } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { setTrailerId } from "../utils/movieSlice";
const NowPlayingMovies = () => {
  const moviesList = useSelector((store) => store.movies.movies);
  const trailerId = useSelector((store) => store.movies.trailerId);
  const dispatch = useDispatch();

  const filteredMovies = moviesList?.filter((movie) => movie.id !== trailerId);

  if (!filteredMovies || filteredMovies.length === 0) {
    return <div className="text-white text-center text-lg">Loading...</div>;
  }

  const handlePlay = (current) => {
    dispatch(setTrailerId(current.id));
  };

  return (
    <div className="px-4 pt-6 pb-10 bg-gradient-to-t from-black/90 to-transparent">
      <h2 className="text-2xl font-bold text-white mb-4">Now Playing</h2>

      <div className="flex overflow-x  overflow-y-hidden space-x-4 scrollbar-hide no-scrollbar">
        {filteredMovies.map((movie) => (
          <div
            key={movie.id}
            className="relative min-w-[200px] h-[120px] md:min-w-[250px] md:h-[150px] lg:min-w-[300px] lg:h-[180px] flex-shrink-0 rounded-lg overflow-hidden bg-gray-900 hover:scale-105 hover:z-10 transition-transform duration-300"
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
              alt={movie.original_title}
              className="w-full h-full object-cover"
            />

            {/* Play Icon on Hover */}
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
              <FaPlay
                onClick={() => handlePlay(movie)}
                className="text-white text-3xl"
              />
            </div>

            {/* Movie Title */}
            <div className="absolute bottom-0 w-full bg-gradient-to-t from-black to-transparent p-2">
              <h3 className="text-white text-sm font-semibold line-clamp-1">
                {movie.original_title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NowPlayingMovies;
