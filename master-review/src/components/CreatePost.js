import React from "react";
import { useState, useEffect } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import "./CreatePost.css";
import { imageStorage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

function CreatePost() {
  const [title, setTitle] = useState("");
  const [post, setPost] = useState("");
  const [user, setUser] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const navigate = useNavigate();
  const postCollectionRef = collection(db, "master-review-posts");
  const [image, setImage] = useState();
  const [error, setError] = useState("");
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
    });
  }, []);

  const validateFields = () => {
    if (!title || !post || !image || !selectedCategory) {
      setError("Please fill in all required fields.");
      alert("Please fill in all required fields.");
      return false;
    }
    return true;
  };

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

  // const handleImageUpload = async () => {

  //   const imageRef = ref(imageStorage, `master-review/images/${image.name}`)

  //   return uploadBytes(imageRef, image).then((snapshot) => {
  //     const imageUrl = getDownloadURL(snapshot.ref).then((url) => {
  //       console.log(url)
  //     })
  //   })

  // };

  const handleImageUpload = async () => {
    const imageRef = ref(imageStorage, `master-review/images/${image.name}`);

    try {
      await uploadBytes(imageRef, image);
      const imageUrl = await getDownloadURL(imageRef);

      // Store the imageUrl in the post data
      await addDoc(postCollectionRef, {
        title,
        post,
        user: { name: user.displayName, id: user.uid, photoURL: user.photoURL },
        category: selectedCategory,
        imageUrl, // Add this line to store the image URL
      });

      // Navigate after successful upload
      navigate("/");
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handlePostClick = async () => {
    if (validateFields()) {
      setError("");
      handleImageUpload();
    }
  };
  return (
    <div className="createPostPage">
      <div className="cpContainer">
        <h1>Create a post</h1>
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
        <label>Category:</label>
        <div className="catagories-post">
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
        {selectedCategory === "" && (
          <div className="category-warning">
            Please select a category<span className="required">*</span>
          </div>
        )}
        <div className="inputTitle">
          <label>Title:</label>
          <input
            placeholder="Enter your title here..."
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
          {!title && (
            <div className="required-warning">
              Please enter a title<span className="required">*</span>
            </div>
          )}
        </div>
        <div className="uploadImage">
          <label>Image:</label>
          <input
            type="file"
            onChange={(event) => setImage(event.target.files[0])}
          />
        </div>
        {!image && (
          <div className="required-warning">
            Please select an image<span className="required">*</span>
          </div>
        )}
        <div className="inputPostt">
          <label>Post:</label>
          <textarea
            placeholder="Describe your post here..."
            onChange={(event) => {
              setPost(event.target.value);
            }}
          />
          {!post && (
            <div className="required-warning">
              Please enter a post<span className="required">*</span>
            </div>
          )}
        </div>
        {error && <div className="error-message">{error}</div>}
        <div className="postButton">
          <button className="buttonPf1" onClick={() => navigate(-1)}>
            Cancel
          </button>
          <button className="buttonPf2" onClick={handlePostClick}>
            Post
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreatePost;
