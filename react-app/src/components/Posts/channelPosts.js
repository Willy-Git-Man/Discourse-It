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

  console.log("channelId", channelId)

  useEffect(() => {
    dispatch(getAllPostsThunk(channelId));
    dispatch(getUsersThunk())


  }, [dispatch, channelId]);

  const postArray = useSelector((state) => Object.values(state.posts.posts));
  const postKeysArray = useSelector((state) => Object.keys(state.posts.posts));

  const channelObj = useSelector((state) => state.channels.channels);
  console.log(channelObj, "channel obj")
  const users = useSelector((state) => state.session.users)
  console.log("users:", users)

  const handleDelete = async (id) => {
    dispatch(deletePostThunk(id));
  };

  return (
    <div className="channelPostsMainDiv">


{postArray.length < 1 && (
    <h1 className="emptyChannelsMessage">Create Posts to Discourse-It!</h1>
  )}
      <h1>{channelObj && channelId ? channelObj[channelId]?.channel_name : null}</h1>

      {postArray.map((post) => (


        <div className="eachPostDiv" key={post.id}>
          <img
            className="postPicture"
            src={post.post_picture}
            alt="Broken Img URL"
          />

          <div className="postTitleAndEdit">
           <NavLink to={post ? `/users/${post.user_id}` : null}><h1>{users ? users[post.user_id]?.username : null}</h1></NavLink>



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

                <EditPostModal postId={post.id} />
              </div>
            )}
          </div>
        </div>
      ))}



    </div>
  );
}
