import React from "react";
import { useState, useEffect } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
function CreatePost() {
  const [title, setTitle] = useState("");
  const [post, setPost] = useState("");
  const navigate = useNavigate();
  const postCollectionRef = collection(db, "master-review-posts");
  const createPost = async () => {
    await addDoc(postCollectionRef, {
      title,
      post,
      user: { name: auth.currentUser.displayName, id: auth.currentUser.uid },
    });
    navigate("/");
  };
  

  return (
    <div className="createPostPage">
      <div className="cpContainer">
        <h1>Create A Post</h1>
        <div className="inputTitle">
          <label>Title:</label>
          <input
            placeholder="Title..."
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
        </div>
        <div className="inputPostt">
          <label>Post:</label>
          <textarea
            placeholder="Post..."
            onChange={(event) => {
              setPost(event.target.value);
            }}
          />
        </div>
        <div className="postButton">
          <button onClick={createPost}>Post</button>
        </div>
      </div>
    </div>
  );
}

export default CreatePost;
