import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { deleteChannelThunk, getAllChannelsThunk } from "../../store/channels";
import EditChannelForm from "./editChannel";
import EditChannelModal from "./EditModal";
import "./index.css";

export default function UserChannels() {
  const dispatch = useDispatch();
  // const sessionUser = useSelector((state) => state.session.user);
  const channelState = useSelector((state) => state.channels.channels);
  const channelArray = Object.values(channelState);
  const channelKeysArray = Object.keys(channelState);


  // console.log('channelArray:', channelArray)
  console.log('channelArray:', channelArray[0])

  const {id} = useParams()
  console.log(id)
  const channelArrayUserIds = channelArray.filter(

    (channelPost) => (channelPost.user_id === id)


    );


    const test = channelKeysArray
    ?.filter((key) => channelState[key]?.user_id === 5)
    console.log('test:', test)


  console.log("channelArrayUserIds:", channelArrayUserIds);

  useEffect(() => {
    dispatch(getAllChannelsThunk());
  }, [dispatch]);

  const handleDelete = async (id) => {
    dispatch(deleteChannelThunk(id));
  };







  return (
    <div className="userChannelMainDiv">
      {/* {channelArray.filter((channel) => channel.user_id === currentUser.id).map((channel) => ( */}



      {/* {channelKeysArray
          ?.filter((channel) => channelState[channel]?.userId === 5)
          .map((channel) => ( */}
      {channelArray.map((channel) => (



        // {channelArray.filter((channelPost) => channelPost.user_id = sessionUser.id).map((channel) => (

        <div key={channel.id} className="eachUserChannelDiv">
          <img className="channelPicture" src={channel.channel_picture} alt="Broken Img URL"/>
          Link: to this channel page:{" "}
          <NavLink
            key={channel.id}
            to={`/users/${channel.user_id}/${channel.id}`}
          >
            {channel.channel_name}
          </NavLink>
          <p className="eachChannelTitle">
            Oops {channel.user_id}--
            Channel Name: {channel.channel_name}, Channel ID: {channel.id}
          </p>
          <button
            className="deleteChannelButton"
            onClick={() => handleDelete(channel.id)}
          >
            Delete Channel
          </button>
          <EditChannelForm channelId={channel.id} />
          <EditChannelModal />
        </div>
      ))}
    </div>
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
