import Header from "./Header";
import useNowPlaying from "../hooks/useNowPlaying";
import PrimaryTrailerContainer from "./PrimaryTrailerContainer";
import SecondaryListContainer from "./SecondryListContainer";
import usePopularPlaying from "../hooks/usePopularPlaying";
import useTopRated from "../hooks/useTopRated";
import useUpcoming from "../hooks/useUpcoming";
import GPTSearch from "./GPTSearch";
import { useSelector } from "react-redux";

const Browse = () => {
  useNowPlaying();
  usePopularPlaying();
  useTopRated();
  useUpcoming();
  const gptshow = useSelector((store) => store.gpt.loading);

  return (
    <>
      <Header />
      {gptshow ? (
        <GPTSearch />
      ) : (
        <>
          <PrimaryTrailerContainer />
          <div className="relative -mt-48 z-20">
            <SecondaryListContainer />
          </div>
        </>
      )}
    </>
  );
};

export default Browse;
