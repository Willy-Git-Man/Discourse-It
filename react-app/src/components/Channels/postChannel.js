import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postChannelThunk } from "../../store/channels";
import { NavLink, useParams } from "react-router-dom";

import "./index.css";

const PostChannelForm = () => {
  const dispatch = useDispatch();
  // const id = useParams();
  // const ID = id.userId;
  const [channelName, setChannelName] = useState("");
  const [channelPicture, setChannelPicture] = useState("");
  // const [errors, setErrors] = useState([]);

  const newChannelName = (e) => setChannelName(e.target.value);
  const newChannelPicture = (e) => setChannelPicture(e.target.value);

  const sessionUser = useSelector((state) => state.session.user);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newChannel = {
      user_id: sessionUser.id,
      channelName,
      channelPicture,
    };
    dispatch(postChannelThunk(newChannel));
    setChannelName("");
    setChannelPicture("");
  };

  return (
    <div className="postChannelFormDiv">
    {/* {+ID === sessionUser.id && ( */}

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
      {/* )} */}
    </div>

  );
};

export default PostChannelForm;
