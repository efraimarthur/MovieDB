import { Icon } from "@iconify/react";
import useFetch from "./Fetcher";
import { useState, useEffect } from "react";

const Navbar = ({ data }) => {
  const [tempInput, setTempInput] = useState("");
  const [movieInput, setMovieInput] = useState("");
  const [resultMovie, setResultMovie] = useState();
  const [searchButton, setSearchButton] = useState(false);

  const [getSearch] = useFetch(
    `https://api.themoviedb.org/3/search/movie?api_key=9d9e94b5b5a02a1ec80f8d011ce958c7&language=en-US&query=${movieInput}&page=1&include_adult=false`
  );

  const onSearch = () => {
    setMovieInput(tempInput);
    // setMovieInput(e);
  };

  //trigger search button on enter pressed
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };

  useEffect(() => {
    // console.log(getSearch);
    getSearch && setResultMovie(getSearch);

    //fetching result send to parent
    resultMovie && data(resultMovie);

    tempInput !== "" ? setSearchButton(true) : setSearchButton(false);

    tempInput == "" && setMovieInput("");

    // console.log(getSearch?.results?.length);
  }, [movieInput, getSearch, resultMovie, tempInput]);

  return (
    <div className="flex justify-around bg-teal-600 bg-opacity-20 py-3 text-white items-center fixed top-0 z-50 w-full backdrop-blur-lg">
      <div className="font-bold text-xl">
        Movie<span className="text-teal-500 skew-x-12">Ku</span>
      </div>
      <div className="flex items-center">
        <input
          type="search"
          // value={movieInput}
          onKeyDown={(e) => handleKeyDown(e)}
          onChange={(e) => setTempInput(e.target.value)}
          // onChange={(e) => onSearch(e.target.value)}
          className="bg-transparent border-b-2 border-red-400 w-44 text-white outline-none p-2"
        />
        <button className="hover:opacity-60" onClick={onSearch}>
          <Icon
            icon="material-symbols:search-rounded"
            hFlip={true}
            className={`text-2xl ${
              searchButton &&
              "text-black animate-bounce bg-teal-500 rounded-full"
            }`}
          />
        </button>
      </div>
      <div>Account</div>
    </div>
  );
};

export default Navbar;
