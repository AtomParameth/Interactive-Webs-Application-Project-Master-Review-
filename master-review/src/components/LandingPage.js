import "./Poster.css";
import React from "react";
import Navbar from "./Navbar";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Poster from "./Poster";
import { postersData, responsive } from "./Data";
import coverPic from "./images/background-signIn.jpg";
function LandingPage() {
  const poster = postersData.map((poster) => {
    return (
      <Poster
        name={poster.name}
        url={poster.imageUrl}
        describe={poster.describe}
      />
    );
  });

  return (
    <>
      <Navbar />
      <div className="slide-container">
        <h1 className="slide-title">NEW & UPCOMING MOVIES IN THEATERS</h1>
        <div className="slide-content">
          <Carousel
            swipeable={false}
            draggable={false}
            showDots={true}
            responsive={responsive}
          >
            {poster}
          </Carousel>
        </div>
      </div>
    </>
  );
}

export default LandingPage;
