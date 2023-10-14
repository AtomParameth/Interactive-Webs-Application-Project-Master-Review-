import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db, auth } from "../firebase";
import "./EditPostPage.css";
function EditPostPage() {
  const { postId } = useParams();
  const [title, setTitle] = useState("");
  const [post, setPost] = useState("");
  const [user, setUser] = useState(null);
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

      // Check if postRef is defined before proceeding
      if (!postRef) {
        console.error("Post reference is undefined");
        return;
      }

      // You can add additional validation if needed

      await updateDoc(postRef, {
        title: title,
        post: post,
        category: selectedCategory,
      });

      // Optionally, you can navigate the user back to the post details page
      // after successful update
      navigate(-1);
    } catch (error) {
      // Handle errors during the update process
      console.error("Error updating post:", error.message);
    }
  };

  const handleCategorySelection = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="editePageBG">
      <div className="editBlog">
        {user && (
          <>
            <h1>Edit Post</h1>
            <label>Author:</label>
            <div>
              <img
                className="AuthorImg"
                src={user.photoURL}
                width={60}
                height={60}
              />
            </div>
            <label>Category:</label>
            <div className="category-button">
              <button className="category-buttons1" onClick={() => handleCategorySelection("MOVIES")}>
                MOVIES
              </button>
              <button className="category-buttons2" onClick={() => handleCategorySelection("SERIES")}>
                SERIES
              </button>
              <button className="category-buttons3" onClick={() => handleCategorySelection("BOOKS")}>
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
              <button onClick={updatePost} className="saveButton">
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
