import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import Link from "next/link";
import useFetch from "../Components/Fetcher";
import Navbar from "../Components/Navbar";

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
  const [datas, setDatas] = useState();
  const [details, setDetails] = useState();
  const [selectedItem, setSelectedItem] = useState();
  const [dataServer, setDataServer] = useState();
  // console.log(dataServer);

  const [trending] = useFetch(
    "https://api.themoviedb.org/3/trending/all/day?api_key=9d9e94b5b5a02a1ec80f8d011ce958c7&language=en-US"
  );

  const [detail] = useFetch(
    `https://api.themoviedb.org/3/movie/${selectedItem?.id}?api_key=9d9e94b5b5a02a1ec80f8d011ce958c7&language=en-US`
  );

  const onItemClick = (item) => {
    //get id of selected item
    setSelectedItem({ id: item.id });
  };

  useEffect(() => {
    //set data from fetch to state
    trending && setDatas(trending.results);

    //get detail data of item selected
    if (detail) {
      setDetails(detail);
      console.log(details);
    }

    result && setDataServer(result);
  }, [trending, selectedItem, detail, result]);

  return (
    <div className="">
      <Head>
        <title>Movie DB</title>
        <meta name="description" content="Movie DB by TMDB api" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-teal-900">
        <main className="pb-[500px]">
          <div className="relative min-h-screen mb-12 pt-16">
            <div className="fixed z-50 w-full backdrop-blur-lg top-0">
              <Navbar />
            </div>
            <Swiper
              slidesPerView={1}
              spaceBetween={100}
              loop={true}
              // pagination={{
              //   clickable: false,
              // }}
              autoplay={true}
              navigation={false}
              modules={[Pagination, Navigation, Autoplay]}
              className="mySwiper"
            >
              {dataServer &&
                dataServer.map((item, index) => (
                  <div key={item}>
                    <SwiperSlide>
                      <div className="">
                        <Image
                          src={`https://image.tmdb.org/t/p/original${item.backdrop_path}`}
                          width={2000}
                          height={2000}
                          alt="carousel img"
                          // blurDataURL={`https://image.tmdb.org/t/p/w500${item.backdrop_path}`}
                          className="object-cover"
                        />
                      </div>
                    </SwiperSlide>
                  </div>
                ))}
            </Swiper>
          </div>
          <div className="w-[90%] text-white mx-auto min-h-screen pt-10">
            <p className="pb-5 font-semibold">Trending</p>
            <Swiper
              modules={[Navigation]}
              spaceBetween={9}
              slidesPerView={6}
              navigation={true}
              loop={true}
              max
              // onSlideChange={() => console.log("slide change")}
              // onSwiper={(swiper) => console.log("heheh")}
            >
              {datas &&
                datas.map((item, index) => (
                  <div key={item.id}>
                    <SwiperSlide>
                      <div>
                        <button
                          onClick={() => {
                            onItemClick(item);
                          }}
                          className=":border-2"
                          href={""}
                        >
                          <Image
                            src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                            width={100}
                            height={100}
                            alt="img"
                            // blurDataURL={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                            className="w-52 aspect-[1/1.5] rounded-xl focus:border-2"
                          />
                        </button>
                      </div>
                    </SwiperSlide>
                  </div>
                ))}
            </Swiper>

            {details?.id ? (
              <div
                className={`w-full relative mt-20 before:absolute before:inset-0 before:z-10 before:bg-gradient-to-r before:from-black rounded-lg before:rounded-lg`}
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
                  blurDataURL={`https://image.tmdb.org/t/p/original${details.backdrop_path}`}
                  className="h-[75vh] aspect-video object-top object-cover rounded-lg relative"
                />
                <div className="absolute left-5 top-1/2 -translate-y-1/2 z-20 flex items-start flex-col">
                  <div className="text-xs text-teal-200 flex gap-5 ">
                    <span>{details.genres[0].name}</span>
                    <span>{details.genres[1]?.name}</span>
                    <span>{details.genres[2]?.name}</span>
                    <span>{details.genres[3]?.name}</span>
                    <span>{details.genres[4]?.name}</span>
                    <span>{details.genres[5]?.name}</span>
                  </div>
                  <div className="text-2xl font-semibold mt-1">
                    {details.original_title || details.name}
                  </div>
                  <div className="flex items-center gap-5">
                    <div className="text-sm text-yellow-400 flex items-center gap-1">
                      <Icon
                        icon="material-symbols:star-rate-half"
                        className="text-lg"
                      />
                      {parseFloat(details.vote_average).toFixed(1)}
                    </div>
                    <div className="text-sm text-sky-200 flex items-center gap-1">
                      {Math.floor(details.runtime / 60)}H {details.runtime % 60}
                      M
                      <Icon icon="entypo:hour-glass" className="" />
                    </div>
                  </div>
                  <div className="w-[50%] text-sm mt-2">
                    {details.overview.split(".")[0]}
                  </div>
                </div>
                <button
                  className="absolute z-30 top-2 right-2 font-bold hover:bg-white duration-200 flex items-center justify-center text-lg border-2 rounded-full text-rose-600 border-slate-50"
                  onClick={() => setDetails(null)}
                >
                  <Icon icon="material-symbols:close-rounded" />
                </button>
              </div>
            ) : null}
          </div>
        </main>

        <footer className="py-20 flex justify-center items-center text-slate-50 text-xl bg-gradient-to-t from-teal-800 via-teal-800">
          Movie DB by Arthur
        </footer>
      </div>
    </div>
  );
};
export default Home;
