import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { deleteChannelThink, getAllChannelsThunk } from "../../store/channels";


export default function UserChannels() {
  const dispatch = useDispatch()

  const channelState = useSelector((state) => state.channels.channels)
  // const sessionUser = useSelector((state) => state.session.user)
  // console.log('sessionUser:', sessionUser)

console.log('channelState:', channelState)
  useEffect(() => {
    dispatch(getAllChannelsThunk())
  }, [dispatch])

const [channels, setChannels] = useState([]);

useEffect(() => {
  async function fetchData() {
    const response = await fetch('/api/channels/');
    const responseData = await response.json();
    setChannels(responseData.channels);
  }
  fetchData();
}, []);

const handleDelete = async () => {
  dispatch(deleteChannelThink(1))
}
const channelComponents = channels.map((channel) => {
  console.log(channel)


  return (
    <li key={channel.id}>
      {/* <NavLink to={`/users/${user.id}`}>{user.username}</NavLink> */}
      {/* <NavLink to={`/users/${channel.user_id}/${channel.id}}`}>{channel.channel_name}</NavLink> */}
      <h1>{channel.channel_name}</h1>
      <button
                className="deleteChannelButton"
                onClick={() => handleDelete()}
              >
                Delete Channel
              </button>
    </li>
  );
});


return (
  <>
  <NavLink to={`/home`}>Home</NavLink>
    <h1>User List: </h1>
    <ul>{channelComponents}</ul>
  </>
);




}
