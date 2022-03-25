import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink } from "react-router-dom";
import { deletePostThunk, getAllPostsThunk } from "../../store/posts";
import { getUsersThunk } from "../../store/session";
import EditPostModal from "./EditPostModal";
import "./index.css";

export default function ChannelPosts() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const { userId, channelId } = useParams();


  useEffect(() => {
    dispatch(getAllPostsThunk(channelId));
    dispatch(getUsersThunk());
  }, [dispatch, channelId]);

  const postArray = useSelector((state) => Object.values(state.posts.posts));
  // const postKeysArray = useSelector((state) => Object.keys(state.posts.posts));

  const channelObj = useSelector((state) => state.channels.channels);
  const users = useSelector((state) => state.session.users);

  const handleDelete = async (id) => {
    dispatch(deletePostThunk(id));
  };

  const revPostArr = postArray.reverse();

  const handlePicture = (e) => {
    e.target.src =
      "https://cdn.pixabay.com/photo/2020/07/19/20/48/broken-5421234_1280.png";
  };
  return (
    <div className="channelPostsMainDiv">
      <h4 className="channelTitleForPostPage">
        {channelObj && channelId ? channelObj[channelId]?.channel_name : null}
      </h4>

      {revPostArr.map((post) => (
        <div className="eachPostDiv" key={post.id}>
          <img
            className="postPicture"
            src={post.post_picture}
            alt="Broken Img URL"
            onError={handlePicture}
          />

          <div className="postTitleAndEdit">
            <NavLink
              className="eachPostUserNavLink"
              to={post ? `/users/${post.user_id}` : null}
            >
              <h4 className="postUserNavLinkTitle">
                {users ? users[post.user_id]?.username : null}
              </h4>
            </NavLink>

            <h3 className="postTitle">{post.post_title}</h3>

            {post.user_id === sessionUser.id && (
              <div className="postDeleteUpdateButtons">
                <button
                  className="deletePostButton"
                  onClick={() => handleDelete(post.id)}
                >
                  Delete
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
