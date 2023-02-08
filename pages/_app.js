import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <div className="scroll-smooth" style={{ scrollBehavior: "smooth" }}>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
