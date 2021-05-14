import React, { Fragment, useEffect } from "react";
import "./App.css";

// Router
import { BrowserRouter, Route, Switch } from "react-router-dom";

//components

import ProtectedRoute from "./components/protectedRoute";
import { Nav } from "./components/Navbar";
import { Home } from "./components/Home";
import { Login } from "./components/Login";
import { Register } from "./components/Registration";
import { Dashboard } from "./components/Dashboard";
import TestComponent from "./components/TestComponent";
import { Task } from "./components/Task/index";

// redux
import { connect } from "react-redux";
import { verifyUserLogin } from "./redux/index";
import { ErrorBoundary } from "react-error-boundary";
import { Fallback } from "./components/_global_components";

function App(props) {
  useEffect(() => {
    props.checkAuthStatus(); // checking authentication status of user on each reload
    console.log("reached here");
  }, []);

  const errorHandler = (err, errInfo) => {
    console.error("Logging ", err, errInfo);
  };

  return (
    <BrowserRouter>
      <ErrorBoundary FallbackComponent={Fallback} onError={errorHandler}>
        <Switch>
          <Route path="/login" component={Login} exact />
          <Route path="/register" component={Register} exact />

          <div>
            <Nav />
            <Route path="/" component={Home} exact />
            <ProtectedRoute path="/dashboard" component={Dashboard} exact />
            <ProtectedRoute path="/task/:id" component={Task} exact />
            <ProtectedRoute path="/test" component={TestComponent} exact />
          </div>

          <Route path="*" component={() => "404 NOT FOUND"} />

        </Switch>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

// REDUX //

// mapping store state to props
const mapStateToProps = (state) => {
  return {
    authData: state.auth,
  };
};
// mapping action creators to props
const mapDispatchToProps = (dispatch) => {
  return {
    checkAuthStatus: () => dispatch(verifyUserLogin()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
