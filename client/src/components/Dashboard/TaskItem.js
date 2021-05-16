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
  EuiToolTip,
} from "@elastic/eui";

import styled from "styled-components";

// redux
import { connect } from "react-redux";
import { deleteTask, updateTaskStatus } from "../../redux/index";


// import useToggle from "./hook";

const StyledEuiPanel = styled(EuiPanel)`
  &:hover {
    background-color: #f7f7f7;
  }
`;

const TaskContainer = styled.div`
  background-color: ${(props) => (props.completed ? "#dedede" : "#ffffff")};
  padding: 1rem;
  margin: 1rem 0rem;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 6px;
  opacity: ${(props) => (props.completed ? "00.5" : "1")};
  &:hover {
    background: ${(props) => (props.completed ? "#dedede" : "#ffffff")};
    box-shadow: ${(props) =>
      props.completed ? "" : "0px 2px 4px rgba(0, 0, 0, 0.2)"};
  }
`;

// const handleDelete = async (taskId) => {
//     console.log("reached task delete");
//     await props.deleteTask(taskId);
//     console.log("task deleted");
//   };




function TaskItem(props) {


  //  const [isToggled, toggle] = useToggle(false);
   const [isToggled, setToggle] = useState(props.task.task_is_completed);

   useEffect (() => {
     
       props.updateTaskStatus(props.task.task_id, isToggled);
     
   }, [isToggled]);

 
  
  console.log(isToggled)


  // useEffect (() => {
  //   toggle(props.task.task_is_completed)
  // }, [props.task.task_is_completed]);

  
  const handleDelete = async (e) => {
    e.stopPropagation(); // stops propagation of the event to the parent container (clickable task)
    await props.deleteTask(props.task.task_id);
    console.log("task deleted");
  };

  
  
  
  const handleMarkComplete = async (e) => {
    e.stopPropagation(); // stops propagation of the event to the parent container (clickable task)
    console.log(isToggled);
    if(isToggled) {
      setToggle(false)
    } else {
      setToggle(true)
    }
     
    console.log(isToggled);
    console.log("toggle status: ", isToggled)

    
 // await props.updateTaskStatus(props.task.task_id);
    console.log("task marked completed");
  };


  const handleOnTaskClick = () => {
    props.history.push(`/task/${props.task.task_id}`);
  };

  return (
    <>
      <div onClick={() => handleOnTaskClick()} style={{ cursor: "pointer" }}>
        <TaskContainer paddingSize="s" completed={isToggled}>
          <EuiFlexGroup
            gutterSize="s"
            justifyContent="spaceBetween"
            wrap={true}
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
              <EuiToolTip position="right" content={isToggled ? "Mark status todo" : "Mark status complete"}>
          
        
                <EuiButton size="s" color="secondary" onClick={handleMarkComplete} iconType= {isToggled ? "checkInCircleFilled" : "empty"}>
                  {isToggled ? "Done" : "Todo"}
                </EuiButton>
                </EuiToolTip>
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
