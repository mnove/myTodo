import React, { Fragment, useState } from "react";


// redux
import { connect } from "react-redux";
import { createNewTask } from "../redux/index";


const InputTodo = ( props ) => {
  const [description, setDescription] = useState("");

  const handleChange = (e) => {
    setDescription(e.target.value);
  };

 

  
  const onSubmitForm = async (e) => {
    e.preventDefault();
      
    console.log(description);
     props.createNewTask(description); 
  
  };

  return (
    <Fragment>
      <h1 className="text-center mt-5">Pern Todo List</h1>
      <form className="d-flex mt-5" onSubmit={onSubmitForm}>
        <input
          type="text"
          className="form-control"
          placeholder="write something..."
          value={description}
          onChange={handleChange}
        />
        <button className="btn btn-primary" >Add</button>
      </form>
    </Fragment>
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
export default connect(mapStateToProps, mapDispatchToProps)(InputTodo);