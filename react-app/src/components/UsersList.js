import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import "./homePage.css";
// import { getAllChannelsThunk, getAllChannelsThunkTotal } from '../store/channels';

function UsersList() {
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);

  const sessionUser = useSelector((state) => state.session.user);

  useEffect(() => {
    // dispatch(getAllChannelsThunk())
    async function fetchData() {
      const response = await fetch("/api/users/");
      const responseData = await response.json();
      setUsers(responseData.users);
    }
    fetchData();
  }, [dispatch]);

  const userComponents = users.map((user) => {
    if (user.id !== sessionUser.id)
      return (
        <li className="eachUserLi" key={user.id}>
          <img
            className="userListPicture"
            src={user.profile_picture}
            alt="Broken Img URL"
          />
          <NavLink className="userListLink" to={`/users/${user.id}`}>
            {user.username}
          </NavLink>
        </li>
      );
      else return null
  });

  return (
    <div className="sideBarUsers">
      <ul className="homePageUserList">
        <li className="eachUserLi" key={sessionUser.id}>
          <img
            className="userListPicture"
            src={sessionUser.profile_picture}
            alt="Broken Img URL"
          />
          <NavLink className="sessionUserListLink" to={`/users/${sessionUser.id}`}>
            {sessionUser.username}
          </NavLink>
        </li>

        {userComponents}
      </ul>
    </div>
  );
}

export default UsersList;
