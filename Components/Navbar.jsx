import { Icon } from "@iconify/react";
import useFetch from "./Fetcher";
import { useState, useEffect } from "react";
import Link from "next/link";

const Navbar = ({ data }) => {
  const [tempInput, setTempInput] = useState("");
  const [movieInput, setMovieInput] = useState("");
  const [resultMovie, setResultMovie] = useState();
  const [toggleMenu, setToggleMenu] = useState(false);
  const [toggleSearch, setToggleSearch] = useState(false);
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
    // console.log(toggleSearch);
  }, [movieInput, getSearch, resultMovie, tempInput]);

  return (
    <>
      <div className="flex justify-between bg-black/50 text-white/90 items-center md:fixed top-0 z-50 w-full backdrop-blur-lg relative">
        <div className="gap-10 items-center h-16 md:flex hidden">
          <Link
            href={"/"}
            className="font-bold text-xl px-5 hover:text-teal-500 group transition-all"
            onClick={() => setMovieInput("")}
          >
            Movie
            <span className="text-teal-500 skew-x-12 group-hover:text-white/90 transition-all">
              Ku
            </span>
          </Link>
          <div className="flex gap-10 h-full">
            <button
              href={""}
              className="relative h-full group hover:text-teal-500"
            >
              <span className="flex items-center gap-2">
                <Icon
                  icon="fluent:arrow-trending-lines-20-filled"
                  className="text-2xl"
                />
                Trending{" "}
                <Icon icon="ic:round-arrow-drop-down" className="text-2xl" />
              </span>
              <div className="absolute w-52 py-5 group-hover:mt-5 transition-all duration-300 text-start bg-black/80 p-2 opacity-0 group-hover:opacity-100 flex flex-col gap-3 text-white/90">
                <a
                  onMouseEnter={() => setMovieInput("")}
                  // onClick={() => setMovieInput("")}
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
                  // onClick={() => setMovieInput("")}
                  onMouseEnter={() => setMovieInput("")}
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
              <span className="flex items-center gap-2">
                <Icon icon="mdi:video-film" />
                Movies
                <Icon icon="ic:round-arrow-drop-down" className="text-2xl" />
              </span>
              <div className="group-hover:mt-5 py-5 absolute w-52 text-start bg-black/90 p-2 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col gap-3 text-white/90">
                <a
                  // onClick={() => setMovieInput("")}
                  onMouseEnter={() => setMovieInput("")}
                  href="#trending"
                  className="hover:text-teal-500 hover:pl-2 transition-all"
                >
                  <Icon
                    icon="material-symbols:play-arrow"
                    className="inline mr-2"
                  />
                  Series
                </a>
                <a
                  // onClick={() => setMovieInput("")}
                  onMouseEnter={() => setMovieInput("")}
                  href="#trending"
                  className="hover:text-teal-500 hover:pl-2 transition-all"
                >
                  <Icon
                    icon="material-symbols:play-arrow"
                    className="inline mr-2"
                  />
                  Tv show
                </a>
              </div>
            </button>
          </div>
        </div>
        <button
          onClick={() => setToggleMenu(!toggleMenu)}
          className="text-2xl duration-500 transition-all relative m-3 md:hidden"
        >
          <Icon
            icon="line-md:menu-to-close-alt-transition"
            className={`${
              !toggleMenu
                ? "opacity-0 duration-500"
                : "opacity-100 duration-500 absolute top-0 text-red-600"
            }`}
          />
          <Icon
            icon="line-md:close-to-menu-transition"
            className={`${
              toggleMenu
                ? "opacity-0 duration-500"
                : "opacity-100 duration-500 absolute top-0 "
            }`}
          />
        </button>
        <Link
          href={"/"}
          className="font-bold text-xl px-5 hover:text-teal-500 group transition-all md:hidden"
          onClick={() => setMovieInput("")}
        >
          Movie
          <span className="text-teal-500 skew-x-12 group-hover:text-white/90 transition-all">
            Ku
          </span>
        </Link>
        <button
          onClick={() => setToggleSearch(!toggleSearch)}
          className="text-2xl duration-500 transition-all relative m-3 md:hidden"
        >
          <Icon
            icon="line-md:menu-to-close-alt-transition"
            className={`${
              !toggleSearch
                ? "opacity-0 duration-500"
                : "opacity-100 duration-500 absolute top-0 text-red-600"
            }`}
          />
          <Icon
            icon="material-symbols:search-rounded"
            className={`${
              toggleSearch
                ? "opacity-0 duration-500"
                : "opacity-100 duration-500 absolute top-0"
            }`}
          />
        </button>

        <div className="md:flex items-center md:mr-5 relative rounded-lg overflow-hidden hidden">
          <input
            onKeyDown={(e) => handleKeyDown(e)}
            onChange={(e) => setTempInput(e.target.value)}
            // onChange={(e) => onSearch(e.target.value)}
            className="bg-gray-700/50 w-64 text-white/90 outline-none p-2 text-base flex"
          />
          <button
            className="hover:opacity-60 absolute right-0 rounded-full p-1"
            onClick={onSearch}
          >
            <Icon
              icon="material-symbols:search-rounded"
              hFlip={false}
              className="text-2xl"
              // className={`text-2xl
              // ${searchButton && "animate-bounce"}
              // `}
            />
          </button>
        </div>
      </div>
      {toggleSearch && (
        <div className="relative bg-black/80 w-full">
          <div className="md:flex items-center md:mr-5 relative overflow-hidden w-full">
            <input
              // type="search"
              // value={movieInput}
              placeholder="Search...."
              onKeyDown={(e) => handleKeyDown(e)}
              onChange={(e) => setTempInput(e.target.value)}
              // onChange={(e) => onSearch(e.target.value)}
              className="bg-black/50 text-white/90 outline-none p-4 text-xl flex w-full"
            />
            <div className="text-white absolute z-20 right-3 top-1/2 -translate-y-1/2">
              <button onClick={onSearch}>
                <Icon
                  icon="material-symbols:search-rounded"
                  hFlip={false}
                  className="text-2xl text-white"
                  // className={`text-2xl
                  // ${searchButton && "animate-bounce"}
                  // `}
                />
              </button>
            </div>
          </div>
        </div>
      )}
      {toggleMenu && (
        <div className="text-slate-200/80 relative">
          <div className="h-[70vh] absolute bg-black/95 backdrop-blur-sm z-30 top-0 w-full text-lg">
            <div className="border-b w-full p-5 border-slate-500">
              <span className="text-2xl flex items-center gap-3">
                <Icon
                  icon="fluent:arrow-trending-lines-20-filled"
                  className="text-2xl"
                />{" "}
                Trending
              </span>
              <div className="font-thin mt-3 flex">
                <a className="w-1/2">- Today</a>
                <a className="w-1/2">- This Week</a>
              </div>
            </div>
            <div className="border-b w-full p-5 border-slate-500">
              <span className="text-2xl flex items-center gap-3">
                <Icon icon="mdi:video-film" /> Movies
              </span>
              <div className="font-thin mt-3 flex flex-wrap">
                <a className="w-1/2">- TV show</a>
                <a className="w-1/2">- Series</a>
              </div>
            </div>
            <div className="border-b w-full p-5 border-slate-500">
              <span className="text-2xl flex items-center gap-3">
                <Icon icon="material-symbols:folder-open-rounded" /> Genres
              </span>
              <div className="font-thin mt-3 flex flex-wrap gap-y-2">
                <a className="w-1/2">- Action</a>
                <a className="w-1/2">- Adventure</a>
                <a className="w-1/2">- Horror</a>
                <a className="w-1/2">- Crime</a>
              </div>
            </div>
          </div>
        </div>
        // <div className="gap-10 items-center h-[50vh] bg-opacity-10 text-slate-100">
        //   <div className="flex gap-10 h-full flex-col">
        //     <button
        //       href={""}
        //       className="relative h-full group hover:text-teal-500"
        //     >
        //       <span className="flex items-center gap-2">
        //         <Icon
        //           icon="fluent:arrow-trending-lines-20-filled"
        //           className="text-2xl"
        //         />
        //         Trending{" "}
        //         <Icon icon="ic:round-arrow-drop-down" className="text-2xl" />
        //       </span>
        //       <div className="absolute w-52 py-5 group-hover:mt-5 transition-all duration-300 text-start bg-black/80 p-2 opacity-0 group-hover:opacity-100 flex flex-col gap-3 text-white/90">
        //         <a
        //           onMouseEnter={() => setMovieInput("")}
        //           // onClick={() => setMovieInput("")}
        //           href="#trendingtoday"
        //           className="hover:text-teal-500 hover:pl-2 transition-all"
        //         >
        //           <Icon
        //             icon="material-symbols:play-arrow"
        //             className="inline mr-2"
        //           />
        //           Today
        //         </a>
        //         <a
        //           // onClick={() => setMovieInput("")}
        //           onMouseEnter={() => setMovieInput("")}
        //           href="#trendingweek"
        //           className="hover:text-teal-500 hover:pl-2 transition-all"
        //         >
        //           <Icon
        //             icon="material-symbols:play-arrow"
        //             className="inline mr-2"
        //           />
        //           This Week
        //         </a>
        //       </div>
        //     </button>
        //     <button
        //       href={""}
        //       className="group relative h-full hover:text-teal-500"
        //     >
        //       <span className="flex items-center gap-2">
        //         <Icon icon="mdi:video-film" />
        //         Movies
        //         <Icon icon="ic:round-arrow-drop-down" className="text-2xl" />
        //       </span>
        //       <div className="group-hover:mt-5 py-5 absolute w-52 text-start bg-black/90 p-2 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col gap-3 text-white/90">
        //         <a
        //           // onClick={() => setMovieInput("")}
        //           onMouseEnter={() => setMovieInput("")}
        //           href="#trending"
        //           className="hover:text-teal-500 hover:pl-2 transition-all"
        //         >
        //           <Icon
        //             icon="material-symbols:play-arrow"
        //             className="inline mr-2"
        //           />
        //           asd
        //         </a>
        //         <a
        //           // onClick={() => setMovieInput("")}
        //           onMouseEnter={() => setMovieInput("")}
        //           href="#trending"
        //           className="hover:text-teal-500 hover:pl-2 transition-all"
        //         >
        //           <Icon
        //             icon="material-symbols:play-arrow"
        //             className="inline mr-2"
        //           />
        //           123
        //         </a>
        //       </div>
        //     </button>
        //   </div>
        // </div>
      )}
    </>
  );
};

export default Navbar;
