import React, { Fragment, useEffect, useState } from "react";

import EditTodo from "./EditTodo";
import ExampleTable from "./ExampleTable";
import TaskItem from "./TaskItem";

import { Link, withRouter } from "react-router-dom";


// redux
import { connect } from "react-redux";
import { getAllTasks, deleteTask } from "../redux/index";

// loading skeletons
import Skeleton from "react-loading-skeleton";

const ListTodos = (props) => {
  useEffect(() => {
    props.getAllTasks();
    console.log("reached here useeffect");
  }, []);



  const contentToRender = () => {
    if (props.tasks.loading) {
      return (
        <>
          <div style={{ maxWidth: 600 }}>
            <Skeleton count={4} height={60} />
          </div>
        </>
      );
    } else if (props.tasks.error) {
      return (
        <>
          <p>error. Please try again later.</p>
          <h2>{props.tasks.error}</h2>
        </>
      );
    } else {
      return (
        <>
          {props.tasks.data.map((task, index) => {
            return (
              <Fragment key={index}>
                <TaskItem
                  task={task}
                  style={{ marginTop: 5, marginBottom: 10 }}
                />
              </Fragment>
            );
          })}
        </>
      );
    }
  };

  return <Fragment>

  {contentToRender()}

  </Fragment>;
};

// REDUX //

// mapping store state to props
const mapStateToProps = (state) => {
  return {
    tasks: state.tasks,
  };
};
// mapping action creators to props
const mapDispatchToProps = (dispatch) => {
  return {
    getAllTasks: () => dispatch(getAllTasks()),
    deleteTask: (taskId) => dispatch(deleteTask(taskId)),
  };
};

// connect react components to Redux store
export default connect(mapStateToProps, mapDispatchToProps)(ListTodos);
