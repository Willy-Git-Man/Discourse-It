import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory, useParams } from "react-router-dom";
import { deleteChannelThunk, getAllChannelsThunk } from "../../store/channels";
import User from "../User";
import EditChannelModal from "./EditModal";
// import EditChannelModal from "./EditModal";
import "./index.css";

export default function UserChannels() {
  const dispatch = useDispatch();
  const history = useHistory()
  const sessionUser = useSelector((state) => state.session.user);
  const id = useParams();
  const ID = id.userId;

  useEffect(() => {
    dispatch(getAllChannelsThunk(ID));
  }, [dispatch, ID]);

  const channelArray = useSelector((state) =>
    Object.values(state.channels.channels)
  );


  const revChannelArr = channelArray.reverse();

  const handleDelete = async (id) => {
    dispatch(deleteChannelThunk(id));
    history.push(`/users/${+ID}`)
  };

  const handlePicture = (e) => {
    e.target.src= "https://cdn.pixabay.com/photo/2020/07/19/20/48/broken-5421234_1280.png"
  }

  return (
    <div className="userChannelMainDiv">
          <h1 className="emptyChannelsMessage">Channel List</h1>
      <div className="userChannelsOverHeaderDiv">

        {revChannelArr.map((channel) => (
          <div key={channel.id} className="eachUserChannelDiv">
            <img
              className="channelPicture"
              src={channel.channel_picture}
              alt="Broken Img URL"
              onError={handlePicture}
            />
            <NavLink
              className="channelNavTag"
              activeClassName="activeChannelNavTag"
              key={channel.id}
              to={`/users/${channel.user_id}/${channel.id}`}
            >
              <h3 className="channelNameLinkP">{channel.channel_name}</h3>
            </NavLink>

            {channel.user_id === sessionUser.id && (
              <div className="channelEditDeleteDiv">
                <EditChannelModal channelId={channel.id} />
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
