import React, { Fragment, useEffect, useState } from "react";

import EditTodo from "./EditTodo";

import {tasksApi} from "../api/tasks-api";

// redux
import { connect } from "react-redux";
import { getAllTasks } from "../redux/index";


// loading skeletons
import Skeleton from "react-loading-skeleton";
import SampleComponent from "./SampleComponent";

const TestComponent = ( props ) => {


  const data = {
    name: 'John',
  };







  return (
    <Fragment>
        <h1>Test Component within protected route</h1>
        <SampleComponent person={data}/>
        {/* <SampleComponent person={{}}/> */}
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
