import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import * as sessionActions from "../../store/session";
import LogoutButton from "../auth/LogoutButton";

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


  const handlePicture = (e) => {
    e.target.src= "https://cdn.pixabay.com/photo/2020/07/19/20/48/broken-5421234_1280.png"
  }

  return (
    <>
      <button className="profileButton" onClick={openMenu}>
        {/* <i className="fas fa-user-circle" /> */}
        <img className="profileButtonPicture" src={sessionUser.profile_picture} alt="Broken Img URL" onError={handlePicture}/>
      </button>
      <div className={"dropDownMenu"}>
        {showMenu && (
          <ul className="profileDropdown">
            <li className="userName">{sessionUser.username}</li>
            <li className="email">{sessionUser.email}</li>

            <li className="profileDropdownPictureLi">
              <img className="profileDropdownPicture" src={sessionUser.profile_picture} alt="Falty Img Url" />
            </li>



           <LogoutButton />
          </ul>
        )}
      </div>
    </>
  );
}

export default LogoutProfile;
