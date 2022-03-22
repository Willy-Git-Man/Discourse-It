import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../../store/session';

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

    if (username.length === 0) validationErrors.push("Post Title field is required")
    if (email.length === 0) validationErrors.push("Post Title field is required")

    if (profilePicture.length === 0) validationErrors.push("Profile Picture field is required")
    if (username.length > 50) validationErrors.push('Username must be less than 50 characters')
    if (email.length > 75) validationErrors.push('Email must be less than 50 characters')

    if (profilePicture.length > 750) validationErrors.push('Picture name must be less than 750 characters')

    setErrors(validationErrors)
  }, [username, profilePicture, setEmail])

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
    <form onSubmit={onSignUp}>
       <ul className="errors">
        {errors.map((error) => (
          <li key={error}>{error}</li>
        ))}
      </ul>
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div>
        <label>User Name</label>
        <input
          type='text'
          name='username'
          onChange={updateUsername}
          value={username}
        ></input>
      </div>
      <div>
        <label>Email</label>
        <input
          type='text'
          name='email'
          onChange={updateEmail}
          value={email}
        ></input>
      </div>
      <div>
        <label>Password</label>
        <input
          type='password'
          name='password'
          onChange={updatePassword}
          value={password}
        ></input>
      </div>
      <div>
        <label>Repeat Password</label>
        <input
          type='password'
          name='repeat_password'
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required={true}
        ></input>
      </div>
      <div>
        <label>Profile Picture</label>
        <input
          type='text'
          name='profile_picture'
          onChange={updateProfilePic}
          value={profilePicture}
          required={true}
        ></input>
      </div>
      <button type='submit'>Sign Up</button>
    </form>
  );
};

export default SignUpForm;
