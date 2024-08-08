import React, { useState } from "react";
import Loader from "../Loader";

function LazyImage({ src, alt, ...rest }) {
  const [loaded, setLoaded] = useState(false);

  const handleImageLoad = () => {
    setLoaded(true);
  };

  return (
    <img
      src={src}
      alt={alt}
      onLoad={handleImageLoad}
      style={{
        filter: loaded ? "none" : "blur(10px)",
        transition: "filter 0.3s ease-out",
      }}
      loading="lazy"
      {...rest}
    />
  );
}

export default LazyImage;
