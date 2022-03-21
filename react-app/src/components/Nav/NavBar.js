
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutProfile from './LogoutProfile';

const NavBar = () => {
  return (
    <nav>
      {/* <ul>


        <li>
          <NavLink to='/users' exact={true} activeClassName='active'>
            Users
          </NavLink>
        </li>

      </ul> */}
      <LogoutProfile />
    </nav>
  );
}

export default NavBar;
