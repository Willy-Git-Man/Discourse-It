import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import "./index.css";

const SearchBar = () => {
  const [searchValue, setSearchValue] = useState("");
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/users/");
      const responseData = await response.json();
      setUsers(responseData.users);
    }
    fetchData();
  }, [dispatch]);

  const handlePicture = (e) => {
    e.target.src =
      "https://cdn.pixabay.com/photo/2020/07/19/20/48/broken-5421234_1280.png";
  };

  return (
    <div className="searchBarMainDiv">
      <div>
        <input
          className="searchInput"
          placeholder="Search Users..."
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
        />
      </div>
      <div className="searchDivWithResults">
        {users
          .filter((user) => {
            if (searchValue === "") return null;
            else if (user.username.toLowerCase().includes(searchValue.toLowerCase()))
              return user;
          })
          .map((user) => (
            <div className="searchDivEachResult">
              <div className="eachSearchResultUserDiv">
                <img
                  className="userListPicture"
                  src={user.profile_picture}
                  alt="Broken Img URL"
                  onError={handlePicture}
                />
                <NavLink className="searchBarNavLink" to={`/users/${user.id}`}>
                  {user.username}
                </NavLink>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
export default SearchBar;
