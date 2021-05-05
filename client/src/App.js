import React, { Fragment, useEffect } from "react";
import "./App.css";

// Router
import { BrowserRouter, Route, Switch } from "react-router-dom";

//components
import InputTodo from "./components/InputTodo";
import ListTodos from "./components/ListTodo";
import ProtectedRoute from "./components/protectedRoute";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import TestComponent from "./components/TestComponent";
import Task from "./components/Task";

// redux
import { connect } from "react-redux";
import { verifyUserLogin } from "./redux/index";

function App(props) {
  useEffect(() => {
    props.checkAuthStatus(); // checking authentication status of user on each reload
    console.log("reached here");
  }, []);

  return (
    <BrowserRouter>
      <Nav />
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/login" component={Login} exact />
        <Route path="/register" component={Register} exact />
        <ProtectedRoute path="/dashboard" component={Dashboard} exact />
        <ProtectedRoute path="/task/:id" component={Task} exact />
        <ProtectedRoute path="/test" component={TestComponent} exact />

        <Route path="*" component={() => "404 NOT FOUND"} />
      </Switch>
      {/* <Fragment>
        <div className="container">
          <InputTodo></InputTodo>
          <ListTodos />
        </div>
      </Fragment> */}
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
