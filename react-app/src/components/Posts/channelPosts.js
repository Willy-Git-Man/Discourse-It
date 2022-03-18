import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { getAllPostsThunk } from "../../store/posts";
import "./index.css";

export default function ChannelPosts() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const channelArray = useSelector((state) =>
  Object.values(state.channels.channels)
);

console.log('channelArray:', channelArray)

  const postArray = useSelector((state) => Object.values(state.posts.posts));
  console.log("postState:", postArray);
  const { channelId, userId } = useParams();
  const ID = channelId;
  // console.log("ID:", ID);
  // console.log("channelId:", channelId, "userId:", userId);
  useEffect(() => {
    dispatch(getAllPostsThunk(ID));
  }, [dispatch, ID]);

  console.log("Channel Name:", )

  return (
    <div className="channelPostsMainDiv">
      <h1>Hello Will</h1>

      {postArray.map((post) => (
        <div key={post.id} className="eachChannelPostDiv">
          <img
            className="postPicture"
            src={post.channel_picture}
            alt="Broken Img URL"
          />
          Link: to this channel page:{" "}
          <p className="eachPostTitle">
            Id {post.id} -- Channel Id: {post.channel_id} -- Title: {post.title}
          </p>
        </div>
      ))}
    </div>
  );
}
