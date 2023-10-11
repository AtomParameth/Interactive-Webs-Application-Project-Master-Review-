import "./Poster.css";
import React from "react";
import Navbar from "./Navbar";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Poster from "./Poster";
import { postersData, responsive } from "./Data";
import { useState } from "react";
import { Link } from "react-router-dom";
import { auth, db } from "../firebase";
import { useEffect } from "react";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import "./LandingPage.css";
import cpButton from "./images/composebutton.svg";
import bgCover from "./images/Oppenheimer-New-Trailer.jpeg";

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
  const [selectedCategory, setSelectedCategory] = useState("SHOW ALL");
  const [showCompose, setShowCompose] = useState(false);
  const [postList, setPostList] = useState([]);
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
        foundPost.ref.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [searchTerm, selectedCategory, postList]);
  
  return (
    <>
      <Navbar onSearch={handleSearch} />
      <div className="cover-pic-container">
        <div className="color-overlay"></div>
        <img src={bgCover} alt="cover" className="cover-pic-container" />
        <h1 className="headC">NEW CONTENT</h1>
      </div>
      <br></br>
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
          className="catagories-btn"
          onClick={() => setSelectedCategory("SHOW ALL")}
        >
          SHOW ALL
        </button>
        <button
          className="catagories-btn"
          onClick={() => setSelectedCategory("MOVIES")}
        >
          MOVIES
        </button>
        <button
          className="catagories-btn"
          onClick={() => setSelectedCategory("SERIES")}
        >
          SERIES
        </button>
        <button
          className="catagories-btn"
          onClick={() => setSelectedCategory("BOOKS")}
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
            // Filter based on search term and selected category
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
                ref={(ref) => post.ref = ref}
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
