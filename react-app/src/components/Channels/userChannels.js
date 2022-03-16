import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { deleteChannelThunk, getAllChannelsThunk, updateChannelThunk } from "../../store/channels";
import EditChannelForm from "./editChannel";

export default function UserChannels() {
  const dispatch = useDispatch();

  const channelState = useSelector((state) => state.channels.channels);

  const channelArray = Object.values(channelState);

  useEffect(() => {
    dispatch(getAllChannelsThunk());
  }, [dispatch]);

  const handleDelete = async (id) => {
    dispatch(deleteChannelThunk(id));
  };

  const handleUpdate = async (id) => {
    dispatch(updateChannelThunk(id))
  }

  return (
    <>
      {/* {channelArray.filter((channel) => channel.user_id === currentUser.id).map((channel) => ( */}
      {channelArray.map((channel) => (
        <div key={channel.id} className="eachUserChannelDiv">
          <NavLink
            key={channel.id}
            to={`/users/${channel.user_id}/${channel.id}`}
          >
            {channel.channel_name}
          </NavLink>
          <h1>
            Channel ID: {channel.id} Channel Name: {channel.channel_name}
          </h1>
          <button
            className="deleteChannelButton"
            onClick={() => handleDelete(channel.id)}
          >
            Delete Channel
          </button>
          <EditChannelForm />






          {/* <button
            className="deleteChannelButton"
            onClick={() => handleUpdate(channel.id)}
          >
            update
          </button> */}
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
