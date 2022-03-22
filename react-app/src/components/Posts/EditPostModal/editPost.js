import React, { useState } from "react";
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

  const newPostTitle = (e) => setPostTitle(e.target.value);
  const newPostPicture = (e) => setPostPicture(e.target.value);

  const sessionUser = useSelector((state) => state.session.user);

  // const {userid} = useParams()


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
        <label htmlFor="postTitle">Post Title: </label>
        <input
          type="text"
          name="postTitleName"
          value={postTitle}
          onChange={newPostTitle}
          // required
        />

        <label htmlFor="postPicture">Post Picture: </label>
        <input
          type="text"
          name="postPictureName"
          value={postPicture}
          onChange={newPostPicture}
          // required
        />

        <button className="editPostButton" type="submit">
          Update
        </button>
      </form>
    </div>
  );
};

export default EditPostForm;
