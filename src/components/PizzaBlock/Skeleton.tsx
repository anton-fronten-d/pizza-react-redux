import React from "react";
import ContentLoader from "react-content-loader";

const MyLoader = () => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={480}
    viewBox="0 0 280 480"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="0" y="289" rx="10" ry="10" width="280" height="20" />
    <rect x="0" y="321" rx="11" ry="11" width="280" height="93" />
    <rect x="5" y="443" rx="10" ry="10" width="95" height="30" />
    <rect x="134" y="434" rx="27" ry="27" width="142" height="41" />
    <circle cx="138" cy="142" r="127" />
  </ContentLoader>
);

export default MyLoader;
