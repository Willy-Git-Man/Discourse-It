import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { postChannelThunk } from "../../store/channels";
import "./index.css";

const PostChannelForm = () => {
  const dispatch = useDispatch();
  const [channelName, setChannelName] = useState("");
  const [channelPicture, setChannelPicture] = useState("");
  // const [errors, setErrors] = useState([]);

  const newChannelName = (e) => setChannelName(e.target.value);
  const newChannelPicture = (e) => setChannelPicture(e.target.value);

  const sessionUser = useSelector((state) => state.session.user);

  // const id = useParams()
  // const ID = id.userId;
  // console.log(' post id:', id.userId)
  // console.log('id:', id)
  const handleSubmit = (e) => {
    e.preventDefault();


    const newChannel = {
      user_id: sessionUser.id,
      channelName,
      channelPicture,
    };
    dispatch(postChannelThunk(newChannel));
    setChannelName("")
    setChannelPicture("")
  };


  return (
    <div className="postChannelFormDiv">

      <form className="postChannelForm" onSubmit={handleSubmit}>
        <label htmlFor="channelName">Channel Name: </label>
        <input
          type="text"
          name="channelName"
          value={channelName}
          onChange={newChannelName}
          required
          />

        <label htmlFor="channelPicture">Channel Picture: </label>
        <input
          type="text"
          name="channelPicture"
          value={channelPicture}
          onChange={newChannelPicture}
          required
        />

        <button className="postChannelButton" type="submit">
          Create Channel
        </button>
      </form>

    </div>
  );
};

export default PostChannelForm;
