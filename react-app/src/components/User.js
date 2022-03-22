import React, { useState, useEffect } from "react";
import {  useParams } from "react-router-dom";
import CreateChannelModal from "./Channels/CreateChannelModal";
import './homePage.css'

function User() {
  const [user, setUser] = useState({});
  const { userId } = useParams();

  useEffect(() => {
    if (!userId) {
      return;
    }
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      setUser(user);
    })();
  }, [userId]);

  if (!user) {
    return null;
  }

  return (
    <div className="userPageHeader">
        <img className="channelPictureUser" src={user.profile_picture} alt="Broken Img URL"/>
     <h2 className="userPageName">{user.username}</h2>
     <CreateChannelModal />

    </div>
  );
}
export default User;
