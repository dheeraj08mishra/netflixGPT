import { useEffect, useRef } from "react";
const MovieModal = ({ movie, onClose }) => {
  const modalRef = useRef();
  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  if (!movie) return null;

  const {
    original_title,
    backdrop_path,
    overview,
    vote_average,
    release_date,
    genre_ids = [],
    id,
    trailerKey,
  } = movie;

  const genresList = {
    28: "Action",
    12: "Adventure",
    16: "Animation",
    35: "Comedy",
    80: "Crime",
    99: "Documentary",
    18: "Drama",
    10751: "Family",
    14: "Fantasy",
    36: "History",
    27: "Horror",
    10402: "Music",
    9648: "Mystery",
    10749: "Romance",
    878: "Sci-Fi",
    10770: "TV Movie",
    53: "Thriller",
    10752: "War",
    37: "Western",
  };

  const genres = genre_ids
    .map((id) => genresList[id])
    .filter(Boolean)
    .join(", ");

  const year = release_date?.split("-")[0] || "N/A";
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center">
      <div className="bg-gray-900 text-white p-6 rounded-lg w-[90%] md:w-[600px] relative">
        <button className="absolute top-2 right-2 text-xl" onClick={onClose}>
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-2">{original_title}</h2>
        <img
          src={`https://image.tmdb.org/t/p/w500${backdrop_path}`}
          alt={original_title}
          className="rounded mb-4"
        />

        <div className="text-sm text-gray-300 mb-2">
          <span className="mr-2">⭐ {vote_average?.toFixed(1)}</span>
          <span className="mr-2">📅 {year}</span>
          <span>🎭 {genres || "N/A"}</span>
        </div>

        <p className="text-sm text-gray-200">{overview}</p>
      </div>
    </div>
  );
};

export default MovieModal;
