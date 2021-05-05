import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";

// redux
import { connect } from "react-redux";

const EditTodo = (props) => {
  const [todoId, setTodoId] = useState("");
  const [title, setTitle] = useState("");
  console.log("todo title", title);
  console.log("ID", todoId);

  const handleOnChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSave = async () => {
    try {
      const body = { title };

      const options = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      };

      const response = await fetch(`api/todos/${todoId}`, options);
      console.log(response);

      if (response.ok) {
        const jsonResponse = await response.json();
        return jsonResponse;
      }
      console.log(response);
      throw new Error("Request failed!");
    } catch (error) {
      console.log(error);
    }
  };

  // {console.log(props.selectedTask[0].task_id)}

  return (
    <Fragment>
      <Link
        to={{
          pathname: `/task/${props.selectedTask[0].task_id}`,
        }}
        style={{ textDecoration: "none" }}
      >
       Open Task
      </Link>



      {/* <button
        type="button"
        className="btn btn-primary"
        data-toggle="modal"
        data-target={`#id${todo.id}`}
      >
        Open modal
      </button>

      <div className="modal" id={`id${todo.id}`} onClick={ () => setTitle(todo.title)}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Edit Todo</h4>

              <button type="button" className="close" data-dismiss="modal" onClick={ () => setTitle(todo.title)}>
                &times;
              </button>
            </div>

            <div className="modal-body">
              <input
                type="text"
                className="form-control"
                value={title}
                onChange={(e) => handleOnChange(e)}
              ></input>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn" data-dismiss="modal" onClick={ () => setTitle(todo.title)}>
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-success"
                data-dismiss="modal"
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div> */}
    </Fragment>
  );
};

// REDUX //

// mapping store state to props
const mapStateToProps = (state, ownProps) => {
  return {
    selectedTask: state.tasks.data.filter(
      (task) => task.task_id === ownProps.taskId
    ),
  };
};

// connect react components to Redux store
export default connect(mapStateToProps, null)(EditTodo);
