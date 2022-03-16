import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";

import LoginFormModal from "./components/auth/LoginModal/index";
import SignupModal from "./components/auth/SignupModal/index"

import LogoutButton from "../src/components/auth/LogoutButton";

import NavBar from "./components/Nav/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import { authenticate } from "./store/session";
import UserChannels from "./components/Channels/userChannels";
import PostChannelForm from "./components/Channels/postChannel";

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <Switch>


        <Route path="/" exact={true}>
          <LoginFormModal />
          <h1>gap</h1>
          <SignupModal />
        </Route>



        <ProtectedRoute path="/home" exact={true}>
          <NavBar />
          <LogoutButton />
          <h1>My Home Page</h1>
        </ProtectedRoute>

        <ProtectedRoute path="/users" exact={true}>
          <UsersList />
        </ProtectedRoute>


        <ProtectedRoute path="/users/:userId" exact={true}>
          <User />
          <UserChannels />
          <PostChannelForm />
        </ProtectedRoute>

      </Switch>
    </BrowserRouter>
  );
}

export default App;
