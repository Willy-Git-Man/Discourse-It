import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { deleteChannelThunk, getAllChannelsThunk } from "../../store/channels";
import EditChannelForm from "./editChannel";
// import EditChannelModal from "./EditModal";
import "./index.css";
import PostChannelForm from "./postChannel";

export default function UserChannels() {
  const dispatch = useDispatch();
  const id = useParams();
  const ID = id.userId;
  console.log("ID:", ID);
  useEffect(() => {
    dispatch(getAllChannelsThunk(ID));
  }, [dispatch, ID]);
  const sessionUser = useSelector((state) => state.session.user);

  const channelArray = useSelector((state) =>
    Object.values(state.channels.channels)
  );

  const handleDelete = async (id) => {
    dispatch(deleteChannelThunk(id));
  };

  return (
    <div className="userChannelMainDiv">
        {+ID === sessionUser.id && (
      <div className="eachUserChannelDiv">
          <div>
            <PostChannelForm />
          </div>
      </div>
        )}

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
          {channel.user_id === sessionUser.id && (
            <div>
              <button
                className="deleteChannelButton"
                onClick={() => handleDelete(channel.id)}
              >
                Delete Channel
              </button>
              <EditChannelForm channelId={channel.id} />
            </div>
          )}
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
