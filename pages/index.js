import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import useFetch from "../Components/Fetcher";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Icon } from "@iconify/react";

// Import Swiper styles
import "swiper/css";
import Link from "next/link";

const Home = () => {
  const [datas, setDatas] = useState();
  const [genres, setGenres] = useState();
  const [details, setDetails] = useState();
  const [selectedItem, setSelectedItem] = useState();
  const [selectedGenre, setSelectedGenre] = useState();
  const [overview, setOverview] = useState("");

  const [data] = useFetch(
    "https://api.themoviedb.org/3/trending/all/week?api_key=9d9e94b5b5a02a1ec80f8d011ce958c7&language=en-US"
  );
  const [genre] = useFetch(
    "https://api.themoviedb.org/3/genre/movie/list?api_key=9d9e94b5b5a02a1ec80f8d011ce958c7&language=en-US"
  );

  const [detail] = useFetch(
    `https://api.themoviedb.org/3/movie/${selectedItem?.id}?api_key=9d9e94b5b5a02a1ec80f8d011ce958c7&language=en-US`
  );

  const onItemClick = (item) => {
    setSelectedItem(item);
    console.log(item);

    let genreId = [];
    let genreName = [];

    //seperate id and name
    genres.map((g) => {
      genreId.push(g.id), genreName.push(g.name);
    });

    //get index of specific array
    let indexArr = [];
    let getIndexArr = genreId.map((e, index) => {
      if (item.genre_ids.includes(e)) {
        indexArr.push(index);
      }
    });

    //get name of index array
    let genreNameArr = [];
    let getGenreName = genreName.map((e, index) => {
      if (indexArr.includes(index)) {
        genreNameArr.push(e);
      }
    });
    setSelectedGenre(genreNameArr);
  };

  useEffect(() => {
    // selectedGenre && console.log(selectedGenre);

    //set data from fetch to state
    data && setDatas(data.results);

    //set genre from fetch to state
    genre && setGenres(genre.genres);

    if (selectedItem) {
      let split = selectedItem.overview.split(".");
      setOverview(split[0]);
    }

    //get detail data
    detail && setDetails(detail);
    console.log(details?.genres);
  }, [data, genre, selectedGenre, selectedItem, detail]);

  return (
    <div className="">
      <Head>
        <title>Movie DB</title>
        <meta name="description" content="Movie DB by TMDB api" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-teal-900">
        <main className="pb-[500px]">
          <div className="w-[90%] text-white mx-auto min-h-screen pt-20">
            <Swiper
              spaceBetween={9}
              slidesPerView={6}
              // onSlideChange={() => console.log("slide change")}
              // onSwiper={(swiper) => console.log("heheh")}
            >
              {datas &&
                datas.map((item, index) => (
                  <div key={item.id}>
                    <SwiperSlide>
                      <div className="flex flex-col items-center">
                        <Link
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
                        </Link>
                      </div>
                    </SwiperSlide>
                  </div>
                ))}
            </Swiper>

            {selectedItem?.backdrop_path ? (
              <div
                className={`w-full relative mt-20 before:absolute before:inset-0 before:z-10 before:bg-gradient-to-r before:from-black rounded-lg before:rounded-lg`}
              >
                <Image
                  src={`https://image.tmdb.org/t/p/original${selectedItem.backdrop_path}`}
                  width={2000}
                  height={2000}
                  // fill
                  quality={30}
                  alt="img"
                  blurDataURL={`https://image.tmdb.org/t/p/original${selectedItem.backdrop_path}`}
                  className="h-[75vh] aspect-video object-top object-cover rounded-lg relative"
                />
                <div className="absolute left-5 top-1/2 -translate-y-1/2 z-20 flex items-start flex-col">
                  <div className="text-xs text-teal-200 flex gap-5 ">
                    <span>{selectedGenre[0]}</span>
                    <span>{selectedGenre[1]}</span>
                    <span>{selectedGenre[2]}</span>
                    <span>{selectedGenre[3]}</span>
                    <span>{selectedGenre[4]}</span>
                    <span>{selectedGenre[5]}</span>
                  </div>
                  <div className="text-2xl font-semibold">
                    {selectedItem.title || selectedItem.name}
                  </div>
                  <div className="w-[50%] text-sm mt-3">{overview}</div>
                </div>
                <button
                  className="absolute z-30 top-0 right-0 font-bold hover:bg-rose-500 duration-200 flex items-center justify-center text-lg bg-rose-900 px-3 py-1"
                  onClick={() => setSelectedItem(null)}
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
