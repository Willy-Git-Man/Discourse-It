import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { deleteChannelThunk, getAllChannelsThunk } from "../../store/channels";
import User from "../User";
import EditChannelModal from "./EditModal";
// import EditChannelModal from "./EditModal";
import "./index.css";

export default function UserChannels() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const id = useParams();
  const ID = id.userId;

  useEffect(() => {
    dispatch(getAllChannelsThunk(ID));
  }, [dispatch, ID]);

  const channelArray = useSelector((state) =>
    Object.values(state.channels.channels)
  );


  const handleDelete = async (id) => {
    dispatch(deleteChannelThunk(id));
  };



  return (
    <div className="userChannelMainDiv">

<div className="userChannelsOverHeaderDiv">

  {channelArray.length < 1 && (
    <h1 className="emptyChannelsMessage">Add Channels!</h1>
  )}

      {channelArray.map((channel) => (
        <div key={channel.id} className="eachUserChannelDiv">
          <img
            className="channelPicture"
            src={channel.channel_picture}
            alt="Broken Img URL"
            />
          <NavLink className="channelNavTag" activeClassName='activeChannelNavTag'
            key={channel.id}
            to={`/users/${channel.user_id}/${channel.id}`}
            >
            {channel.channel_name}
          </NavLink>

          {channel.user_id === sessionUser.id && (
            <div className="channelEditDeleteDiv">
              <EditChannelModal channelId={channel.id}/>
              <button
                className="deleteChannelButton"
                onClick={() => handleDelete(channel.id)}
                >
                Delete
              </button>
            </div>
          )}
        </div>
      ))}

      </div>
<div className="userChannelProfileDiv">

<User />
</div>

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
