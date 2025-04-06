import { useSelector, useDispatch } from "react-redux";
import { FaPlay } from "react-icons/fa";
import { setTrailerId, setSelectedMovie } from "../utils/movieSlice";
import { useRef, useEffect, useState } from "react";
import MovieModal from "./MovieModal";

const ListMovies = ({ dataShow, title }) => {
  if (!dataShow) return null;

  const moviesList = useSelector((store) => {
    if (dataShow === "nowPlaying") return store.movies.movies;
    if (dataShow === "popularMovies") return store.movies.popularMovies;
    if (dataShow === "topRatedMovies") return store.movies.topRatedMovies;
    if (dataShow === "upcomingMovies") return store.movies.addUpcomingMovies;
    return [];
  });

  const trailerId = useSelector((store) => store.movies.trailerId);
  const filteredMovies =
    dataShow === "nowPlaying"
      ? moviesList?.filter((movie) => movie.id !== trailerId)
      : moviesList;

  const dispatch = useDispatch();
  const scrollRef = useRef(null);
  const [modalMovie, setModalMovie] = useState(null);

  useEffect(() => {
    const scroll = scrollRef.current;
    const interval = setInterval(() => {
      if (!scroll) return;

      const maxScrollLeft = scroll.scrollWidth - scroll.clientWidth;

      if (scroll.scrollLeft >= maxScrollLeft) {
        scroll.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        scroll.scrollBy({ left: 300, behavior: "smooth" });
      }
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  if (!filteredMovies || filteredMovies.length === 0) {
    return <div className="text-white text-center text-lg">Loading...</div>;
  }

  const handlePlay = (current) => {
    dispatch(setTrailerId(current.id));
    dispatch(setSelectedMovie(current));
  };

  return (
    <div className="px-4 pt-6 pb-10 bg-gradient-to-t from-black/90 to-transparent">
      <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>

      <div
        ref={scrollRef}
        className="flex overflow-x-scroll overflow-y-hidden space-x-4 scrollbar-hide no-scrollbar scroll-smooth"
      >
        {filteredMovies.map((movie) => (
          <div
            key={movie.id}
            onClick={() => setModalMovie(movie)}
            className="relative min-w-[200px] h-[120px] md:min-w-[250px] md:h-[150px] lg:min-w-[300px] lg:h-[180px] flex-shrink-0 rounded-lg overflow-hidden bg-gray-900 hover:scale-105 hover:z-10 transition-transform duration-300 cursor-pointer"
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
              alt={movie.original_title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity duration-300 group ">
              <div className="relative">
                <FaPlay
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePlay(movie);
                  }}
                  className="text-white text-3xl cursor-pointer"
                />
                <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                  Play Trailer
                </span>
              </div>
            </div>
            <div className="absolute bottom-0 w-full bg-gradient-to-t from-black to-transparent p-2">
              <h3 className="text-white text-sm font-semibold line-clamp-1">
                {movie.original_title}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modalMovie && (
        <MovieModal movie={modalMovie} onClose={() => setModalMovie(null)} />
      )}
    </div>
  );
};

export default ListMovies;
