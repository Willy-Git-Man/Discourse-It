import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import "./homePage.css";
import SearchBar from "./SearchBar/SearchBar";
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

  const handlePicture = (e) => {
    e.target.src= "https://cdn.pixabay.com/photo/2020/07/19/20/48/broken-5421234_1280.png"
  }
  const userComponents = users.map((user) => {
    if (user.id !== sessionUser.id)
      return (
        <li className="eachUserLi" key={user.id}>
          <img
            className="userListPicture"
            src={user.profile_picture}
            alt="Broken Img URL"
            onError={handlePicture}
          />
          <NavLink className="userListLink" activeClassName='activeUserListLink'to={`/users/${user.id}`}>
            {user.username}
          </NavLink>
        </li>
      );
      else return null
  });


  return (
    <div className="sideBarUsers">

          <h1 className="emptyChannelsMessage">Users</h1>

      <ul className="homePageUserList">
        <li className="eachUserLi" key={sessionUser.id}>
          <img
            className="userListPicture"
            src={sessionUser.profile_picture}
            alt="Broken Img URL"
            onError={handlePicture}
          />
          <NavLink className="userListLink" activeClassName='activeUserNavTag' to={`/users/${sessionUser.id}`}>
            {sessionUser.username}
          </NavLink>
        </li>

        {userComponents}
      </ul>
    </div>
  );
}

export default UsersList;
