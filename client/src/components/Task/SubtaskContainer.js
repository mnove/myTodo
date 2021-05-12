import React, { Fragment, useEffect, useState } from "react";

import { Link, withRouter } from "react-router-dom";
// import {tasksApi} from "../api/tasks-api";

import {
  EuiPanel,
  EuiCode,
  EuiSpacer,
  EuiFlexGroup,
  EuiFlexItem,
  EuiText,
  EuiButton,
  EuiButtonIcon,
} from "@elastic/eui";

import styled from "styled-components";

import {Subtask} from "./"
import {SubtaskAddOne} from "./";

// redux
import { connect } from "react-redux";
import { getAllSubtasksByTaskId } from "../../redux/index";

// loading skeletons
import Skeleton from "react-loading-skeleton";



const SubtaskContainer = (props) => {
  const taskId = props.match.params.id;
  useEffect(() => {
    props.getAllSubtasksByTaskId(taskId);
  }, []);

  return (
    <>
    <>
    <SubtaskAddOne taskId={taskId}/>
    </>
      <Fragment>
        {props.subtasks.map((subtask, index) => {
          return (
            <Fragment key={index}>
              <Subtask subtask={subtask}/>
            </Fragment>
          );
        })}
      </Fragment>
    </>
  );
};

// REDUX //

//mapping store state to props
const mapStateToProps = (state) => {
  return {
    subtasks: state.subtask.data,
  };
};
// mapping action creators to props
const mapDispatchToProps = (dispatch) => {
  return {
    getAllSubtasksByTaskId: (taskId) =>
      dispatch(getAllSubtasksByTaskId(taskId)),
  };
};

// connect react components to Redux store and withRouter
 export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SubtaskContainer)
);
