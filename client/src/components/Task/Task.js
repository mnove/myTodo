import React, { Fragment, useEffect, useState } from "react";

import { Link, withRouter } from "react-router-dom";

import {SubtaskContainer} from "./";

import {
  EuiPanel,
  EuiCode,
  EuiSpacer,
  EuiFlexGroup,
  EuiFlexItem,
  EuiButton,
  EuiText,
} from "@elastic/eui";


import {PageContainer} from "../_global_components/PageContainer";


import styled from "styled-components";

// redux
import { connect } from "react-redux";
import { getAllTasks, updateTask } from "../../redux/index";

// loading skeletons
import Skeleton from "react-loading-skeleton";

const TaskHeader = styled(EuiPanel)``;

const TaskDate = styled(EuiText)`
  background-color: #e6e6e6;
  border-radius: 6px;
  padding: 0.4rem;
`;

const Task = (props) => {
  const [description, setDescription] = useState(
    props.tasks[0].task_description
  );
  const taskId = props.match.params.id;

  const handleOnChange = (e) => {
    setDescription(e.target.value);
  };
  const handleSave = () => {
    console.log("reached here ", description, "   ", taskId);
    console.log("dddddd");
    console.log(taskId);
    props.updateTask(description, taskId);
  };

  const taskData = props.tasks[0];

  // converting the dates to JS date
  let dateCreated = new Date(taskData.created_at);
  dateCreated = dateCreated.toString();
  let dateUpdated = new Date(taskData.updated_at);
  dateUpdated = dateUpdated.toString();

  return (
    <>
      <PageContainer>
        <TaskHeader paddingSize="l">
          <EuiFlexGroup>
            <EuiFlexItem>
              <EuiText>
                <h4>Task Description</h4>
              </EuiText>
            </EuiFlexItem>
          </EuiFlexGroup>
          {""}
          <EuiFlexGroup>
            <EuiFlexItem>
              <EuiText>
                <input
                  value={description}
                  onChange={(e) => handleOnChange(e)}
                ></input>
              </EuiText>
            </EuiFlexItem>
            <EuiFlexItem>
              <div>
                <EuiButton fill onClick={handleSave}>
                  Save
                </EuiButton>
              </div>
            </EuiFlexItem>
          </EuiFlexGroup>
          {""}
          <EuiFlexGroup>
            <EuiFlexItem>
              <EuiText>
                <p>Task Created at:</p>
              </EuiText>
            </EuiFlexItem>
            <EuiFlexItem>
              <div>
                <EuiText>
                  <p>{dateCreated}</p>
                </EuiText>
              </div>
            </EuiFlexItem>
          </EuiFlexGroup>
        </TaskHeader>
        <SubtaskContainer/>
        </PageContainer>
  
    </>
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
    updateTask: (newDescription, taskId) =>
      dispatch(updateTask(newDescription, taskId)),
  };
};

// connect react components to Redux store and withRouter
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Task));
