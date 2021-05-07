import React, { Fragment, useEffect, useState } from "react";

import { Link, withRouter } from "react-router-dom";
// import {tasksApi} from "../api/tasks-api";

// redux
import { connect } from "react-redux";
import { getAllTasks, updateTask } from "../redux/index";

// loading skeletons
import Skeleton from "react-loading-skeleton";

const Task = (props) => {
  const [description, setDescription] = useState(
    props.tasks[0].task_description
  );
  const taskId = props.match.params.id;

  const handleOnChange = (e) => {
    setDescription(e.target.value);
  };
  const handleSave = () => {
      console.log("reached here ", description,'   ', taskId);
      console.log('dddddd');
      console.log(taskId);
    props.updateTask(description, taskId );
  };

  const taskData = props.tasks[0];

  // converting the dates to JS date
  let dateCreated = new Date(taskData.created_at);
  dateCreated = dateCreated.toString();
  let dateUpdated = new Date(taskData.updated_at);
  dateUpdated = dateUpdated.toString();

  return (
    <Fragment>
      <h1>Task Component</h1>
      <p>Task Id: {props.match.params.id}</p>
      <p>Task Description: {taskData.task_description}</p>
      <input value={description} onChange={(e) => handleOnChange(e)}></input>
      <button onClick={handleSave}>Save</button>
      <p>Task Created At: {dateCreated}</p>
      <p>Last Updated At: {dateUpdated}</p>
      <h3>Subtasks</h3>
      <p>subtasks...</p>
    </Fragment>
  );
};

// REDUX //

// mapping store state to props
const mapStateToProps = (state, ownProps) => {
  return {
    tasks: state.tasks.data.filter(
      (task) => task.task_id === ownProps.match.params.id
    ),
  };
};
// mapping action creators to props
const mapDispatchToProps = (dispatch) => {
  return {
    getAllTasks: () => dispatch(getAllTasks()),
    updateTask: (newDescription, taskId ) =>
      dispatch(updateTask(newDescription, taskId )),
  };
};

// connect react components to Redux store and withRouter
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Task));
