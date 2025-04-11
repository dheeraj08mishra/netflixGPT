import { netflix_background, options } from "../utils/constant";
import { useRef, useEffect, useState } from "react";
import OpenAI from "openai";
import { useDispatch, useSelector } from "react-redux";
import { setGptResponse } from "../utils/gptSlice";
import ListMovies from "./ListMovies";

const GPTSearch = () => {
  const [gptError, setGptError] = useState("");
  const gptTextRef = useRef(null);
  const dispatch = useDispatch();
  const answer = useSelector((store) => store.gpt.gptResponse);

  const openai = new OpenAI({
    apiKey: process.env.REACT_APP_OPEN_AI_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  const handleGPTSearch = async () => {
    const query = gptTextRef.current.value;
    if (!query) return;

    const prompt = `You are a movie search assistant. Based on this request: "${query}", return a comma-separated list of movie names like: movie1, movie2, movie3.`;

    try {
      const chatCompletion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
      });

      const content = chatCompletion.choices?.[0]?.message?.content;
      if (!content) {
        dispatch(setGptResponse([]));
        return;
      }

      // ✨ Reject if it's an explanation or refusal
      if (
        content.toLowerCase().includes("i'm sorry") ||
        content.toLowerCase().includes("cannot provide") ||
        content.split(",").length <= 1
      ) {
        dispatch(setGptResponse([]));
        setGptError(
          "Please try a more specific query. GPT didn't return movie names."
        );
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
    } catch (err) {
      console.error("OpenAI error:", err);
      dispatch(setGptResponse([]));
    }
  };

  // Debug: log GPT results
  useEffect(() => {
    console.log("Redux GPT Results:", answer);
  }, [answer]);

  return (
    <div className="relative h-screen w-full">
      <img
        src={netflix_background}
        alt="Netflix background"
        className="absolute top-0 left-0 w-full h-full object-cover opacity-80"
      />
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

        <div className="bg-black w-full mx-auto">
          {answer && answer.length > 0 && (
            <ListMovies
              dataShow={"gptSearched"}
              title={"GPT Searched Movies"}
            />
          )}
          {gptError && (
            <p className="text-red-500 text-center mt-4">{gptError}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default GPTSearch;
