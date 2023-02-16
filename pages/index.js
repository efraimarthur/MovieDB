import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import useFetch from "../Components/Fetcher";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, Pagination, Autoplay } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/pagination";

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=9d9e94b5b5a02a1ec80f8d011ce958c7&language=en-US&page=1`
  );
  const data = await res.json();
  const result = await data.results;
  // console.log(data);

  // Pass data to the page via props
  return { props: { result } };
}

const Home = ({ result }) => {
  const [trendingToday, setTrendingToday] = useState();
  const [trendingWeek, setTrendingWeek] = useState();
  const [details, setDetails] = useState();
  const [selectedItem, setSelectedItem] = useState();
  const [dataServer, setDataServer] = useState();
  const [cast, setCast] = useState();
  const [data, setData] = useState();
  // console.log(dataServer);

  const [getTrendingToday] = useFetch(
    "https://api.themoviedb.org/3/trending/all/day?api_key=9d9e94b5b5a02a1ec80f8d011ce958c7&language=en-US"
  );
  const [getTrendingWeek] = useFetch(
    "https://api.themoviedb.org/3/trending/all/week?api_key=9d9e94b5b5a02a1ec80f8d011ce958c7&language=en-US"
  );

  const [getDetail] = useFetch(
    `https://api.themoviedb.org/3/movie/${selectedItem?.id}?api_key=9d9e94b5b5a02a1ec80f8d011ce958c7&language=en-US`
  );

  const [getCast] = useFetch(
    `https://api.themoviedb.org/3/movie/${selectedItem?.id}/credits?api_key=9d9e94b5b5a02a1ec80f8d011ce958c7`
  );

  const onItemClick = (item) => {
    //get id of selected item
    setSelectedItem({ id: item.id });
  };

  //get data from child component (navbar)
  const dataFromInput = (dataInput) => {
    setData(dataInput?.results);
  };

  useEffect(() => {
    //get data from trending
    getTrendingToday && setTrendingToday(getTrendingToday.results);
    getTrendingWeek && setTrendingWeek(getTrendingWeek.results);

    //get detail data of selected item
    getDetail && setDetails(getDetail);

    //get cast of selected item
    getCast && setCast(getCast.cast?.slice(0, 5));
    // console.log(cast);

    //get popular serverside data
    result && setDataServer(result);

    // console.log(data);
  }, [
    getTrendingToday,
    getTrendingWeek,
    selectedItem,
    getDetail,
    result,
    getCast,
    data,
  ]);

  return (
    <div className="">
      <Head>
        <title>Movie DB</title>
        <meta name="description" content="Movie DB by TMDB api" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-black/90 md:pt-16">
        <Navbar data={dataFromInput} />
        <main className="pb-[500px]">
          {data != "" ? (
            <div className="flex flex-wrap justify-center gap-5 py-5">
              {data?.map((e) => (
                <div key={e.id} className="sm:basis-1/6 basis-1/3 flex">
                  <div className="flex flex-col text-white ">
                    <Image
                      src={`https://image.tmdb.org/t/p/${"w500" || "original"}${
                        e.poster_path
                      }`}
                      alt="Poster"
                      width={500}
                      height={500}
                      quality={40}
                      className="aspect-[1/1.5] w-full rounded-2xl"
                      loading="eager"
                    />
                    <div className="w-full px-1 text-center text-sm text-slate-100 my-2">
                      {e.title}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : null}
          {data == "" ? (
            <>
              <div className="sm:min-h-screen w-full">
                <Swiper
                  slidesPerView={1}
                  spaceBetween={30}
                  loop={true}
                  pagination={{
                    clickable: true,
                  }}
                  autoplay={true}
                  navigation={false}
                  modules={[Pagination, Navigation, Autoplay]}
                  className="mySwiper"
                >
                  {dataServer &&
                    dataServer.map((item, index) => (
                      <div key={item}>
                        {/* {console.log(item.original_title)} */}
                        <SwiperSlide>
                          <div className="relative w-full h-full">
                            <Image
                              src={`https://image.tmdb.org/t/p/original${item.backdrop_path}`}
                              width={2000}
                              height={2000}
                              alt="carousel img"
                              loading="eager"
                              // blurDataURL={`https://image.tmdb.org/t/p/w500${item.backdrop_path}`}
                              className="object-cover sm:h-screen"
                            />
                            <div className="absolute right-0 top-0 text-white h-full w-[80vw] bg-gradient-to-l from-black flex justify-end items-center">
                              <div className="text-end flex flex-col mr-8 gap-5">
                                <div className="text-3xl font-semibold">
                                  {item.original_title}
                                </div>
                                <div className="w-96">{item.overview}</div>
                                <div className="flex gap-2 justify-end mt-2">
                                  <a
                                    className="bg-slate-50 text-teal-900 rounded-sm px-5 py-2 flex items-center gap-1 font-semibold hover:opacity-60"
                                    onClick={() => {
                                      onItemClick(item);
                                    }}
                                    href={"#detail"}
                                    // scroll={false}
                                  >
                                    More Info
                                  </a>
                                  <a
                                    className="bg-teal-900 text-slate-100 rounded-sm px-5 py-2 flex items-center gap-1 font-semibold hover:opacity-60 pl-1"
                                    onClick={() => {
                                      onItemClick(item);
                                    }}
                                    href={"#detail"}
                                    // scroll={false}
                                  >
                                    <Icon
                                      icon="material-symbols:play-arrow"
                                      className="text-2xl"
                                    />
                                    Play
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </SwiperSlide>
                      </div>
                    ))}
                </Swiper>
              </div>
              <div className="w-[90%] text-white mx-auto min-h-screen pt-8">
                <p
                  className="pb-5 font-semibold scroll-m-20"
                  id="trendingtoday"
                >
                  Trending Today
                </p>
                <Swiper
                  modules={[Navigation, Autoplay]}
                  spaceBetween={9}
                  slidesPerView={3}
                  // navigation={true}
                  loop={true}
                  autoplay={true}
                  // onSlideChange={() => console.log("slide change")}
                  // onSwiper={(swiper) => console.log("heheh")}
                  breakpoints={{
                    // when window width is >= 640px
                    640: {
                      width: 640,
                      slidesPerView: 4,
                    },
                    // when window width is >= 768px
                    768: {
                      width: 768,
                      slidesPerView: 4,
                    },
                    1024: {
                      width: 1024,
                      slidesPerView: 6,
                    },
                    1280: {
                      width: 1280,
                      slidesPerView: 7,
                    },
                  }}
                >
                  {trendingToday &&
                    trendingToday.map((item, index) => (
                      <div key={item.id} className="">
                        <SwiperSlide>
                          <div className="relative group">
                            <div className="relative before:absolute before:inset-0 before:z-20 hover:before:bg-slate-900 hover:before:bg-opacity-40 hover:before:backdrop-blur-sm before:rounded-xl before:transition-all before:duration-500 overflow-hidden rounded-xl">
                              <Image
                                src={
                                  `https://image.tmdb.org/t/p/w500${item.poster_path}` ||
                                  `https://image.tmdb.org/t/p/original${item.poster_path}`
                                }
                                width={100}
                                height={100}
                                alt="img"
                                // blurDataURL={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                                className="w-52 aspect-[1/1.5] rounded-xl focus:border-2 group-hover:scale-125 duration-500"
                              />
                            </div>
                            <a
                              className="absolute top-1/2 -translate-y-1/2 right-1/2 translate-x-1/2 group-hover:visible duration-500 group-hover:scale-100 scale-125 invisible hidden sm:flex z-30 hover:backdrop-blur-none"
                              onClick={() => {
                                onItemClick(item);
                              }}
                              href={"#detail"}
                              scroll={false}
                            >
                              <Icon
                                icon="ic:round-play-circle-outline"
                                className="text-6xl z-50 hover:text-teal-300 duration-200 active:animate-ping"
                              />
                            </a>
                          </div>
                        </SwiperSlide>
                      </div>
                    ))}
                </Swiper>

                <p
                  className="pb-5 mt-10 font-semibold scroll-m-20"
                  id="trendingweek"
                >
                  Trending This Week
                </p>
                <Swiper
                  modules={[Navigation, Autoplay]}
                  spaceBetween={9}
                  slidesPerView={3}
                  // navigation={true}
                  loop={true}
                  // autoplay={true}
                  // onSlideChange={() => console.log("slide change")}
                  // onSwiper={(swiper) => console.log("heheh")}
                  breakpoints={{
                    // when window width is >= 640px
                    640: {
                      width: 640,
                      slidesPerView: 4,
                      navigation: true,
                    },
                    // when window width is >= 768px
                    768: {
                      width: 768,
                      slidesPerView: 4,
                    },
                    1024: {
                      width: 1024,
                      slidesPerView: 6,
                      navigation: false,
                    },
                    1280: {
                      width: 1280,
                      slidesPerView: 7,
                    },
                  }}
                >
                  {trendingWeek &&
                    trendingWeek.map((item, index) => (
                      <div key={item.id} className="">
                        <SwiperSlide>
                          <div className="relative group">
                            <div className="relative before:absolute before:inset-0 before:z-20 hover:before:bg-slate-900 hover:before:bg-opacity-40 hover:before:backdrop-blur-sm before:rounded-xl before:transition-all before:duration-500">
                              <Image
                                src={
                                  `https://image.tmdb.org/t/p/w500${item.poster_path}` ||
                                  `https://image.tmdb.org/t/p/original${item.poster_path}`
                                }
                                width={100}
                                height={100}
                                alt="img"
                                // blurDataURL={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                                className="w-52 aspect-[1/1.5] rounded-xl focus:border-2"
                              />
                            </div>
                            <a
                              className="absolute top-1/2 -translate-y-1/2 right-1/2 translate-x-1/2 group-hover:visible duration-500 group-hover:scale-100 scale-125 invisible hidden sm:flex z-50 hover:backdrop-blur-none"
                              onClick={() => {
                                onItemClick(item);
                              }}
                              href={"#detail"}
                              // scroll={false}
                            >
                              <Icon
                                icon="ic:round-play-circle-outline"
                                className="text-6xl z-50 hover:text-teal-300 duration-200 active:animate-ping"
                              />
                            </a>
                          </div>
                        </SwiperSlide>
                      </div>
                    ))}
                </Swiper>

                <div id="detail" className="scroll-mt-20">
                  {details?.id ? (
                    <div
                      className={`w-full relative mt-5 before:absolute before:inset-0 before:z-10 before:bg-gradient-to-r before:from-black hover:before:to-black hover:before:opacity-70 rounded-lg before:rounded-lg group`}
                    >
                      <Image
                        src={`https://image.tmdb.org/t/p/original${
                          details.backdrop_path || details.poster_path
                        }`}
                        width={2000}
                        height={2000}
                        // fill
                        quality={30}
                        alt="img"
                        loading="eager"
                        className="h-[75vh] aspect-video object-top object-cover rounded-lg relative"
                      />
                      <div className="absolute left-5 top-1/2 -translate-y-1/2 z-20 flex items-start flex-col">
                        <div className="text-2xl font-semibold mt-1">
                          {details.original_title || details.name}
                        </div>
                        <div className="text-[10px] sm:text-xs text-teal-200 flex gap-5 ">
                          <span>{details.genres[0]?.name}</span>
                          <span>{details.genres[1]?.name}</span>
                          <span>{details.genres[2]?.name}</span>
                          <span>{details.genres[3]?.name}</span>
                          <span>{details.genres[4]?.name}</span>
                          <span>{details.genres[5]?.name}</span>
                          {/* <span>{details.genres.map((e) => e.name + "  ")}</span> */}
                        </div>
                        <div className="flex items-center gap-5 mt-2">
                          <div className="text-xs sm:text-sm text-yellow-400 flex items-center gap-1">
                            <Icon
                              icon="material-symbols:star-rate-half"
                              className="text-xs sm:text-lg"
                            />
                            {parseFloat(details.vote_average).toFixed(1)}
                          </div>
                          <div className="text-xs sm:text-sm text-sky-200 flex items-center gap-1">
                            {Math.floor(details.runtime / 60)}H{" "}
                            {details.runtime % 60}
                            M
                            <Icon icon="entypo:hour-glass" className="" />
                          </div>
                        </div>
                        <div className="w-[50%] text-[10px] sm:text-sm my-2">
                          {details.overview.split(".")[0]}
                        </div>
                        <div className="flex sm:gap-2 flex-wrap gap-2">
                          {cast?.map((c) => (
                            <div
                              key={c.cast_id}
                              className="sm:w-[100px] w-[80px]"
                            >
                              <div className="w-full relative h-full">
                                <Image
                                  src={`https://image.tmdb.org/t/p/w500${c.profile_path}`}
                                  alt="profile"
                                  width={100}
                                  height={1}
                                  className="rounded-md"
                                />
                                <div className="absolute text-[10px] sm:text-xs w-full flex flex-col items-center bottom-0 pb-1 sm:gap-1 bg-opacity-50 bg-slate-900">
                                  <div className="text-center">
                                    {c.original_name}
                                  </div>
                                  <div className="text-teal-300 font-semibold text-center">
                                    {c.character}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <button
                        className="absolute z-40 top-2 right-2 font-bold hover:bg-rose-500 duration-200 flex items-center justify-center text-lg border-2 rounded-full text-white border-slate-50"
                        onClick={() => setDetails(null)}
                      >
                        <Icon icon="material-symbols:close-rounded" />
                      </button>
                      <button className="absolute z-40 top-1/2 -translate-y-1/2 right-1/4 group-hover:visible invisible hover:text-teal-300 hidden sm:block">
                        <Icon
                          icon="ic:round-play-circle-outline"
                          className="text-6xl"
                        />
                      </button>
                    </div>
                  ) : null}
                </div>
              </div>
            </>
          ) : null}
        </main>
        <Footer />
      </div>
    </div>
  );
};
export default Home;
