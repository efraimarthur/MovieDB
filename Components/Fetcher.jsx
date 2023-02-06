import { useEffect, useState } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(url);
      const result = await response.json();
      setData(result);
    };
    getData();
  }, [url]);
  return [data];
};

export default useFetch;
