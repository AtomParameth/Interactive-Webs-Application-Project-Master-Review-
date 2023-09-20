import "./Poster.css";
import React from "react";
import Navbar from "./Navbar";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Poster from "./Poster";
import { postersData, responsive } from "./Data";

function LandingPage() {

  const poster = postersData.map((poster) => {
    return (
      <Poster name={poster.name} url={poster.imageUrl} describe={poster.describe} />
    )
  });

  return (
    <>
      <Navbar />
      <div>
        <h1>Trending</h1>
        <Carousel swipeable={false} draggable={false} showDots={true} responsive={responsive}>
          {poster}
        </Carousel>;
      </div>
    </>
  );
}

export default LandingPage