import { useState, useEffect } from "react";

const useResize = () => {
  const isClient = typeof window !== "undefined";

  const [windowWidth, setWindowWidth] = useState(
    isClient ? window.innerWidth : 0
  );

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    if (!isClient) {
      return;
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isClient]);

  return windowWidth;
};

export default useResize;
