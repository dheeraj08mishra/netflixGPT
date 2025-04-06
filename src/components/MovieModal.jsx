const MovieModal = ({ movie, onClose }) => {
  if (!movie) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-75 flex items-center justify-center">
      <div className="bg-gray-900 text-white p-6 rounded-lg w-[90%] md:w-[600px] relative">
        <button className="absolute top-2 right-2 text-xl" onClick={onClose}>
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-4">{movie.original_title}</h2>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
          alt={movie.original_title}
          className="rounded mb-4"
        />
        <p>{movie.overview}</p>
      </div>
    </div>
  );
};

export default MovieModal;
