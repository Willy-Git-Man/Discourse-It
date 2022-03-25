import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { login } from "../../../store/session";
import "./index.css";

import SignupModal from "../SignupModal/index";
import Footer from "../../Footer/footer";

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to={`/users/${user.id}`} />;
  }

  if (!user) {
    return (
      <form className="loginForm" onSubmit={onLogin}>
        <h2 className="loginFormMessage">Login to Discourse-It!</h2>
        {/* <Footer /> */}
        {/* <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div> */}
        <div className="loginFormEmailPasswordDiv">
          <div className="formLabelInputDiv">
            <label className="loginFormLabel" htmlFor="email">Email</label>
            <input className="loginFormInput"
              name="email"
              type="text"
              placeholder="Email"
              value={email}
              onChange={updateEmail}
            />
          </div>
          <div className="formLabelInputDiv">
            <label className="loginFormLabel" htmlFor="password">Password</label>
            <input className="loginFormInput"
              name="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={updatePassword}
            />
          </div>
            <button className="loginButton" type="submit">
              Login
            </button>
        </div>

        <button
          className="demoButton"
          type="submit"
          onClick={() => {
            setEmail("demo@aa.io");
            setPassword("password");
          }}
        >
          Demo
        </button>

        {errors.length > 0 && (
          <ul className="errors">
            {errors.map((error) => (
              <li className="errorLi" key={error}>
                {error}
              </li>
            ))}
          </ul>
        )}
        {/* <SignupModal /> */}
      </form>
    );
  }
};

export default LoginForm;
