import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import LoginFormModal from "./components/auth/LoginModal/index";
import SignupModal from "./components/auth/SignupModal/index";


import NavBar from "./components/Nav/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import { authenticate } from "./store/session";
import UserChannels from "./components/Channels/userChannels";
import Footer from "./components/Footer/footer";
import ChannelPosts from "./components/Posts/channelPosts";
import LogoutProfile from "./components/Nav/LogoutProfile";
import CreatePostModal from "./components/Posts/CreatePostModal";

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  const sessionUser = useSelector((state) => state.session.user)
  console.log(sessionUser, "sss")

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


      <Route path="/login" exact={true}>
          <LoginFormModal />
          <SignupModal />
          <Footer />
      </Route>


      <ProtectedRoute path="/users/:userId" exact={true}>
          <LogoutProfile />
          <UsersList />
          <UserChannels />
      </ProtectedRoute>


      <ProtectedRoute path="/users/:userId/:channelId" exact={true}>
          <LogoutProfile />
          <UsersList />
          <UserChannels />
          <ChannelPosts />
          <CreatePostModal />
      </ProtectedRoute>

      <Route>
          <div>
              <h1>This is not the droid.. err.. page you were looking for</h1>
          </div>
        <UsersList />
      </Route>

      </Switch>
    </BrowserRouter>
  );
}

export default App;
