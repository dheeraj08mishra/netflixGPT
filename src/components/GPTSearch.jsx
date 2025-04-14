import { netflix_background, options } from "../utils/constant";
import { useRef, useEffect, useState } from "react";
import OpenAI from "openai";
import { useDispatch, useSelector } from "react-redux";
import { setGptResponse } from "../utils/gptSlice";
import ListMovies from "./ListMovies";

const GPTSearch = () => {
  const [gptError, setGptError] = useState("");
  const [loading, setLoading] = useState(false);
  const gptTextRef = useRef(null);
  const dispatch = useDispatch();
  const answer = useSelector((store) => store.gpt.gptResponse);

  const openai = new OpenAI({
    apiKey: process.env.REACT_APP_OPEN_AI_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  const handleGPTSearch = async () => {
    const query = gptTextRef.current.value.trim();
    if (!query) return;

    const prompt = `You are a movie search assistant. Based on this request: "${query}", return a comma-separated list of movie names like: movie1, movie2, movie3.`;

    setLoading(true);
    setGptError("");
    dispatch(setGptResponse([]));

    try {
      const chatCompletion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
      });

      const content = chatCompletion.choices?.[0]?.message?.content;
      if (!content) {
        setGptError("No response from GPT. Please try again.");
        return;
      }

      const movieNames = content
        .split(/\n|,/g)
        .map((item) =>
          item
            .replace(/^["'\--\d.\s]+/, "")
            .replace(/["']$/, "")
            .trim()
        )
        .filter((name) => name.length > 0);

      if (movieNames.length === 0) {
        setGptError("No recognizable movie names. Try rephrasing your query.");
        return;
      }

      const moviePromises = movieNames.map((name) =>
        fetch(
          `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
            name
          )}&include_adult=false`,
          options
        ).then((res) => res.json())
      );

      const movieResults = await Promise.all(moviePromises);

      const movies = movieResults
        .map((result) => result.results?.[0])
        .filter(Boolean);

      dispatch(setGptResponse(movies));

      if (movies.length === 0) {
        setGptError("No movies found from GPT suggestions. Try again.");
      } else {
        setGptError(""); // Clear any previous error
      }
    } catch (err) {
      console.error("OpenAI error:", err);
      setGptError("Error fetching data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("Redux GPT Results:", answer);
  }, [answer]);

  return (
    <div className="relative h-screen w-full">
      {/* Background */}
      <img
        src={netflix_background}
        alt="Netflix background"
        className="absolute top-0 left-0 w-full h-full object-cover opacity-80"
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full">
        <form onSubmit={(e) => e.preventDefault()} className="text-center">
          <h1 className="text-4xl font-bold text-white mb-6">
            Welcome to Netflix GPT
          </h1>
          <input
            ref={gptTextRef}
            type="text"
            placeholder="Search for a movie..."
            className="w-[400px] px-6 m-5 py-3 rounded bg-[#1f1f1f] text-white placeholder-gray-400 mb-4 focus:outline-none focus:ring-2 focus:ring-red-600"
          />
          <button
            onClick={handleGPTSearch}
            className="bg-red-600 text-white px-6 py-3 rounded font-semibold hover:bg-red-700 transition duration-200"
          >
            Search
          </button>
        </form>

        <div className="bg-black w-full mx-auto min-h-[200px] mt-4 px-4 py-6">
          {loading && (
            <p className="text-white text-center animate-pulse">
              🔍 Searching...
            </p>
          )}

          {gptError && !loading && (
            <p className="text-red-500 text-center mt-4">{gptError}</p>
          )}

          {answer && answer.length > 0 && !loading && (
            <ListMovies
              dataShow={"gptSearched"}
              title={"GPT Searched Movies"}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default GPTSearch;
