import React, { Fragment, useEffect, useState } from "react";

import EditTodo from "./EditTodo";


const ListTodos = () => {
  const [todos, setTodos] = useState([]);

  const getTodos = async () => {
    try {
      const response = await fetch("/todos");
      if (response.ok) {
        const jsonResponse = await response.json();
        // console.log(jsonResponse);
        setTodos(jsonResponse);
        return jsonResponse;
      }
      throw new Error("Request failed!");
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const options = {
        method: "DELETE",
      };

      const response = await fetch(
        `/todos/${id}`,
        options
      );

      if (response.ok) {
        const jsonResponse = await response.json();
        console.log(jsonResponse);
        setTodos(todos.filter(todos => todos.todo_id !== id));
        return jsonResponse;
      }
      throw new Error("Request failed!");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <Fragment>
      <h2>Your Todos</h2>
      <table className="table table-striped text-center">
        <thead>
          <tr>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {/* <tr>
            <td>John</td>
            <td>Doe</td>
            <td>john@example.com</td>
          </tr> */}

          {todos.map((todo, index) => {
            return (
              <tr key={todo.todo_id}>
                <th>{todo.description}</th>
                <th>{<EditTodo todo={todo}/>}</th>
                <th>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(todo.todo_id)}
                  >
                    Delete
                  </button>
                </th>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Fragment>
  );
};

export default ListTodos;
