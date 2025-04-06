import Header from "./Header";
import useNowPlaying from "../hooks/useNowPlaying";
import PrimaryTrailerContainer from "./PrimaryTrailerContainer";
import SecondaryListContainer from "./SecondryListContainer";
import usePopularPlaying from "../hooks/usePopularPlaying";
import useTopRated from "../hooks/useTopRated";
import useUpcoming from "../hooks/useUpcoming";

const Browse = () => {
  useNowPlaying();
  usePopularPlaying();
  useTopRated();
  useUpcoming();

  return (
    <>
      <Header />
      <PrimaryTrailerContainer />
      <div className="relative -mt-48 z-20">
        <SecondaryListContainer />
      </div>
    </>
  );
};

export default Browse;
