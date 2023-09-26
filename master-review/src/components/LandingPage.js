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

    setPostList((prevPostList) => prevPostList.filter((post) => post.id !== id));
  };
  return (
    <>
      <Navbar />
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
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
            <Link to="create-posts">
              <button className="cpButton-style">post</button>
            </Link>
          </div>
        </div>
      ) : null}
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <div>
        <button>SHOW ALL</button>
        <button>MOVIES</button>
        <button>SERIES</button>
        <button>BOOKS</button>
      </div>
      {postList.map((post) => {
        return (
          <div className="postContainer">
            <div className="postUser">{post.user.name}</div>
            <div className="postTitle">{post.title}</div>
            <div className="postContent">{post.post}</div>
            <div className="deleteButton">
              {auth.currentUser && post.user.id === auth.currentUser.uid && (
                <button onClick={() => deletePost(post.id)}>Delete</button>
              )}
            </div>
          </div>
        );
      })}
    </>
  );
}

export default LandingPage;
