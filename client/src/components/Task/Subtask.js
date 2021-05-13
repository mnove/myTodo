import React, { Fragment, useEffect, useState } from "react";

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
import { deleteSubtask, updateSubtaskStatus } from "../../redux/index";

const SubTaskContainer = styled.div`
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

const SubtaskDescriptionText = styled(EuiText)`
  text-decoration: ${(props) => (props.completed ? "line-through" : "none")};

  h5 {
    color: ${(props) => (props.completed ? "black" : "black")};
  }
`;

function Subtask({ subtask, updateSubtaskStatus, deleteSubtask }) {
  const [isCompletedChecked, setIsCompletedChecked] = useState(
    subtask.subtask_is_completed
  );

  const handleOnChangeIsComplete = async (e) => {
    let isCompleted;

    if (e.target.checked === true) {
      isCompleted = true;
      await updateSubtaskStatus(subtask.subtask_id, isCompleted);
    } else {
      isCompleted = false;
      await updateSubtaskStatus(subtask.subtask_id, isCompleted);
    }
  };

  const handleDeleteSubtask = async () => {
    await deleteSubtask(subtask.subtask_id);
    console.log("subtask deleted");
  };

  return (
    <>
      <SubTaskContainer completed={subtask.subtask_is_completed}>
        <EuiFlexGroup gutterSize="s" justifyContent="spaceBetween" wrap="true">
          <EuiFlexItem grow={6}>
            <SubtaskDescriptionText completed={subtask.subtask_is_completed}>
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
                onClick={handleDeleteSubtask}
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
                checked={subtask.subtask_is_completed}
                onChange={(e) => {
                  handleOnChangeIsComplete(e);
                }}
              />
            </div>
          </EuiFlexItem>
        </EuiFlexGroup>
      </SubTaskContainer>
    </>
  );
}

// REDUX //

// mapping action creators to props
const mapDispatchToProps = (dispatch) => {
  return {
    updateSubtaskStatus: (taskId, newDescription) =>
      dispatch(updateSubtaskStatus(taskId, newDescription)),
    deleteSubtask: (subtaskId) => dispatch(deleteSubtask(subtaskId)),
  };
};

// connect react components to Redux store
 export default connect(null, mapDispatchToProps)(Subtask);
