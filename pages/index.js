import Head from "next/head";

export default function Home() {
  return (
    <div className="">
      <Head>
        <title>Movie DB</title>
        <meta name="description" content="Movie DB by TMDB api" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="text-3xl font-bold underline text-indigo-600">
          Movie DB with TMDB
        </h1>
      </main>
    </div>
  );
}
