import React, { Fragment, useEffect, useState } from "react";

import EditTodo from "./EditTodo";


import { Link, withRouter } from "react-router-dom";

// redux
import { connect } from "react-redux";
import { getAllTasks, deleteTask } from "../redux/index";


// loading skeletons
import Skeleton from "react-loading-skeleton";

const ListTodos = ( props ) => {


  useEffect(() => {
    props.getAllTasks();
    console.log("reached here useeffect");

  }, []);

 

  const handleDelete = async (taskId) => {
    console.log("reached task delete");
    props.deleteTask(taskId);

  };

  const contentToRender = () => {
    if (props.tasks.loading) {
      return (
        <Fragment>
          <div style={{ maxWidth: 600}}>
            <Skeleton count={4} height={60} />
          </div>

        </Fragment>
      );
    } else if (props.tasks.error) {
      return (
        <Fragment>
          <p>error. Please try again later.</p>
           <h2>{props.tasks.error}</h2>
          
        </Fragment>
      );
    } else {
      return (
        <Fragment>
      <h2>Your Todos</h2>
      <table className="table table-striped text-center">
        <thead>
          <tr>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {console.log(props.tasks.data)}
          {props.tasks.data.map((task, index) => {
            return (
              <tr key={task.task_id}>
                <th>{task.task_description}</th>
                <th>{<EditTodo taskId={task.task_id}/>}</th>
                <th>
                  <button
                    className="btn btn-danger"
                     onClick={() => handleDelete(task.task_id)}
                  >
                    Delete
                  </button>
                </th>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Fragment>
      );
    }
  };

  return (
    <Fragment>
    {contentToRender()}
    </Fragment>
  );
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
