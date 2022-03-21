import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import './homePage.css'
// import { getAllChannelsThunk, getAllChannelsThunkTotal } from '../store/channels';

function UsersList() {
  const dispatch = useDispatch()
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // dispatch(getAllChannelsThunk())
    async function fetchData() {
      const response = await fetch('/api/users/');
      const responseData = await response.json();
      setUsers(responseData.users);
    }
    fetchData();
  }, [dispatch]);

  const userComponents = users.map((user) => {
    return (
      <li className="eachUserLi" key={user.id}>
        <img className="userListPicture" src={user.profile_picture} alt="Broken Img URL"/>
        NavLink:<NavLink className="" to={`/users/${user.id}`}>{user.username}</NavLink>

        A-Tag :<a href={`/users/${user.id}`}>{user.username}</a>


      </li>
    );
  });

  return (
    <div className="sideBarUsers">
      <ul className="homePageUserList">{userComponents}</ul>
    </div>
  );
}

export default UsersList;
