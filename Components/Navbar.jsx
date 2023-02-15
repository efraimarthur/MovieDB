import { Icon } from "@iconify/react";
import useFetch from "./Fetcher";
import { useState, useEffect } from "react";
import Link from "next/link";

const Navbar = ({ data }) => {
  const [tempInput, setTempInput] = useState("");
  const [movieInput, setMovieInput] = useState("");
  const [resultMovie, setResultMovie] = useState();
  // const [searchButton, setSearchButton] = useState(false);

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

    // tempInput !== "" ? setSearchButton(true) : setSearchButton(false);

    tempInput == "" && setMovieInput("");

    // console.log(getSearch?.results?.length);

    // console.log(dropDown);
  }, [movieInput, getSearch, resultMovie, tempInput]);

  return (
    <div className="flex justify-between bg-black/50 text-white/90 items-center fixed top-0 z-50 w-full backdrop-blur-lg">
      <div className="flex gap-10 items-center h-16">
        <Link
          href={"/"}
          className="font-bold text-xl px-5 hover:text-teal-500 group"
          onClick={() => setMovieInput("")}
        >
          Movie
          <span className="text-teal-500 skew-x-12 group-hover:text-white/90">
            Ku
          </span>
        </Link>
        <div className="flex gap-10 h-full">
          <button
            href={""}
            className="relative h-full group hover:text-teal-500"
          >
            <span className="flex items-center">
              Trending{" "}
              <Icon icon="ic:round-arrow-drop-down" className="text-2xl" />
            </span>
            <div className="absolute w-52 py-5 group-hover:mt-5 transition-all duration-300 text-start bg-black/80 p-2 opacity-0 group-hover:opacity-100 flex flex-col gap-3 text-white/90">
              <a
                onClick={() => setMovieInput("")}
                href="#trendingtoday"
                className="hover:text-teal-500 hover:pl-2 transition-all"
              >
                <Icon
                  icon="material-symbols:play-arrow"
                  className="inline mr-2"
                />
                Today
              </a>
              <a
                onClick={() => setMovieInput("")}
                href="#trendingweek"
                className="hover:text-teal-500 hover:pl-2 transition-all"
              >
                <Icon
                  icon="material-symbols:play-arrow"
                  className="inline mr-2"
                />
                This Week
              </a>
            </div>
          </button>
          <button
            href={""}
            className="group relative h-full hover:text-teal-500"
          >
            <span className="flex items-center">
              Movies
              <Icon icon="ic:round-arrow-drop-down" className="text-2xl" />
            </span>
            <div className="group-hover:mt-5 py-5 absolute w-52 text-start bg-black/90 p-2 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col gap-3 text-white/90">
              <a
                onClick={() => setMovieInput("")}
                href="#trending"
                className="hover:text-teal-500 hover:pl-2 transition-all"
              >
                <Icon
                  icon="material-symbols:play-arrow"
                  className="inline mr-2"
                />
                asd
              </a>
              <a
                onClick={() => setMovieInput("")}
                href="#trending"
                className="hover:text-teal-500 hover:pl-2 transition-all"
              >
                <Icon
                  icon="material-symbols:play-arrow"
                  className="inline mr-2"
                />
                123
              </a>
            </div>
          </button>
        </div>
      </div>
      <div className="flex items-center mr-5 relative rounded-lg overflow-hidden">
        <input
          type="search"
          // value={movieInput}
          onKeyDown={(e) => handleKeyDown(e)}
          onChange={(e) => setTempInput(e.target.value)}
          // onChange={(e) => onSearch(e.target.value)}
          className="bg-gray-700/50 w-64 text-white/90 outline-none p-2 text-sm"
        />
        <button
          className="hover:opacity-60 absolute right-0 rounded-full p-1"
          onClick={onSearch}
        >
          <Icon
            icon="material-symbols:search-rounded"
            hFlip={true}
            className="text-2xl"
            // className={`text-2xl
            // ${searchButton && "animate-bounce"}
            // `}
          />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
