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
        <NavLink to={`/users/${user.id}`}>{user.username}</NavLink> navLink -------

        <a href={`/users/${user.id}`}>{user.username}</a> a tag


      </li>
    );
  });

  return (
    <div className="sideBarUsers">
    <NavLink to={`/home`}>Home</NavLink>
      <ul className="homePageUserList">User List:{userComponents}</ul>
    </div>
  );
}

export default UsersList;
