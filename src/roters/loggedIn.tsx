import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { Header } from "../components/header";
import { useMe } from "../hooks/useMe";
import { Podcast } from "../pages/podcast";
import { Podcasts } from "../pages/podcasts";

export const LoggedInRouter = () => {
  return (
    <>
      <Router>
        <Header />
        <Switch>
          <Route path="/" exact>
            <Podcasts />
          </Route>
          <Route path="/podcast/:id" exact>
            <Podcast />
          </Route>
          <Redirect to="/" />
        </Switch>
      </Router>
    </>
  );
};
