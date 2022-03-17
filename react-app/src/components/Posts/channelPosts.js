import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import "./index.css";

export default function ChannelPosts() {
  const dispatch = useDispatch();
  const id = useParams();

  const sessionUser = useSelector((state) => state.session.user);



  return (

    <div className="channelPostsMainDiv">
      <h1>Hello Will</h1>
    </div>
  );
}
