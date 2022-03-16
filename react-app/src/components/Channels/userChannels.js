import { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { deleteChannelThunk, getAllChannelsThunk } from "../../store/channels";

export default function UserChannels() {
  const dispatch = useDispatch();

  const channelState = useSelector((state) => state.channels.channels);
  // const currentUser = useSelector((state) => state.session.user)

  const channelArray = Object.values(channelState)
  console.log("channelState:", channelState);
  // console.log('channelArray:', channelArray)

  useEffect(() => {
    dispatch(getAllChannelsThunk());
  }, [dispatch]);


  const handleDelete = async () => {
    dispatch(deleteChannelThunk(1));
  };

  return (
    <>
      {/* {channelArray.filter((channel) => channel.user_id === currentUser.id).map((channel) => ( */}
      {channelArray.map((channel) => (

          <div className="eachUserChannelDiv">
          {/* <NavLink to={`/users/${user.id}`}>{user.username}</NavLink> */}
          {/* <NavLink key={channel.id} to={`/users/${channel.user_id}/${channel.id}}`}>{channel.channel_name}</NavLink> */}
          <h1>Channel ID: {channel.id} Channel Name: {channel.channel_name}</h1>
          <button className="deleteChannelButton" onClick={() => handleDelete()}>
            Delete Channel
          </button>
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
