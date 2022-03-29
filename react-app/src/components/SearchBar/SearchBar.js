import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import "./index.css";

const SearchBar = () => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(getAllChannelsThunk())
    async function fetchData() {
      const response = await fetch("/api/users/");
      const responseData = await response.json();
      setUsers(responseData.users);
    }
    fetchData();
  }, [dispatch]);

  console.log(users);

  return (
    <div className="searchBarMainDiv">
      {/* <h1>Hello</h1> */}
      <div>
        <input
          className="searchInput"
          id=""
          type="text"
          placeholder="Search..."
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
      </div>
      <div className="searchDivWithResults">
        {users
          .filter((ele) => {
            if (search === "") {
              return ele;
            } else if (
              ele.username.toLowerCase().includes(search.toLowerCase())
            ) {
              return ele;
            }
          })
          .map((el) => (

            <div className="searchDivEachResult">
              <NavLink to={`/users/${el.id}`}>{el.username}</NavLink>
            </div>
          ))}
      </div>
    </div>
  );
};
export default SearchBar;
