import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { getAllChannelsThunk } from "../../store/channels";
import { getAllPostsThunk } from "../../store/posts";
import "./index.css";

export default function ChannelPosts() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const { channelId, userId } = useParams();

  useEffect(() => {
    dispatch(getAllPostsThunk(channelId));
  }, [dispatch, channelId]);

  useEffect(() => {
    dispatch(getAllChannelsThunk(channelId));
  }, [dispatch, channelId]);

  const channelKeysArray = useSelector((state) =>
    Object.keys(state.channels.channels)
  );
  console.log("channelKeysArray:", channelKeysArray);

  const channelArray = useSelector((state) =>
    Object.values(state.channels.channels)
  );

  const object = {};

  const test = channelKeysArray.forEach((key, i) => {
    object[key] = channelArray[i];
  });
  console.log("object:", object);

  console.log("test:", test);

  const currentChannelKey = channelKeysArray[+channelId];
  console.log("currentChannelKey:", currentChannelKey);
  console.log("channelArray:", channelArray);
  console.log("channelKeysArray at channel Id:", channelKeysArray[+channelId]);

  const postArray = useSelector((state) => Object.values(state.posts.posts));
  const postKeysArray = useSelector((state) => Object.keys(state.posts.posts));



  const object2 = {}
  const test2 = postKeysArray.forEach((key, i) => {
    object2[key] = postArray[i];
  });

  console.log("Test Two:", object2)



  console.log('postKeysArray:', postKeysArray)
  console.log("postArray:", postArray);
  // const ID = channelId;

  console.log("Channel Name:");

  return (
    <div className="channelPostsMainDiv">
      <h1>{object[channelId].channel_name}</h1>
      <NavLink to={`/home`}>home</NavLink>
      {postKeysArray?.filter((key) => postArray[key -1]?.channel_id === +channelId).map((post) => (
        <div key={post.id} className="eachChannelPostDiv">
        {post.channel_id === +channelId && (
          <div>
            <h1>{post.post_title}</h1>
          </div>
        )}
        <img
          className="postPicture"
          src={post.channel_picture}
          alt="Broken Img URL"
        />
        Link: to this channel page:{" "}
        <p className="eachPostTitle">
          Id {post.id} -- Channel Id: {post.channel_id} -- Title:{" "}
          {post.post_title}
        </p>
      </div>
      ))}

      {/* {postArray.map((post) => ( */}
      {/* {postArray.map((post) => (

        <div key={post.id} className="eachChannelPostDiv">
          {post.channel_id === +channelId && (
            <div>
              <h1>{post.post_title}</h1>
            </div>
          )}
          <img
            className="postPicture"
            src={post.channel_picture}
            alt="Broken Img URL"
          />
          Link: to this channel page:{" "}
          <p className="eachPostTitle">
            Id {post.id} -- Channel Id: {post.channel_id} -- Title:{" "}
            {post.post_title}
          </p>
        </div>
      ))} */}
    </div>
  );
}
