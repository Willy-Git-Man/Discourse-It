import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { deleteChannelThunk, getAllChannelsThunk } from "../../store/channels";
import User from "../User";
import CreateChannelModal from "./CreateChannelModal";
import EditChannelForm from "./editChannel";
import EditChannelModal from "./EditModal";
// import EditChannelModal from "./EditModal";
import "./index.css";
import PostChannelForm from "./postChannel";

export default function UserChannels() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const id = useParams();
  const ID = id.userId;

  console.log("sessionUser:", sessionUser);
  useEffect(() => {
    dispatch(getAllChannelsThunk(ID));
  }, [dispatch, ID]);

  const channelArray = useSelector((state) =>
    Object.values(state.channels.channels)
  );

  console.log("channelArray:", channelArray);

  const handleDelete = async (id) => {
    dispatch(deleteChannelThunk(id));
  };

  return (
    <div className="userChannelMainDiv">
      <User />

      <div className="createChannelButtonDiv">

      {+ID === sessionUser.id && (
        <div className="createChannelModalDiv">
          <div className="createChannelModalSmallerDiv">
            {/* <PostChannelForm /> */}
            <CreateChannelModal />
          </div>
        </div>
      )}
      </div>

      {channelArray.map((channel) => (
        <div key={channel.id} className="eachUserChannelDiv">
          <img
            className="channelPicture"
            src={channel.channel_picture}
            alt="Broken Img URL"
          />
          <NavLink
            key={channel.id}
            to={`/users/${channel.user_id}/${channel.id}`}
          >
            {channel.channel_name}
          </NavLink>

          {channel.user_id === sessionUser.id && (
            <div>
              {/* <EditChannelForm channelId={channel.id} /> */}
              <EditChannelModal channelId={channel.id}/>
              <button
                className="deleteChannelButton"
                onClick={() => handleDelete(channel.id)}
              >
                Delete Channel
              </button>
            </div>
          )}
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
