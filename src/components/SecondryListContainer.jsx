import ListMovies from "./ListMovies";

const SecondaryListContainer = () => {
  return (
    <>
      <div className="bg-black">
        <ListMovies dataShow={"nowPlaying"} title={"Now Playing"} />
        <ListMovies dataShow={"popularMovies"} title={"Popular Movies"} />
        <ListMovies dataShow={"topRatedMovies"} title={"Top Rated Movies"} />
        <ListMovies dataShow={"upcomingMovies"} title={"Upcoming Movies"} />
      </div>
    </>
  );
};

export default SecondaryListContainer;
