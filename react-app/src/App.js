import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch} from "react-redux";

import SignupModal from "./components/auth/SignupModal/index";

import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import { authenticate } from "./store/session";
import UserChannels from "./components/Channels/userChannels";
import ChannelPosts from "./components/Posts/channelPosts";
import LogoutProfile from "./components/Nav/LogoutProfile";
import CreatePostModal from "./components/Posts/CreatePostModal";

import SplashPage from "./components/Splash/SplashPage";

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
          <SplashPage />
          {/* <LoginFormModal /> */}
          <SignupModal />
          {/* <Footer /> */}
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
