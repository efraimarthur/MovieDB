import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import useFetch from "../Components/Fetcher";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Icon } from "@iconify/react";

// Import Swiper styles
import "swiper/css";

const Home = () => {
  const [data] = useFetch(
    "https://api.themoviedb.org/3/trending/all/day?api_key=9d9e94b5b5a02a1ec80f8d011ce958c7"
  );

  const [datas, setDatas] = useState();
  const [selectedItem, setSelectedItem] = useState({
    path: "",
    title: "",
  });

  const onItemClick = ({ path, title }) => {
    setSelectedItem({ path: path, title: title });
    // console.log(selectedItem.path);
  };

  useEffect(() => {
    if (data) {
      // console.log(Object.keys(data));
      setDatas(data.results);
      // console.log(datas);
    }
  }, [data]);

  return (
    <div className="">
      <Head>
        <title>Movie DB</title>
        <meta name="description" content="Movie DB by TMDB api" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="bg-teal-900 pb-[500px]">
        <h1 className="text-3xl font-bold underline text-indigo-600">
          Movie DB with TMDB
        </h1>
        <div className="w-[90%] bg-teal-900 text-white mx-auto min-h-screen mt-20">
          <Swiper
            spaceBetween={9}
            slidesPerView={6}
            // onSlideChange={() => console.log("slide change")}
            // onSwiper={(swiper) => console.log("heheh")}
          >
            {datas &&
              datas.map((item, index) => (
                <div key={index}>
                  <SwiperSlide>
                    <button
                      className="flex flex-col rounded-xl items-center"
                      onClick={() =>
                        onItemClick({
                          path: item.backdrop_path,
                          title: item.title,
                        })
                      }
                    >
                      <Image
                        src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                        width={100}
                        height={100}
                        alt="img"
                        // blurDataURL={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                        className="w-52 aspect-[1/1.5] hover:z-30 rounded-xl focus:border-2 border-red-600"
                      />
                      <span className="text-center mt-2">
                        {item.title ? item.title : item.name}
                      </span>
                    </button>
                  </SwiperSlide>
                </div>
              ))}
          </Swiper>
          {selectedItem?.path && (
            <div
              className={`w-full relative mt-20 before:absolute before:inset-0 before:z-10 before:bg-gradient-to-r before:from-black rounded-lg before:rounded-lg`}
            >
              <Image
                src={`https://image.tmdb.org/t/p/original${selectedItem.path}`}
                width={2000}
                height={2000}
                // fill
                quality={20}
                alt="img"
                className="h-[75vh] aspect-video object-top object-cover rounded-lg"
              />
              {/* <span className="text-xl">{selectedItem.title}</span> */}
              <button
                className="absolute z-30 top-0 right-0 text-white-700 font-bold hover:bg-rose-600 bg-rose-900 flex items-center justify-center text-3xl rounded-bl-3xl pl-1 pb-1"
                onClick={() => setSelectedItem(null)}
              >
                <Icon icon="material-symbols:close-rounded" color="white" />
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
export default Home;
