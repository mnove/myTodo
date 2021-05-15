import React, { Fragment, useEffect, useState } from "react";
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
import { deleteTask, updateTaskStatus } from "../../redux/index";

const StyledEuiPanel = styled(EuiPanel)`
  &:hover {
    background-color: #f7f7f7;
  }
`;

const TaskContainer = styled.div`
  padding: 1rem;
  margin: 1rem 0rem;
  background: #ffffff;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 6px;
  &:hover {
    background: #ffffff;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
  }
`;

// const handleDelete = async (taskId) => {
//     console.log("reached task delete");
//     await props.deleteTask(taskId);
//     console.log("task deleted");
//   };

const useToggle = (initialState) => {
  const [isToggled, setIsToggled] = React.useState(initialState);

  // put [setIsToggled] into the useCallback's dependencies array
  // this value never changes so the callback is not going to be ever re-created
  const toggle = React.useCallback(
    () => setIsToggled(state => !state),
    [setIsToggled],
  );

  return [isToggled, toggle];
}


function TaskItem(props) {

    const [isToggled, toggle] = useToggle(false);
  
  console.log(props.task.task_is_completed)


  // useEffect (() => {
  //   setToggleOn(props.task.task_is_completed)
  // }, [props.task.task_is_completed]);

  
  const handleDelete = async (e) => {
    e.stopPropagation(); // stops propagation of the event to the parent container (clickable task)
    await props.deleteTask(props.task.task_id);
    console.log("task deleted");
  };

  

  const handleMarkComplete = async (e) => {
    e.stopPropagation(); // stops propagation of the event to the parent container (clickable task)
    

    toggle();
    console.log(isToggled);
    
    
    
    
  
    
    

    await props.updateTaskStatus(props.task.task_id, isToggled);


    // if (e.target.checked === true) {
    //   isCompleted = true;
    //   await updateSubtaskStatus(subtask.subtask_id, isCompleted);
    // } else {
    //   isCompleted = false;
    //   await updateSubtaskStatus(subtask.subtask_id, isCompleted);
    // }

    // await props.updateTaskStatus(props.task.task_id);
    console.log("task marked completed");
  };


  const handleOnTaskClick = () => {
    props.history.push(`/task/${props.task.task_id}`);
  };

  return (
    <>
      <div onClick={() => handleOnTaskClick()} style={{ cursor: "pointer" }}>
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
                  onClick={handleDelete}
                />
              </div>
            </EuiFlexItem>

            <EuiFlexItem grow={3}>
              <div>
                <EuiButton size="s" color="success" onClick={handleMarkComplete} iconType="checkInCircleFilled">
                  {isToggled ? "Todo" : "Done"}
                </EuiButton>
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
const mapStateToProps = (state) => {
    return {
      tasks: state.tasks,
    };
  };

const mapDispatchToProps = (dispatch) => {
  return {
    deleteTask: (taskId) => dispatch(deleteTask(taskId)),
    updateTaskStatus: (taskId, newStatus) =>
      dispatch(updateTaskStatus(taskId, newStatus)),
  };
};

// connect react components to Redux store
export default withRouter(connect(null, mapDispatchToProps)(TaskItem));
