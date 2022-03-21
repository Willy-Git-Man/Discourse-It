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
      <ul className="userHeaderUl">
        <li>
          <strong>User Id</strong> {userId}
        </li>
        <li>
          <strong>Username</strong> {user.username}
        </li>
        <li>
          <strong>Email</strong> {user.email}
        </li>

      </ul>
      <NavLink to={`/home`}>Home</NavLink>
    </div>
  );
}
export default User;
