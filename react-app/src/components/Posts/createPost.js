import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import "./index.css";
import { createPostThunk } from "../../store/posts";

const CreatePostForm = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

  const {userId, channelId} = useParams();

  const [postTitle, setPostTitle] = useState("");
  const [postPicture, setPostPicture] = useState("");

  const newPostTitle = (e) => setPostTitle(e.target.value);
  const newPostPicture = (e) => setPostPicture(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newPost = {
      user_id: sessionUser.id,
      channel_id: +channelId,
      post_title: postTitle,
      post_picture: postPicture
    };
    dispatch(createPostThunk(newPost))
    setPostTitle("")
    setPostPicture("")
  };

  return (
    <div className="createPostFormDiv">
      <form className="createPostForm" onSubmit={handleSubmit}>
        <label htmlFor="postTitle">Channel Name: </label>
        <input
          type="text"
          name="postTitle"
          value={postTitle}
          onChange={newPostTitle}
          required
        />

        <label htmlFor="postPicture">Channel Picture: </label>
        <input
          type="text"
          name="postPicture"
          value={postPicture}
          onChange={newPostPicture}
          required
        />

        <button className="createPostButton" type="submit">
          Create Post
        </button>
      </form>
    </div>
  );
};

export default CreatePostForm;
