import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  deleteChannelThunk,
  getAllChannelsThunk,
  updateChannelThunk,
} from "../../store/channels";
import EditChannelForm from "./editChannel";
import './index.css'

export default function UserChannels() {
  const dispatch = useDispatch();

  const channelState = useSelector((state) => state.channels.channels);
  const channelArray = Object.values(channelState);
  // const sessionUser = useSelector((state) => state.session.user);

  // const [channelName, setChannelName] = useState("");
  // const [channelPicture, setChannelPicture] = useState("");

  // const newChannelName = (e) => setChannelName(e.target.value);
  // const newChannelPicture = (e) => setChannelPicture(e.target.value);

  useEffect(() => {
    dispatch(getAllChannelsThunk());
  }, [dispatch]);

  const handleDelete = async (id) => {
    dispatch(deleteChannelThunk(id));
  };

  // const handleUpdate = async (id) => {
  //   // console.log('handle update id:', id)

  //   const newChannel = {
  //     id: 58,
  //     user_id: sessionUser.id,
  //     channelName,
  //     channelPicture,
  //   };
  //   dispatch(updateChannelThunk(newChannel));
  // };

  return (
    <>
      {/* {channelArray.filter((channel) => channel.user_id === currentUser.id).map((channel) => ( */}
      {channelArray.map((channel) => (
        <div key={channel.id} className="eachUserChannelDiv">
          Link: to this channel page:     <NavLink
            key={channel.id}
            to={`/users/${channel.user_id}/${channel.id}`}
          >
            {channel.channel_name}
          </NavLink>
          <h3>Channel Name: {channel.channel_name}, Channel ID: {channel.id}</h3>
          <button
            className="deleteChannelButton"
            onClick={() => handleDelete(channel.id)}
          >
            Delete Channel
          </button>

          <EditChannelForm channelId={channel.id} />
        </div>
      ))}
    </>
  );
}

// const [channels, setChannels] = useState([]);
// useEffect(() => {
//   async function fetchData() {
//     const response = await fetch("/api/channels/");
//     const responseData = await response.json();
//     setChannels(responseData.channels);
//   }
//   fetchData();
// }, []);
