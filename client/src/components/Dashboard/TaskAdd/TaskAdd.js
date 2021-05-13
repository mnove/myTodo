import React, { Fragment, useState } from "react";

import {
  EuiFieldSearch,
  EuiRange,
  EuiTextArea,
  EuiFormRow,
  EuiFlexGroup,
  EuiFlexItem,
  EuiSpacer,
  EuiButton,
  EuiFieldText
} from '@elastic/eui';


// redux
import { connect } from "react-redux";
import { createNewTask } from "../../../redux/index";


const TaskAdd = ( props ) => {
  const [description, setDescription] = useState("");

  const handleChange = (e) => {
    setDescription(e.target.value);
  };

 

const onSubmitForm = async () => {
    
    console.log(description);
     props.createNewTask(description); 
  
  };

  return (
    // <Fragment>
    //   <h1 className="text-center mt-5">Pern Todo List</h1>
    //   <form className="d-flex mt-5" onSubmit={onSubmitForm}>
    //     <input
    //       type="text"
    //       className="form-control"
    //       placeholder="write something..."
    //       value={description}
    //       onChange={handleChange}
    //     />
    //     <button className="btn btn-primary" >Add</button>
    //   </form>
    // </Fragment>

    <>
    <EuiFlexGroup data-testid="container">
      <EuiFlexItem>
        <EuiFieldText
          placeholder="Add a task..."
          fullWidth
          aria-label="An example of search with fullWidth"
          onChange={handleChange}
        />
      </EuiFlexItem>
      <EuiFlexItem grow={false}>
        <EuiButton onClick={onSubmitForm}>Add Task</EuiButton>
      </EuiFlexItem>
    </EuiFlexGroup>

    <EuiSpacer size="l" />

    </>


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
    createNewTask: (description) => dispatch(createNewTask(description)),
  };
};

// connect react components to Redux store
 export default connect(mapStateToProps, mapDispatchToProps)(TaskAdd);