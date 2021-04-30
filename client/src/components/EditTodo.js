import React, { Fragment, useState } from "react";

const EditTodo = ({ todo }) => {
  const [todoId, setTodoId] = useState(todo.todo_id);
  const [description, setDescription] = useState(todo.description);
  console.log("description", description)
  console.log("ID", todoId)

  const handleOnChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSave = async () => {
    try {
      const body = { description };

      const options = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      };

      const response = await fetch(
        `/todos/${todoId}`,
        options
      );
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

  return (
    <Fragment>
      <button
        type="button"
        className="btn btn-primary"
        data-toggle="modal"
        data-target={`#id${todo.todo_id}`}
      >
        Open modal
      </button>

      <div className="modal" id={`id${todo.todo_id}`} onClick={ () => setDescription(todo.description)}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Edit Todo</h4>

              <button type="button" className="close" data-dismiss="modal" onClick={ () => setDescription(todo.description)}>
                &times;
              </button>
            </div>

            <div className="modal-body">
              <input
                type="text"
                className="form-control"
                value={description}
                onChange={(e) => handleOnChange(e)}
              ></input>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn" data-dismiss="modal" onClick={ () => setDescription(todo.description)}>
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
      </div>
    </Fragment>
  );
};

export default EditTodo;
