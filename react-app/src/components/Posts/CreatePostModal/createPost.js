import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import "../index.css";
import { createPost, createPostThunk } from "../../../store/posts";

const CreatePostForm = ({ setShowModal }) => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

  const { userId, channelId } = useParams();

  const [postTitle, setPostTitle] = useState("");
  // const [postPicture, setPostPicture] = useState("");
  const [errors, setErrors] = useState([]);
  const [img, setImg] = useState("");

  const newPostTitle = (e) => setPostTitle(e.target.value);
  const newPostPicture = (e) => setImg(e.target.value);
  useEffect(() => {
    const validationErrors = [];

    if (postTitle.length === 0) validationErrors.push("Post Title required");
    // if (postPicture.length === 0) validationErrors.push("Picture required")
    if (postTitle.length > 50)
      validationErrors.push("Post Title must be less than 50 characters");
    // if (postPicture.length > 750) validationErrors.push('Picture must be less than 750 characters')
    // if (!postPicture.match(/\.(jpeg|jpg|gif|png)$/) || !postPicture.includes("https://")) validationErrors.push('Invalid Img URL')

    setErrors(validationErrors);
  }, [postTitle]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("user_id", sessionUser.id);
    formData.append("channel_id", +channelId);
    formData.append("post_title", postTitle);
    formData.append("post_picture", img);
    console.log('form data', Object.fromEntries(formData))
    // const test = Object.fromEntries(formData)
    const results = await fetch("/api/posts/", {
      method: "POST",
      body: formData,
    });
    console.log('results', results.ok)
    if (results.ok) {
      const newPost = await results.json();
      dispatch(createPost(newPost));
      setShowModal(false);
    } else {
      // const data = results.json();
      // setErrors([data.errors]);
      console.log('error aws:')
    }
  };

  const updateImage = (e) => {
    const file = e.target.files[0];
    setImg(file);
  };

  return (
    <div className="createPostFormDiv">
      <form className="createPostForm" onSubmit={handleSubmit}>
        {/* <ul className="errors">
        {errors.map((error) => (
          <li key={error}>{error}</li>
        ))}
      </ul> */}
        <div className="formLabelInputDiv">
          <label htmlFor="postTitle">Post Title: </label>
          <input
            type="text"
            name="postTitle"
            value={postTitle}
            onChange={newPostTitle}
            required
          />
        </div>

        <div className="formLabelInputDiv">
          {/* <label htmlFor="postPicture">Picture: </label>
        <input
          type="text"
          name="postPicture"
          value={postPicture}
          onChange={newPostPicture}
          required
        /> */}
          <label htmlFor="chooseFileInput" className="choose-file-button">
            Picture Upload
          </label>
          <input
            type="file"
            id="chooseFileInput"
            accept="image/*"
            name="image"
            onChange={updateImage}
            // hidden='hidden'
          ></input>
        </div>

        <button
          className="formMainButton"
          type="submit"
          disabled={errors.length}
        >
          Create Post
        </button>

        {errors.length > 0 && (
          <ul className="errors">
            {errors.map((error) => (
              <li className="errorLi" key={error}>
                * {error}
              </li>
            ))}
          </ul>
        )}
      </form>
    </div>
  );
};

export default CreatePostForm;
