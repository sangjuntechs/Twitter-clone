import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Navigation from "./Navigation";
import Profile from "routes/Profile";

const AppRouter = ({isLoggedIn, userObjs}) => {
  return (
    <Router>
      {isLoggedIn && <Navigation userObjs={userObjs}/>}
      <Switch>
        {isLoggedIn ? (
          <>
            <Route exact path='/'>
              <Home userObjs={userObjs}/>
            </Route>
            <Route exact path='/profile'>
              <Profile userObjs={userObjs}/>
            </Route>
          </>
        ) : (
          <Route exact path='/'>
            <Auth />
          </Route>
        )}
      </Switch>
    </Router>
  );
};

export default AppRouter;