import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { deleteChannelThunk, getAllChannelsThunk } from "../../store/channels";

export default function UserChannels() {
  const dispatch = useDispatch();

  const channelState = useSelector((state) => state.channels.channels);

  const channelArray = Object.values(channelState)
  console.log("channelState:", channelState);
  console.log('channelArray:', channelArray)

  useEffect(() => {
    dispatch(getAllChannelsThunk());
  }, [dispatch]);


  const handleDelete = async () => {
    dispatch(deleteChannelThunk(1));
  };
  const channelComponents = channelArray.map((channel) => {
    console.log(channel);

    return (
      <div>
        {/* <NavLink to={`/users/${user.id}`}>{user.username}</NavLink> */}
        {/* <NavLink key={channel.id} to={`/users/${channel.user_id}/${channel.id}}`}>{channel.channel_name}</NavLink> */}
        <h1>Channel ID: {channel.id} Channel Name: {channel.channel_name}</h1>
        <button className="deleteChannelButton" onClick={() => handleDelete()}>
          Delete Channel
        </button>
      </div>
    );
  });

  return (
    <>
      <NavLink to={`/home`}>Home</NavLink>
      <h1>User List: </h1>
      <div>{channelComponents}</div>
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
