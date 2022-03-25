import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
import { updateChannelThunk } from "../../../store/channels";
import "../index.css";

const EditChannelForm = ({channelId, setShowModal}) => {
  const dispatch = useDispatch();
  const updateChannelInputState = useSelector((state) => state.channels.channels[channelId])
  // const [errors, setErrors] = useState([]);
  const [channelName, setChannelName] = useState(updateChannelInputState.channel_name);
  const [channelPicture, setChannelPicture] = useState(updateChannelInputState.channel_picture);
  const [errors, setErrors] = useState([])

  const newChannelName = (e) => setChannelName(e.target.value);
  const newChannelPicture = (e) => setChannelPicture(e.target.value);

  const sessionUser = useSelector((state) => state.session.user);


  // const {userid} = useParams()

  useEffect(() => {
    const validationErrors = []

    if (channelName.length === 0) validationErrors.push("Channel name field is required")
    if (channelPicture.length === 0) validationErrors.push("Picture field is required")
    if (channelName.length > 50) validationErrors.push('Channel name must be less than 50 characters')
    if (channelPicture.length > 750) validationErrors.push('Picture must be less than 750 characters')
    if (!channelPicture.match(/\.(jpeg|jpg|gif|png)$/) || !channelPicture.includes("https://")) validationErrors.push('Picture must be a valid Picture Url')


    setErrors(validationErrors)
  }, [channelName, channelPicture])


  const handleSubmit = (e) => {
    e.preventDefault();

    const newChannel = {
      id: channelId,
      user_id: sessionUser.id,
      channelName,
      channelPicture,
    };

    dispatch(updateChannelThunk(newChannel));
    setChannelName("")
    setChannelPicture("")
    setShowModal(false)
  };




  return (
    <div className="editChannelFormDiv">
      <form className="editChannelForm" onSubmit={handleSubmit}>
      {/* <ul className="errors">
        {errors.map((error) => (
          <li key={error}>{error}</li>
        ))}
      </ul> */}

<div className="formLabelInputDiv">
        <label htmlFor="channelName">Channel Name: </label>
        <input
          type="text"
          name="channelName"
          value={channelName}
          onChange={newChannelName}
          required
        />
        </div>


        <div className="formLabelInputDiv">
        <label htmlFor="channelPicture">Picture: </label>
        <input
          type="text"
          name="channelPicture"
          value={channelPicture}
          onChange={newChannelPicture}
          required
        />
        </div>

        <button className="formMainButton" type="submit"  disabled={errors.length}>
          Update
        </button>

        {errors.length > 0 && (

<ul className="errors">
      {errors.map((error) => (
        <li className="errorLi" key={error}>{error}</li>
        ))}
    </ul>
        )}
      </form>
    </div>
  );
};

export default EditChannelForm;
