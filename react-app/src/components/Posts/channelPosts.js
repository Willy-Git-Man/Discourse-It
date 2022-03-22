import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink } from "react-router-dom";

import { getAllChannelsThunk } from "../../store/channels";
// import { deleteChannelThunk, getAllChannelsThunk } from "../../store/channels";
import { deletePostThunk, getAllPostsThunk } from "../../store/posts";
import { getUsersThunk } from "../../store/session";

import CreatePostModal from "./CreatePostModal";
import EditPostModal from "./EditPostModal";
import "./index.css";

export default function ChannelPosts() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const { userId, channelId } = useParams();

  useEffect(() => {
    dispatch(getAllPostsThunk(channelId));
    dispatch(getUsersThunk())


  }, [dispatch, channelId]);

  const postArray = useSelector((state) => Object.values(state.posts.posts));
  const postKeysArray = useSelector((state) => Object.keys(state.posts.posts));

  const channelObj = useSelector((state) => state.channels.channels);

  const users = useSelector((state) => state.session.users)
  console.log("users:", users)

  const handleDelete = async (id) => {
    dispatch(deletePostThunk(id));
  };

  // useEffect(() => {
  //   dispatch(getAllChannelsThunk(channelId));
  // }, [dispatch, channelId]);

  // const channelKeysArray = useSelector((state) =>
  //   Object.keys(state.channels.channels)
  // );

  // const channelsArray = useSelector((state) =>
  //   Object.values(state.channels.channels)
  // );


  // const object = {};

  // const test = channelKeysArray.forEach((key, i) => {
  //   object[key] = channelsArray[i];
  // });

  // const currentChannelKey = channelKeysArray[+channelId];

  // const object2 = {}
  // const test2 = postKeysArray.forEach((key, i) => {
  //   object2[key] = postArray[i];
  // });


  return (
    <div className="channelPostsMainDiv">

      {/* <h1>{channelObj[channelId].channel_name}</h1> */}
      {/* <NavLink to={`/users/${+userId}`}>Return to User</NavLink> */}

      {/* <CreatePostModal /> */}
      {/* {postKeysArray?.filter((key) => postArray[key -1]?.channel_id === +channelId).map((post) => (
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
      {/*
{channelsArray.filter((channel) => channel.user_id === +userId).map((channel) =>(
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
))} */}

{postArray.length < 1 && (
    <h1 className="emptyChannelsMessage">Create Posts to Discourse-It!</h1>
  )}
      <h1>{channelObj[channelId].channel_name}</h1>

      {postArray.map((post) => (


        <div className="eachPostDiv" key={post.id}>
          <img
            className="postPicture"
            src={post.post_picture}
            alt="Broken Img URL"
          />

          <div className="postTitleAndEdit">
            <h1>{users[post.user_id].username}</h1>
          {/* <NavLink to={`/users/${post.user_id}`}>hello</NavLink> */}

            <h2 className="postTitle">
              {post.post_title}: {post.id}
            </h2>

            {post.user_id === sessionUser.id && (
              <div className="postDeleteUpdateButtons">
                <button
                  className="deletePostButton"
                  onClick={() => handleDelete(post.id)}
                >
                  Delete Post
                </button>

                {/* <EditPostForm postId={post.id}/> */}
                <EditPostModal postId={post.id} />
              </div>
            )}
          </div>
        </div>
      ))}

      {/* <CreatePostModal /> */}

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

      {/* <CreatePostForm /> */}

      {/* <CreatePostModal /> */}

    </div>
  );
}
