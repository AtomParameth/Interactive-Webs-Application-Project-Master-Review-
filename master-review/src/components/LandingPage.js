import "./Poster.css";
import React from "react";
import Navbar from "./Navbar";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

function LandingPage() {

    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 5
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 3
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
      };

    return (
        <>
            <Navbar />
            <div>
                <h1>Trending</h1>
                <Carousel responsive={responsive}>
                    <div className="poster">
                        <img className="poster--image" src="https://live.staticflickr.com/300/19346893796_0bcda46777_z.jpg" alt="poster" />
                        <h2>The Last of Us</h2>
                    </div>
                    <div className="poster">
                        <img className="poster--image" src="https://live.staticflickr.com/300/19346893796_0bcda46777_z.jpg" alt="poster" />
                        <h2>The Last of Us</h2>
                    </div>
                    <div className="poster">
                        <img className="poster--image" src="https://live.staticflickr.com/300/19346893796_0bcda46777_z.jpg" alt="poster" />
                        <h2>The Last of Us</h2>
                    </div>
                </Carousel>;
            </div>
        </>
    );
}

export default LandingPage