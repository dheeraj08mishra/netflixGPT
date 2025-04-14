import { useSelector, useDispatch } from "react-redux";
import { FaPlay } from "react-icons/fa";
import { FcInfo } from "react-icons/fc";
import { setTrailerId, setSelectedMovie } from "../utils/movieSlice";
import { useRef, useEffect, useState } from "react";
import MovieModal from "./MovieModal";
import ShimmerUI from "./ShimmerUI";
import {
  setWatchList,
  addWatchList,
  removeWatchList,
} from "../utils/userSlice";
import { saveWatchListToFirebase } from "../utils/userSlice";

const ListMovies = ({ dataShow, title }) => {
  if (!dataShow) return null;

  const moviesList = useSelector((store) => {
    if (dataShow === "nowPlaying") return store.movies.movies;
    if (dataShow === "popularMovies") return store.movies.popularMovies;
    if (dataShow === "topRatedMovies") return store.movies.topRatedMovies;
    if (dataShow === "upcomingMovies") return store.movies.addUpcomingMovies;
    if (dataShow === "gptSearched") return store.gpt.gptResponse;
    if (dataShow === "myWatchList") return store.user.watchList;
    return [];
  });

  const trailerId = useSelector((store) => store.movies.trailerId);
  const filteredMovies =
    dataShow === "nowPlaying"
      ? moviesList?.filter((movie) => movie.id !== trailerId)
      : moviesList;

  const dispatch = useDispatch();
  const scrollRef = useRef(null);
  const scrollIntervalRef = useRef(null);
  const [modalMovie, setModalMovie] = useState(null);
  const [hoverTime, setHoverTime] = useState(null);
  const watchList = useSelector((store) => store.user.watchList);

  const user = useSelector((store) => store.user.user);

  const toggleWatchList = (movie, isInWatchList) => {
    console.log(watchList);
    let updatedList = [];

    if (!isInWatchList) {
      updatedList = [...watchList, movie];
      // dispatch(setWatchList(movie));
      dispatch(addWatchList(movie));
    } else {
      updatedList = watchList.filter((m) => m.id !== movie.id);
      dispatch(removeWatchList(movie));
    }

    if (user?.uid) {
      dispatch(saveWatchListToFirebase(user.uid, updatedList));
    }
  };

  const startAutoScroll = () => {
    const scroll = scrollRef.current;
    if (!scroll || scrollIntervalRef.current) return;
    scrollIntervalRef.current = setInterval(() => {
      const maxScrollLeft = scroll.scrollWidth - scroll.clientWidth;

      if (scroll.scrollLeft >= maxScrollLeft) {
        scroll.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        scroll.scrollBy({ left: 300, behavior: "smooth" });
      }
    }, 4000);
  };

  const stopAutoScroll = () => {
    if (scrollIntervalRef.current) {
      clearInterval(scrollIntervalRef.current);
      scrollIntervalRef.current = null;
    }
  };

  useEffect(() => {
    startAutoScroll();
    return () => stopAutoScroll();
  }, []);

  useEffect(() => {
    if (modalMovie) {
      stopAutoScroll();
    } else {
      startAutoScroll();
    }
  }, [modalMovie]);

  if (!filteredMovies || filteredMovies.length === 0) {
    return (
      <div className="w-full px-4 pt-6 pb-10">
        <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>
        <div className="flex space-x-4 overflow-hidden">
          {Array(6)
            .fill(0)
            .map((_, index) => (
              <ShimmerUI key={index} />
            ))}
        </div>
      </div>
    );
  }

  const handlePlay = (current) => {
    dispatch(setTrailerId(current.id));
    dispatch(setSelectedMovie(current));
  };

  const handleMouseEnter = (movie) => {
    if (hoverTime) clearTimeout(hoverTime);
    setHoverTime(null); // Clear the reference
    setModalMovie(movie);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setModalMovie(null);
    }, 300); // You can tweak the delay (300ms feels smooth)
    setHoverTime(timeout);
  };

  return (
    <div className="w-full h-full overflow-hidden px-4 pt-6 pb-10 bg-gradient-to-t from-black/90 to-transparent">
      <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>

      <div
        ref={scrollRef}
        className="flex overflow-x-auto overflow-y-hidden space-x-4 scrollbar-hide scroll-smooth max-w-full"
      >
        {filteredMovies.map((movie) => {
          const isInWatchList = watchList.some((m) => m.id === movie.id);
          return (
            <div
              // onMouseEnter={() => {
              //   stopAutoScroll();
              //   handleMouseEnter(movie);
              // }}
              // onMouseLeave={() => {
              //   handleMouseLeave();
              //   startAutoScroll();
              // }}
              key={movie.id}
              className="relative group min-w-[200px] h-[120px] md:min-w-[250px] md:h-[150px] lg:min-w-[300px] lg:h-[180px] flex-shrink-0 rounded-lg overflow-hidden bg-gray-900 hover:scale-105 hover:z-10 transition-transform duration-300 cursor-pointer"
            >
              {/* Thumbnail */}
              <img
                src={
                  movie.backdrop_path
                    ? `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`
                    : "https://placehold.co/500x281?text=No+Image+available&font=roboto"
                }
                alt={movie.original_title || movie.title}
                className="w-full h-full object-cover"
              />

              {/* Info icon top-right with tooltip */}
              <div className="absolute top-2 right-2 z-20 group">
                <div className="p-1 bg-black/50 rounded-full">
                  <FcInfo
                    onClick={(e) => {
                      e.stopPropagation();
                      setModalMovie(movie);
                    }}
                    className="text-white text-2xl hover:scale-110 transition cursor-pointer"
                  />
                </div>
                <span className="absolute -top-7 right-0 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  More Info
                </span>
              </div>

              {/* Hover preview overlay */}
              <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 text-white flex flex-col justify-end">
                <h3 className="text-lg font-bold mb-1 line-clamp-1">
                  {movie.title || movie.original_title}
                </h3>
                <p className="text-sm text-gray-300 line-clamp-2 mb-2">
                  {movie.overview || "No description available"}
                </p>
                <div className="flex justify-items-start items-center text-xs text-gray-400">
                  <span>{movie.release_date?.slice(0, 4) || "N/A"}</span>
                  <span>⭐ {movie.vote_average?.toFixed(1)}</span>
                </div>
              </div>

              {/* Center play button on hover */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <FaPlay
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePlay(movie);
                  }}
                  className="text-white text-2xl hover:scale-110 transition"
                />
              </div>

              {/* Watchlist button bottom right */}
              <button
                onClick={() => toggleWatchList(movie, isInWatchList)}
                className={`absolute bottom-2 right-2 px-2 py-1 text-xs rounded cursor-pointer ${
                  isInWatchList
                    ? "bg-green-600 text-white"
                    : "bg-white text-black hover:bg-gray-200"
                }`}
              >
                {isInWatchList ? "✔️ Added" : "+ Watchlist"}
              </button>
            </div>
          );
        })}
      </div>

      {/* Modal */}
      {modalMovie && (
        <MovieModal movie={modalMovie} onClose={() => setModalMovie(null)} />
      )}
    </div>
  );
};

export default ListMovies;
