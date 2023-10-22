import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db, auth } from "../firebase";
import "./EditPostPage.css";
import { imageStorage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

function EditPostPage() {
  const { postId } = useParams();
  const [title, setTitle] = useState("");
  const [post, setPost] = useState("");
  const [user, setUser] = useState(null);
  const [image, setImage] = useState(null);
  const [imageFileName, setImageFileName] = useState("");
  const [imageUrl, setImageUrl] = useState(""); // State for the image URL
  const [selectedCategory, setSelectedCategory] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postDoc = await getDoc(doc(db, "master-review-posts", postId));

        if (postDoc.exists()) {
          const postData = postDoc.data();
          setTitle(postData.title);
          setPost(postData.post);
          setImageUrl(postData.imageUrl);
        } else {
          // Handle post not found
          console.error("Post not found");
        }
      } catch (error) {
        // Handle other potential errors
        console.error("Error fetching post:", error.message);
      }
    };

    fetchPost();
  }, [postId]);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
    });
  }, []);

  const updatePost = async () => {
    try {
      const postRef = doc(db, "master-review-posts", postId);

      if (!postRef) {
        console.error("Post reference is undefined");
        return;
      }

      if (image) {
        const imageRef = ref(
          imageStorage,
          `master-review/images/${image.name}`
        );
        await uploadBytes(imageRef, image);
        const imageUrl = await getDownloadURL(imageRef);

        await updateDoc(postRef, {
          title: title,
          post: post,
          category: selectedCategory,
          imageUrl: imageUrl, // Update the imageUrl
        });
      } else {
        // If no new image is selected, update without imageUrl
        await updateDoc(postRef, {
          title: title,
          post: post,
          category: selectedCategory,
        });
      }

      navigate(-1);
    } catch (error) {
      console.error("Error updating post:", error.message);
    }
  };

  const handleCategorySelection = (category) => {
    setSelectedCategory(category);
  };
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];
    setImage(selectedImage);

    // Use a FileReader to read the file name asynchronously
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageFileName(selectedImage ? selectedImage.name : "No file selected");
    };
    reader.readAsDataURL(selectedImage);
  };

  return (
    <div className="editePageBG">
      <div className="editBlog">
        {user && (
          <>
            <h1>Edit Post</h1>

            <div>
              <img
                className="AuthorImg"
                src={user.photoURL}
                width={60}
                height={60}
              />
            </div>
            <label>Author:</label>
            <label>{user.displayName}</label>
            <label>Category:</label>

            <div>
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

            <div>
              <label>Title:</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            
            {imageUrl && (
              <div className="current-image-edit">
                <label>Current Image:</label>
                <img src={imageUrl} alt="Current Image" />
              </div>
            )}
            
            <div>
              <label>Change Image:</label>
              <input
                type="file"
                onChange={handleImageChange}
                // onChange={(event) => setImage(event.target.files[0])}
              />
            </div>

            <div>
              <label>Post:</label>
              <textarea
                value={post}
                onChange={(e) => setPost(e.target.value)}
              />
            </div>
            <div className="editButtonContainer">
              <button onClick={() => navigate(-1)} className="cancelButton">
                Cancel
              </button>
              <button onClick={updatePost} className="saveButton ">
                Save
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default EditPostPage;
