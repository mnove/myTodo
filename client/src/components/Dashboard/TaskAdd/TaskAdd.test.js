import React from "react";
// import {render, fireEvent, cleanup} from '@testing-library/react';
import { render, fireEvent, cleanup } from "../../../test/test-utils";
import "@testing-library/jest-dom/extend-expect";

// redux
import { createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer from "../../../redux/rootReducer";

// component to TEST
import TaskAdd from "./TaskAdd";

afterEach(cleanup);

const initialState = {
  tasks: {
    loading: false,
    error: "",
    data: [
      {
        task_id: "1001",
        task_owner: "123456",
        task_description: "task description",
        task_is_completed: false,
        created_at: "2021-05-05T19:55:29.422Z",
        updated_at: "2021-05-05T19:55:29.422Z",
      },
    ],
  },
};

test("TaskAdd button renders with button text Add Task ", () => {
  const component = render(<TaskAdd />, { initialState: initialState });
  const addButtonText = component.getByTestId("button");
  expect(addButtonText.textContent).toBe("Add Task");
});

test("TaskAdd input changes on change ", () => {
  const component = render(<TaskAdd />, { initialState: initialState });
  const addInputEl = component.getByTestId("input");

  fireEvent.change(addInputEl, {
    target: {
      value: "add some random text...",
    },
  });
  expect(addInputEl.value).toBe("add some random text...");
});

test("TaskAdd input string length is correct", () => {
  const component = render(<TaskAdd />, { initialState: initialState });
  const addInputEl = component.getByTestId("input");

  let sampleText = "Test string";
  let sampleTextLength = sampleText.length;

  fireEvent.change(addInputEl, {
    target: {
      value: "Test string",
    },
  });
  expect(addInputEl.value.length).toBe(sampleTextLength);
});

//  test("TaskAdd onSubmitForm() gets called when button is clicked", () => {
//     const component =  render(<TaskAdd/>, { initialState: initialState })
//     const addButtonText = component.getByTestId('button');

//     const mockOnSubmitForm = jest.fn();

//     fireEvent.click(addButtonText);

//     expect(mockOnSubmitForm).toHaveBeenCalledTimes(1);

//  })

//  test("TaskAdd onSubmitForm() returns FALSE when called and addTask input component is null", () => {
//     const component =  render(<TaskAdd/>, { initialState: initialState })
//     const addInputEl = component.getByTestId('input');

//     const mockOnSubmitForm = jest.fn();
//     expect(mockOnSubmitForm)

//     let sampleText = ""; // simulate empty string (e.g. adding a task with no text)
//     let sampleTextLength = sampleText.length;

//     fireEvent.change( addInputEl, {
//         target: {
//             value: "Test string"
//         }
//     })
//     expect(addInputEl.value.length).toBe(sampleTextLength);
//  })

// const store = createStore(rootReducer, initialState);

// const Wrapper = ({ children }) => (
// 	<Provider store={store}>{children}</Provider>
// );

// test("header renders with correct text", () => {
//     const component = render(<TaskAdd/>, { wrapper: Wrapper })
// })
