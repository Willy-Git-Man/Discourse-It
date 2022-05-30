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

  const handlePicture = (e) => {
    e.target.src= "https://cdn.pixabay.com/photo/2020/07/19/20/48/broken-5421234_1280.png"
  }

  return (
    <div className="userPageHeader"
    style={{
      backgroundImage: `url(${user.profile_picture})`,
    }}

    >
        {/* <img className="channelPictureUser" src={user.profile_picture} alt="Broken Img URL" onError={handlePicture}/> */}
     <h3 className="userPageName">{user.username}</h3>
     <CreateChannelModal />

    </div>
  );
}
export default User;
