const VideoTitle = ({ original_title, overview }) => {
  return (
    <div className="text-white w-[40%] space-y-4">
      <h1 className="text-5xl font-bold">{original_title}</h1>
      <p className="text-lg line-clamp-3">{overview}</p>
      <div className="flex space-x-4">
        <button className="bg-red-600 text-white px-6 py-3 rounded font-semibold hover:bg-red-700 transition cursor-pointer">
          ▶ Play
        </button>
        <button className="bg-gray-600 text-white px-6 py-3 rounded font-semibold hover:bg-gray-700 transition cursor-pointer">
          + My List
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
