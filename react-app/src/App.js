import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import LoginForm from "./components/auth/LoginModal/LoginForm";

import LoginFormModal from "./components/auth/LoginModal/LoginForm";

import LogoutButton from "../src/components/auth/LogoutButton";

import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/Nav/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import { authenticate } from "./store/session";

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
          {/* <LoginForm /> */}
          <LoginFormModal />
          <h1>gap</h1>
          <SignUpForm />
        </Route>



        <ProtectedRoute path="/home" exact={true}>
          <NavBar />
          <h1>My Home Page</h1>
          <LogoutButton />
        </ProtectedRoute>

        <ProtectedRoute path="/users" exact={true}>
          <UsersList />
        </ProtectedRoute>


        <ProtectedRoute path="/users/:userId" exact={true}>
          <User />
        </ProtectedRoute>

      </Switch>
    </BrowserRouter>
  );
}

export default App;
