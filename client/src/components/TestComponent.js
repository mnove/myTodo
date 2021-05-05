import React, { Fragment, useEffect, useState } from "react";

import EditTodo from "./EditTodo";

import {tasksApi} from "../api/tasks-api";

// redux
import { connect } from "react-redux";
import { getAllTasks } from "../redux/index";


// loading skeletons
import Skeleton from "react-loading-skeleton";

const TestComponent = ( props ) => {


  



  return (
    <Fragment>
        <h1>Test Component within protected route</h1>
    </Fragment>
  );
};


// REDUX //

// mapping store state to props
const mapStateToProps = (state) => {
  return {
    tasks: state,
  };
};
// mapping action creators to props
const mapDispatchToProps = (dispatch) => {
  return {
    getAllTasks: () => dispatch(getAllTasks()),
  };
};

// connect react components to Redux store
export default connect(mapStateToProps, mapDispatchToProps)(TestComponent);
