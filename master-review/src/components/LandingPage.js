import "./Poster.css";
import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
// import Carousel from "react-multi-carousel";
// import "react-multi-carousel/lib/styles.css";
import Poster from "./Poster";
// import { postersData, responsive } from "./Data";
import { Link } from "react-router-dom";
import { auth, db } from "../firebase";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import "./LandingPage.css";
import cpButton from "./images/composebutton.svg";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import gitHubIcon from "./images/github-mark-white.png";
import { ref,deleteObject } from "firebase/storage";
import { imageStorage } from "../firebase";
import firebaseLogo from "./images/firebase-logo-2.png";

function LandingPage() {
  // const poster = postersData.map((poster) => {
  //   return (
  //     <Poster
  //       name={poster.name}
  //       url={poster.imageUrl}
  //       describe={poster.describe}
  //     />
  //   );
  // });
  const [selectedCategory, setSelectedCategory] = useState("SHOW ALL");
  const [showCompose, setShowCompose] = useState(false);
  const [postList, setPostList] = useState([]);
  const [postFromApi, setPostFromApi] = useState([]);
  const postCollectionRef = collection(db, "master-review-posts");

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setShowCompose(true);
      } else {
        setShowCompose(false);
      }

      window.addEventListener("scroll", handleScroll);

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    });

    const getPosts = async () => {
      const data = await getDocs(postCollectionRef);
      setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getPosts();
  }, []);

  const deletePost = async (id, imageUrl) => {
    const docRef = doc(db, "master-review-posts", id);
    await deleteDoc(docRef);

    if (imageUrl) {
      const imageRef = ref(imageStorage, imageUrl);
      await deleteObject(imageRef);
    }

    setPostList((prevPostList) =>
      prevPostList.filter((post) => post.id !== id)
    );
  };

  const [searchTerm, setSearchTerm] = useState(""); // New state for search term

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  useEffect(() => {
    if (searchTerm !== "") {
      const foundPost = postList.find(
        (post) =>
          (post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.user.name.toLowerCase().includes(searchTerm.toLowerCase())) &&
          (selectedCategory === "SHOW ALL" ||
            post.category === selectedCategory)
      );

      if (foundPost && foundPost.ref) {
        foundPost.ref.scrollIntoView({ behavior: "instant" });
      }
    }
  }, [searchTerm, selectedCategory, postList]);

  const getMovie = () => {
    fetch(
      "https://api.themoviedb.org/3/discover/movie?api_key=8d5b0eb1e2e4d31e459ec29110893f97"
    )
      .then((response) => response.json())
      .then((data) => setPostFromApi(data.results));
  };

  useEffect(() => {
    getMovie();
  }, []);
  // const handleCategoryClick = (category) => {
  //   const updatedStyles = {};
  //   Object.keys(buttonStyles).forEach((key) => {
  //     updatedStyles[key] = {
  //       backgroundColor: "white",
  //       color: "black",
  //     };
  //   });

  //   updatedStyles[category] = {
  //     backgroundColor: "black",
  //     color: "white",
  //   };

  //   setSelectedCategory(category);
  //   setButtonStyles(updatedStyles);
  // };
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleScroll = () => {
    const composeButtonContainer = document.querySelector(
      ".compose-button-container"
    );

    if (composeButtonContainer) {
      const distanceFromTop = composeButtonContainer.offsetTop;
      const scrollPosition = window.scrollY;

      if (scrollPosition > distanceFromTop) {
        composeButtonContainer.classList.add("fixed");
      } else {
        composeButtonContainer.classList.remove("fixed");
      }
    }
  };

  // useEffect(() => {
  //   ref(imageStorage, `master-review/images/${image.name}`).then(img => {
  //     console.log(img)
  //   })
  // }, [])

  return (
    <>
      <Navbar onSearch={handleSearch} />
      <div className="carouselPic">
        <Carousel
          showThumbs={false}
          transitionTime={3}
          infiniteLoop={true}
          showStatus={false}
          showArrows={true}
          renderIndicator={false}
          autoPlay={true}
        >
          {postFromApi.map((movie) => (
            <>
              <div className="cover-pic-carousel">
                <img
                  src={`https://image.tmdb.org/t/p/original/${
                    movie && movie.backdrop_path
                  }`}
                  alt="cover"
                  className="cover-pic"
                />
              </div>
              <div className="cover-pic-overlay">
                <div className="poster_title">
                  {movie ? movie.original_title : ""}
                </div>
                <div className="poster_rating">
                  Rating: {movie ? movie.vote_average : ""}
                </div>
              </div>
            </>
          ))}
        </Carousel>
      </div>
      <br></br>
      <div className="slide-container">
        <h1 className="slide-title">NEW & UPCOMING MOVIES IN THEATERS</h1>
      </div>
      <div className="slide-content">
        <div className="slider-cont">
          <Carousel
            className="Carousel-C"
            autoPlay={true}
            infiniteLoop={true}
            showStatus={false}
            centerMode={true} // enable center mode
            centerSlidePercentage={30} // set center slide width in percentage
            // emulateTouch={true} // enable dragging and swiping
          >
            {postFromApi.map((movie) => (
              <>
                <div className="poster_t">
                  <img
                    src={`https://image.tmdb.org/t/p/original/${
                      movie && movie.backdrop_path
                    }`}
                    alt="cover"
                    className="pic_t"
                  />
                </div>
              </>
            ))}
          </Carousel>
        </div>
      </div>
      {showCompose ? (
        <div className="compose-button-container">
          <div>
            <Link to="/create-posts">
              <button className="cpButton-style">
                <img src={cpButton} alt="Compose" />
              </button>
            </Link>
          </div>
        </div>
      ) : null}

      <div className="navBarCatagories">
        <div className="catagories-container">
          <button
            className={`catagories-btn ${
              selectedCategory === "SHOW ALL" ? "selected" : ""
            }`}
            onClick={() => handleCategoryClick("SHOW ALL")}
          >
            SHOW ALL
          </button>
          <button
            className={`catagories-btn ${
              selectedCategory === "MOVIES" ? "selected" : ""
            }`}
            onClick={() => handleCategoryClick("MOVIES")}
          >
            MOVIES
          </button>
          <button
            className={`catagories-btn ${
              selectedCategory === "SERIES" ? "selected" : ""
            }`}
            onClick={() => handleCategoryClick("SERIES")}
          >
            SERIES
          </button>
          <button
            className={`catagories-btn ${
              selectedCategory === "BOOKS" ? "selected" : ""
            }`}
            onClick={() => handleCategoryClick("BOOKS")}
          >
            BOOKS
          </button>
        </div>
      </div>
      <div className="postCT">
        {postList
          .filter((post) => {
            if (selectedCategory === "SHOW ALL") {
              return true;
            } else {
              return post.category === selectedCategory;
            }
          })
          .filter((post) => {
            if (
              selectedCategory === "SHOW ALL" ||
              post.category === selectedCategory
            ) {
              return (
                post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                post.user.name.toLowerCase().includes(searchTerm.toLowerCase())
              );
            } else {
              return false;
            }
          })
          .map((post) => {
            return (
              <div className="postPages">
                <div
                  className="postContainer"
                  id={post.id}
                  key={post.id}
                  ref={(ref) => (post.ref = ref)}
                >
                  <div className="haed-c">
                    <div className="postUser">
                      <img
                        className="user-profile-pic"
                        src={post.user.photoURL}
                        alt="User Profile"
                      />
                      {post.user.name}
                    </div>
                    <div className="postCategory">
                      Category: {post.category}
                    </div>
                  </div>

                  {post.imageUrl && (
                    <div className="postImage">
                      <img src={post.imageUrl} alt="Post Image" />
                    </div>
                  )}

                  <div className="postTitle">Title: {post.title}</div>
                  <div className="postContent">{post.post}</div>
                  <div className="postButton-Container">
                    {auth.currentUser &&
                      post.user.id === auth.currentUser.uid && (
                        <>
                          <Link to={`/edit-posts/${post.id}`}>
                            <button className="editButton">Edit</button>
                          </Link>
                          <button
                            className="deleteButton"
                            onClick={() => deletePost(post.id, post.imageUrl)}
                          >
                            Delete
                          </button>
                        </>
                      )}
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      <div className="footer"><img width={250} height={100} src={firebaseLogo}/></div>
    </>
  );
}

export default LandingPage;
