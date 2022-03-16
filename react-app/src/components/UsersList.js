import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getAllChannelsThunk } from '../store/channels';

function UsersList() {
  const dispatch = useDispatch()
  const [users, setUsers] = useState([]);

  useEffect(() => {
    dispatch(getAllChannelsThunk())
    async function fetchData() {
      const response = await fetch('/api/users/');
      const responseData = await response.json();
      setUsers(responseData.users);
    }
    fetchData();
  }, []);

  const userComponents = users.map((user) => {
    return (
      <li key={user.id}>
        <NavLink to={`/users/${user.id}`}>{user.username}</NavLink>
      </li>
    );
  });

  return (
    <>
    <NavLink to={`/home`}>Home</NavLink>
      <h1>User List: </h1>
      <ul>{userComponents}</ul>
    </>
  );
}

export default UsersList;
