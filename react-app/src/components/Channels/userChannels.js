import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { deleteChannelThunk, getAllChannelsThunk } from "../../store/channels";
import EditChannelForm from "./editChannel";
import EditChannelModal from "./EditModal";
import "./index.css";

export default function UserChannels() {
  const dispatch = useDispatch();
  const id = useParams();
  const ID = id.userId;
  useEffect(() => {
      dispatch(getAllChannelsThunk(ID));
    }, [dispatch, ID]);
    const sessionUser = useSelector((state) => state.session.user);
    // const user_id = sessionUser.id;
    // console.log('user_id:', user_id)
    console.log("id:", ID);

    // const yes =dispatch(getAllChannelsThunk(ID))

  // const channelState = useSelector((state) => Object.values(state.channels.channels));
  // console.log('channelState[ID]:', channelState[8].user_id)
  const channelArray = useSelector((state) => Object.values(state.channels.channels));
  // console.log('channelArray:', channelArray)
  // console.log("channelState:", channelState);
  // const channelKeysArray = Object.keys(channelState);
  // console.log("channelKeysArray:", channelKeysArray);
  // const hello = channelKeysArray.filter((key) => channelState[key].user_id === 1 )

  // const hello2 = channelKeysArray.filter((key) => {
  //   channelState[key].user_id = 1
  // })
  // console.log('hello:', hello)

  const handleDelete = async (id) => {
    dispatch(deleteChannelThunk(id));
  };



    // {/* {channelKeysArray
    //   ?.filter((channel) => channelState[channel]?.user_id === ID)
    //   .map((channel) => ( */}
  return (
    <div className="userChannelMainDiv">
      {channelArray.map((channel) => (

          <div key={channel.id} className="eachUserChannelDiv">
            <img
              className="channelPicture"
              src={channel.channel_picture}
              alt="Broken Img URL"
            />
            Link: to this channel page:{" "}
            <NavLink
              key={channel.id}
              to={`/users/${channel.user_id}/${channel.id}`}
            >
              {channel.channel_name}
            </NavLink>
            <p className="eachChannelTitle">
              Oops {channel.user_id}-- Channel Name: {channel.channel_name},
              Channel ID: {channel.id}
            </p>
            <button
              className="deleteChannelButton"
              onClick={() => handleDelete(channel.id)}
            >
              Delete Channel
            </button>
            <EditChannelForm channelId={channel.id} />
            {/* <EditChannelModal /> */}
          </div>
          // : null}
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
