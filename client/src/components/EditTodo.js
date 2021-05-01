import React, { Fragment, useState } from "react";

const EditTodo = ({ todo }) => {
  const [todoId, setTodoId] = useState(todo.id);
  const [title, setTitle] = useState(todo.title);
  console.log("todo title", title)
  console.log("ID", todoId)

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

      const response = await fetch(
        `api/todos/${todoId}`,
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
      </div>
    </Fragment>
  );
};

export default EditTodo;
