import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
// import { deleteChannelThunk, getAllChannelsThunk } from "../../store/channels";
import { deletePostThunk, getAllPostsThunk } from "../../store/posts";
import CreatePostForm from "./createPost";
import EditPostForm from "./editPost";
import "./index.css";

export default function ChannelPosts() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const { channelId, userId } = useParams();

  useEffect(() => {
    dispatch(getAllPostsThunk(channelId));
  }, [dispatch, channelId]);

  const postArray = useSelector((state) => Object.values(state.posts.posts));
  // const postKeysArray = useSelector((state) => Object.keys(state.posts.posts));

  const handleDelete = async (id) => {
    dispatch(deletePostThunk(id));
  };


  // useEffect(() => {
  //   dispatch(getAllChannelsThunk(channelId));
  // }, [dispatch, channelId]);

  // const channelKeysArray = useSelector((state) =>
  //   Object.keys(state.channels.channels)
  // );

  // const channelArray = useSelector((state) =>
  //   Object.values(state.channels.channels)
  // );

  // const object = {};

  // const test = channelKeysArray.forEach((key, i) => {
  //   object[key] = channelArray[i];
  // });

  // const currentChannelKey = channelKeysArray[+channelId];




  // const object2 = {}
  // const test2 = postKeysArray.forEach((key, i) => {
  //   object2[key] = postArray[i];
  // });

  // console.log('test2:', object2)


  return (
    <div className="channelPostsMainDiv">
      {/* <h1>{object[channelId].channel_name}</h1> */}
      <NavLink to={`/users/${+userId}`}>Return to User</NavLink>
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

      {postArray.map((post) => (
        <div className="eachPostDiv" key={post.id}>


        <img
            className="postPicture"
            src={post.post_picture}
            alt="Broken Img URL"
            />

            <h2 className="postTitle">{post.post_title}: {post.id}</h2>

        {post.user_id === sessionUser.id && (
            <div className="postDeleteUpdateButtons">
              <button
                className="deletePostButton"
                onClick={() => handleDelete(post.id)}
              >
                Delete Post
              </button>

              <EditPostForm postId={post.id}/>
            </div>
          )}





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

<CreatePostForm />

    </div>
  );
}
