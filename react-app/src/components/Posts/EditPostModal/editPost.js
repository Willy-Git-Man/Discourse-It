import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
// import { useParams } from "react-router-dom";
import { updatePostThunk } from "../../../store/posts";
import "../index.css";

const EditPostForm = ({postId, setShowModal}) => {
  const dispatch = useDispatch();
  const { channelId, userId } = useParams();


  const [postTitle, setPostTitle] = useState("");
  const [postPicture, setPostPicture] = useState("");
  const [errors, setErrors] = useState([])

  const newPostTitle = (e) => setPostTitle(e.target.value);
  const newPostPicture = (e) => setPostPicture(e.target.value);

  const sessionUser = useSelector((state) => state.session.user);

  // const {userid} = useParams()
  useEffect(() => {
    const validationErrors = []

    if (postTitle.length === 0) validationErrors.push("Post Title field is required")
    if (postPicture.length === 0) validationErrors.push("Picture field is required")
    if (postTitle.length > 50) validationErrors.push('Post Title must be less than 50 characters')
    if (postPicture.length > 750) validationErrors.push('Picture must be less than 750 characters')
    if (!postPicture.match(/\.(jpeg|jpg|gif|png)$/) || !postPicture.includes("https://")) validationErrors.push('Picture must be a valid Picture Url')


    setErrors(validationErrors)
  }, [postTitle, postPicture])

  const handleSubmit = (e) => {
    e.preventDefault();

    const editedPost = {
      id: postId,
      channel_id: +channelId,
      user_id: sessionUser.id,
      post_title: postTitle,
      post_picture: postPicture,
    };


    dispatch(updatePostThunk(editedPost));
    setPostTitle("")
    setPostPicture("")
    setShowModal(false)
  };




  return (
    <div className="editPostFormDiv">
      <form className="editPostForm" onSubmit={handleSubmit}>
      <ul className="errors">
        {errors.map((error) => (
          <li key={error}>{error}</li>
        ))}
      </ul>
        <label htmlFor="postTitle">Post Title: </label>
        <input
          type="text"
          name="postTitleName"
          value={postTitle}
          onChange={newPostTitle}
          required
        />

        <label htmlFor="postPicture">Post Picture: </label>
        <input
          type="text"
          name="postPictureName"
          value={postPicture}
          onChange={newPostPicture}
          required
        />

        <button className="editPostButton" type="submit">
          Update
        </button>
      </form>
    </div>
  );
};

export default EditPostForm;
