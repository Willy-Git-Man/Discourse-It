import React, { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
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
        <img className="channelPicture" src={user.profile_picture} alt="Broken Img URL"/>
     <h1>{user.username}</h1>
    </div>
  );
}
export default User;
