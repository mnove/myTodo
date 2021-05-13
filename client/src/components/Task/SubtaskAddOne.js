import React, { Fragment, useState } from "react";

import {
  EuiPanel,
  EuiCode,
  EuiSpacer,
  EuiFlexGroup,
  EuiFlexItem,
  EuiText,
  EuiButton,
  EuiButtonIcon,
  EuiHorizontalRule,
  EuiPopover,
  EuiForm,
  EuiFormRow,
  EuiFieldText,
} from "@elastic/eui";

import styled from "styled-components";

// redux
import { connect } from "react-redux";
import { createNewSubtask } from "../../redux/index";

const SubtaskAddOneButtonContainer = styled.div`
  margin-top: 2rem;
  margin-bottom: 2rem;
  padding-top: 1rem;
  padding-bottom: 1rem;
  ${"" /* background-color: grey;
  border-radius: 20px; */}
`;

function SubtaskAddOne({ createNewSubtask, taskId }) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [newSubtaskTitle, setNewSubtaskTitle] = useState("");
  console.log(newSubtaskTitle);

  const onButtonClick = () => {
    setIsPopoverOpen(!isPopoverOpen);
  };

  const closePopover = () => {
    setIsPopoverOpen(false);
  };

  const handleSaveNewSubtask = () => {
    //TODO dispatch create new subtask via Redux
    createNewSubtask(taskId, newSubtaskTitle);
  };

  const button = (
    <EuiButton iconSide="right" fill iconType="plus" onClick={onButtonClick}>
      Add a subtask
    </EuiButton>
  );

  const formSample = (
    <EuiForm component="form">
      <EuiFlexGroup>
        <EuiFlexItem>
          <EuiFormRow label="New subtask">
            <EuiFieldText
              icon="plus"
              placeholder="Subtask name..."
              onChange={(e) => setNewSubtaskTitle(e.target.value)}
            />
          </EuiFormRow>
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <EuiFormRow hasEmptyLabelSpace>
            <EuiButton onClick={handleSaveNewSubtask}>Save</EuiButton>
          </EuiFormRow>
        </EuiFlexItem>
      </EuiFlexGroup>
    </EuiForm>
  );

  return (
    <>
      <SubtaskAddOneButtonContainer>
        <EuiFlexGroup justifyContent="spaceAround">
          <EuiFlexItem grow={false}>
            <EuiPopover
              id="inlineFormPopover"
              button={button}
              isOpen={isPopoverOpen}
              closePopover={closePopover}
            >
              <div style={{ width: 500 }}>{formSample}</div>
            </EuiPopover>
          </EuiFlexItem>
        </EuiFlexGroup>
      </SubtaskAddOneButtonContainer>
      <EuiHorizontalRule />
    </>
  );
}

// mapping action creators to props
const mapDispatchToProps = (dispatch) => {
  return {
    createNewSubtask: (taskId, newSubtaskDescription) =>
      dispatch(createNewSubtask(taskId, newSubtaskDescription)),
  };
};

// connect react components to Redux store
 export default connect(null, mapDispatchToProps)(SubtaskAddOne);
