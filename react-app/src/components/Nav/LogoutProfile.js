import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import * as sessionActions from "../../store/session";

import './index.css'

function LogoutProfile({ user }) {
  const [showMenu, setShowMenu] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  const sessionUser = useSelector((state) => state.session.user);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    history.push("/");
  };

  return (
    <>
      <button className="profileButton" onClick={openMenu}>
        {/* <i className="fas fa-user-circle" /> */}
        G
      </button>
      <div className={"dropDownMenu"}>
        {showMenu && (
          <ul className="profileDropdown">
            <h1 className="userName">{sessionUser.username}</h1>
            <h1 className="email">{sessionUser.email}</h1>
            <li>
              <button className={"logoutButton"} onClick={logout}>
                Log Out
              </button>
            </li>
          </ul>
        )}
      </div>
    </>
  );
}

export default LogoutProfile;
