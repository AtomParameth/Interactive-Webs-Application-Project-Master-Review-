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
    });

    const getPosts = async () => {
      const data = await getDocs(postCollectionRef);
      setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getPosts();
  }, []);

  const deletePost = async (id) => {
    const docRef = doc(db, "master-review-posts", id);
    await deleteDoc(docRef);

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

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };
  return (
    <>
      <Navbar onSearch={handleSearch} />
      <div className="carouselPic">
        <Carousel
          showThumbs={false}
          autoPlay={true}
          transitionTime={3}
          infiniteLoop={true}
          showStatus={false}
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
      <h1 className="slide-title">NEW & UPCOMING MOVIES IN THEATERS</h1>
      <div className="contt">
        <Carousel
          showThumbs={false}
          autoPlay={true}
          transitionTime={3}
          infiniteLoop={true}
          showStatus={false}
        >
          <div className="poster">
            <img src="https://lh3.googleusercontent.com/uSgVlbjstu3Cw0lNXkQgBpCK2VHIZpCz_iIB368WHlv3RmsecZus8wW3isyNTcippOpTvNng-nv_7Gy0BQFTa5AbxPIz4YN-=s0" />
          </div>
          <div className="poster">
            <img src="https://m.media-amazon.com/images/I/71lqDylcvGL.jpg" />
          </div>
          <div className="poster">
            <img src="https://npr.brightspotcdn.com/dims4/default/57c05cf/2147483647/strip/true/crop/2000x3000+0+0/resize/880x1320!/quality/90/?url=http%3A%2F%2Fnpr-brightspot.s3.amazonaws.com%2F53%2F6a%2Fc91c68c646f383865fb7cb07493a%2F082923-killers-flower-moon-key-art-photo-grid-01.png" />
          </div>
        </Carousel>
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
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
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
              <div
                className="postContainer"
                id={post.id}
                key={post.id}
                ref={(ref) => (post.ref = ref)}
              >
                <div className="postUser">{post.user.name}</div>
                <div className="postTitle">{post.title}</div>
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
                          onClick={() => deletePost(post.id)}
                        >
                          Delete
                        </button>
                      </>
                    )}
                </div>
              </div>
            );
          })}
      </div>
      <div className="footer"></div>
    </>
  );
}

export default LandingPage;
