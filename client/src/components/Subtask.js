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

// redux
import { connect } from "react-redux";
import { getAllSubtasksByTaskId } from "../redux/index";

// loading skeletons
import Skeleton from "react-loading-skeleton";

const SubTaskContainer = styled.div`
  background-color: ${(props) => (props.completed ? "grey" : "#ffffff")};
  padding: 1rem;
  margin: 1rem 0rem;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 6px;
  &:hover {
    background: ${(props) => (props.completed ? "grey" : "#ffffff")};
    box-shadow: ${(props) =>
      props.completed ? "" : "0px 2px 4px rgba(0, 0, 0, 0.2)"};
  }
`;

const SubtaskDescriptionText = styled(EuiText)`
  text-decoration: ${(props) => (props.completed ? "line-through" : "none")};

  h5 {
    color: ${(props) => (props.completed ? "black" : "black")};
  }
`;

const Subtask = (props) => {
  const taskId = props.match.params.id;
  useEffect(() => {
    props.getAllSubtasksByTaskId(taskId);
  }, []);

  return (
    <>
      <Fragment>
        {props.subtasks.map((subtask, index) => {
          return (
            <Fragment key={index}>
              <SubTaskContainer completed={true}>
                <EuiFlexGroup
                  gutterSize="s"
                  justifyContent="spaceBetween"
                  wrap="true"
                >
                  <EuiFlexItem grow={6}>
                    <SubtaskDescriptionText completed={true}>
                      <h5>{subtask.subtask_description}</h5>
                    </SubtaskDescriptionText>
                  </EuiFlexItem>
                  <EuiFlexItem grow={3}>
                    <div>
                      <EuiButtonIcon
                        display="base"
                        size="s"
                        iconType="trash"
                        color="danger"
                        aria-label="More"
                        // onClick={handleClickButton}
                      />
                    </div>
                  </EuiFlexItem>
                  <EuiFlexItem grow={3}>
                    <div>
                      <p>
                        {" "}
                        Status:{" "}
                        {subtask.subtask_is_completed ? (
                          <span>COMPLETED</span>
                        ) : (
                          <span>TO DO</span>
                        )}
                      </p>
                      <label for="markcompleted"> mark Completed</label>
                      <input
                        type="checkbox"
                        id="markcompleted"
                        name="markcompleted"
                        value="completed"
                      />
                    </div>
                  </EuiFlexItem>
                </EuiFlexGroup>
              </SubTaskContainer>
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
  connect(mapStateToProps, mapDispatchToProps)(Subtask)
);
