import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postChannelThunk, updateChannelThunk } from "../../store/channels";
import "./index.css";

const EditChannelForm = () => {
  const dispatch = useDispatch();
  // const [errors, setErrors] = useState([]);
  const [channelName, setChannelName] = useState("");
  const [channelPicture, setChannelPicture] = useState("");

  const newChannelName = (e) => setChannelName(e.target.value);
  const newChannelPicture = (e) => setChannelPicture(e.target.value);

  const sessionUser = useSelector((state) => state.session.user);



  const handleSubmit = (e) => {
    e.preventDefault();

    const newChannel = {
      id: 58,
      user_id: sessionUser.id,
      channelName,
      channelPicture,
    };
    dispatch(updateChannelThunk(newChannel));
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
          // required
        />

        <label htmlFor="channelPicture">Channel Picture: </label>
        <input
          type="text"
          name="channelPicture"
          value={channelPicture}
          onChange={newChannelPicture}
          // required
        />

        <button className="postChannelButton" type="submit">
          Update
        </button>
      </form>
    </div>
  );
};

export default EditChannelForm;
