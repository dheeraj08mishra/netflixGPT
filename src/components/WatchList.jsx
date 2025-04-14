import HeaderTop from "./HeaderTop";
import ListMovies from "./ListMovies";
const WatchList = () => {
  return (
    <>
      <HeaderTop />
      <div className="bg-black">
        <ListMovies dataShow={"myWatchList"} title={"My List"} />
      </div>
    </>
  );
};
export default WatchList;
