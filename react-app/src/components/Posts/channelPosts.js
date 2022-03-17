import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { getAllChannelsThunk } from "../../store/channels";
import "./index.css";

export default function ChannelPosts() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

  const {channelId, userId} = useParams();
  console.log('channelId:', channelId, 'userId', userId)

  






  return (

    <div className="channelPostsMainDiv">
      <h1>Hello Will</h1>
    </div>
  );
}
