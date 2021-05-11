import React, { Fragment, useEffect } from "react";
import { withRouter } from "react-router-dom";

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
import { deleteTask } from "../redux/index";

const StyledEuiPanel = styled(EuiPanel)`
  &:hover {
    background-color: #f7f7f7;
  }
`;

const TaskContainer = styled.div`

  padding: 1rem;
  margin: 1rem 0rem;
  background: #FFFFFF;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 6px;
  &:hover {
    background: #FFFFFF;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.20);
  }
`;

// const handleDelete = async (taskId) => {
//     console.log("reached task delete");
//     await props.deleteTask(taskId);
//     console.log("task deleted");
//   };


function TaskItem( props ) {

    
  const handleClickButton = async (e) => {
    e.stopPropagation(); // notice this
    console.log("button inside panel click");
    console.log("reached task delete");
    await props.deleteTask(props.task.task_id);
    console.log("task deleted");
  };
  
  console.log("Task data", props.task)
  const handleOnTaskClick = () => {
   props.history.push(`/task/${props.task.task_id}`);
  }

  return (
    <>
      <div
        onClick={() => handleOnTaskClick()}
        style={{ cursor: "pointer" }}
      >
        <TaskContainer paddingSize="s">
          <EuiFlexGroup
            gutterSize="s"
            justifyContent="spaceBetween"
            wrap="true"
          >
            <EuiFlexItem grow={6}>
              <EuiText>
                <h5>{props.task.task_description}</h5>
              </EuiText>
            </EuiFlexItem>
            <EuiFlexItem grow={3}>
              <div>
                <EuiButtonIcon
                  display="base"
                  size="s"
                  iconType="trash"
                  color="danger"
                  aria-label="More"
                  onClick={handleClickButton}
                />
              </div>
            </EuiFlexItem>
          </EuiFlexGroup>
        </TaskContainer>
      </div>
    </>
  );
}


// REDUX //

// // mapping store state to props
// const mapStateToProps = (state) => {
//     return {
//       tasks: state.tasks,
//     };
//   };
  // mapping action creators to props
  const mapDispatchToProps = (dispatch) => {
    return {
      deleteTask: (taskId) => dispatch(deleteTask(taskId))
    };
  };
  
  // connect react components to Redux store
  export default withRouter(connect(null, mapDispatchToProps)(TaskItem));