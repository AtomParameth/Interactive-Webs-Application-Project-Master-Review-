import React from "react";
import { useState, useEffect } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import "./CreatePost.css";

function CreatePost() {
  const [title, setTitle] = useState("");
  const [post, setPost] = useState("");
  const [user, setUser] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const navigate = useNavigate();
  const postCollectionRef = collection(db, "master-review-posts");

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
    });
  }, []);

  const createPost = async () => {
    await addDoc(postCollectionRef, {
      title,
      post,
      user: { name: user.displayName, id: user.uid },
      category: selectedCategory,
    });
    navigate("/");
  };
  // const handleCategoryClick = (category) => {
  //   const updatedStyles = {};
  //   Object.keys(buttonStyles).forEach((key) => {
  //     updatedStyles[key] = { backgroundColor: "white", color: "black" };
  //   });

  //   updatedStyles[category] = { backgroundColor: "black", color: "white" };

  //   setSelectedCategory(category);
  //   setButtonStyles(updatedStyles);
  // };
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };
  return (
    <div className="createPostPage">
      <div className="cpContainer">
        <h1>Create A Post</h1>
        {user && (
          <div className="AuthorImgCt">
            <img
              className="AuthorImg"
              src={user.photoURL}
              width={60}
              height={60}
            />
          </div>
        )}
        <label>Author:</label>
        <div className="Author">{user && user.displayName}</div>
        <div className="catagories-post">
          <button
            className={`catagories-btn ${selectedCategory === "MOVIES" ? 'selected' : ''}`}
            onClick={() => handleCategoryClick("MOVIES")}
          >
            MOVIES
          </button>
          <button
            className={`catagories-btn ${selectedCategory === "SERIES" ? 'selected' : ''}`}
            onClick={() => handleCategoryClick("SERIES")}
          >
            SERIES
          </button>
          <button
            className={`catagories-btn ${selectedCategory === "BOOKS" ? 'selected' : ''}`}
            onClick={() => handleCategoryClick("BOOKS")}
          >
            BOOKS
          </button>
        </div>
        <div className="inputTitle">
          <label>Title:</label>
          <input
            placeholder="Enter your title here..."
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
        </div>
        <div className="inputPostt">
          <label>Post:</label>
          <textarea
            placeholder="Describe your post here..."
            onChange={(event) => {
              setPost(event.target.value);
            }}
          />
        </div>
        <div className="postButton">
          <button className="buttonPf" onClick={() => navigate(-1)}>
            Cancel
          </button>
          <button className="buttonPf" onClick={createPost}>
            Post
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreatePost;
