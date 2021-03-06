import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../../store/session';
import './index.css'

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [profilePicture, setProfilePicture] = useState('');

  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const validationErrors = []

    if (username.length === 0) validationErrors.push("Username field is required")
    if (email.length === 0) validationErrors.push("Email field is required")
    if (!email.includes("@") || !email.includes(".")) validationErrors.push("Email must be an email")
    if (username.includes("@") || username.includes(".com")) validationErrors.push("Username must not be an email")



    if (profilePicture.length === 0) validationErrors.push("Profile Picture field is required")
    if (username.length > 20) validationErrors.push('Username must be less than 20 characters')
    if (email.length > 75) validationErrors.push('Email must be less than 50 characters')

    if (profilePicture.length > 750) validationErrors.push('Picture name must be less than 750 characters')
    if (!profilePicture.match(/\.(jpeg|jpg|gif|png)$/) || !profilePicture.includes("https://")) validationErrors.push('Picture must be a valid Picture Url')
    // if (password === !repeatPassword) validationErrors.push('Confirm Password field must be the same as the Password field')


    setErrors(validationErrors)
  }, [username, profilePicture, email, password, repeatPassword])

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password, profilePicture));
      if (data) {
        setErrors(data)
      }
    }
    else return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  const updateProfilePic = (e) => {
    setProfilePicture(e.target.value);
  };

  if (user) {
    return <Redirect to={`/users/${user.id}`} />;
  }



  return (
    <form className="signupForm" onSubmit={onSignUp}>
       {/* <ul className="errors">
        {errors.map((error) => (
          <li key={error}>{error}</li>
        ))}
      </ul>
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div> */}
      <div className="formLabelInputDiv">

        <label>User Name</label>
        <input
          type='text'
          name='username'
          onChange={updateUsername}
          value={username}
        ></input>
      </div>
      <div className="formLabelInputDiv">

        <label>Email</label>
        <input
          type='text'
          name='email'
          onChange={updateEmail}
          value={email}
        ></input>
      </div>
      <div className="formLabelInputDiv">

        <label>Password</label>
        <input
          type='password'
          name='password'
          onChange={updatePassword}
          value={password}
        ></input>
      </div>
      <div className="formLabelInputDiv">

        <label>Repeat Password</label>
        <input
          type='password'
          name='repeat_password'
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required={true}
        ></input>
      </div>
      <div className="formLabelInputDiv">

        <label>Profile Picture</label>
        <input
          type='text'
          name='profile_picture'
          onChange={updateProfilePic}
          value={profilePicture}
          required={true}
        ></input>
      </div>
      {errors.length > 0 && (

<ul className="errors">
      {errors.map((error) => (
        <li className="errorLi" key={error}>{error}</li>
        ))}
    </ul>
        )}
      <button className="signupButtonSubmit" type='submit' disabled={errors.length > 0}>Sign Up</button>
    </form>
  );
};

export default SignUpForm;
