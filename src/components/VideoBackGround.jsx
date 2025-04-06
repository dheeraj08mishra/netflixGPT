import useVideoBankGroundVideo from "../hooks/useVideoBankGroundVideo";
import { useSelector } from "react-redux";
const VideoBackGround = ({ movieId }) => {
  useVideoBankGroundVideo({ movieId });
  const keyForVideo = useSelector((store) => store.movies.trailerVideo);
  return (
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
      <iframe
        className="w-full h-full object-cover aspect-video"
        src={`https://www.youtube.com/embed/${keyForVideo}?autoplay=1&mute=1&loop=1&playlist=${keyForVideo}&controls=0&showinfo=0&modestbranding=1`}
        allowFullScreen
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        loading="lazy"
        sandbox="allow-same-origin allow-scripts allow-presentation"
      ></iframe>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-black via-transparent to-transparent z-10"></div>
    </div>
  );
};

export default VideoBackGround;
