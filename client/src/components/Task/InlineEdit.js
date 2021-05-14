import React, { useState, useEffect, useRef } from "react";

import "./InlineEdit.css";

import useKeypress from "../../hooks/useKeypress";
import useOnClickOutside from "../../hooks/useOnClickOutside";


import styled from 'styled-components'

import {
  EuiFieldText,
  EuiText,
  EuiToolTip 
} from "@elastic/eui";


const InlineEditContainer = styled.div `
   display: flex;
   flex-direction: row;
`

const InlineTextTitle = styled((props) => <EuiText size="m" {...props}/>) `

 color: black;
   

`

const InlineEditInput = styled(EuiFieldText ) `

 display: ${props => props.isInputActive};
 min-width: 100px
   

`

function InlineEdit(props) {
  const [isInputActive, setIsInputActive] = useState(false);
  const [inputValue, setInputValue] = useState(props.text);
  const wrapperRef = useRef(null);
  const textRef = useRef(null);
  const inputRef = useRef(null);
  const enter = useKeypress("Enter");
  const esc = useKeypress("Escape");

  const validateInput = (inputValue) => {
    const regex = new RegExp("^[a-zA-Z0-9 _.-]*$");
    console.log(regex.test(inputValue));
    if (inputValue.length >= 3 && inputValue.length <= 30) {
      if (regex.test(inputValue)) {
        return true;
      } else {
        return false;
      }
    } else {
      alert("Name is invalid, must have at least 3 characters");
      return false;
    }
  };

  // check to see if the user clicked outside of this component
  useOnClickOutside(wrapperRef, () => {
    console.log("reached here!");
    if (isInputActive) {
      if (validateInput(inputValue)) {
        console.log(validateInput(inputValue));
        props.onSetText(inputValue);
        setIsInputActive(false);
      } else {
        setInputValue(props.text);
        // showError();
      }
    }
  });

  // focus the cursor in the input field on edit start
  useEffect(() => {
    if (isInputActive) {
      inputRef.current.focus();
    }
  }, [isInputActive]);
  useEffect(() => {
    if (isInputActive) {
      // if Enter is pressed, save the text and case the editor

      if (enter) {
        if (validateInput(inputValue)) {
          props.onSetText(inputValue);
          setIsInputActive(false);
        } else {
          setInputValue(props.text);
          setIsInputActive(false);
        //   showError();
        }
      }
      // if Escape is pressed, revert the text and close the editor
      if (esc) {
        setInputValue(props.text);
        setIsInputActive(false);
      }
    }
  }, [enter, esc]); // watch the Enter and Escape key presses
  

  console.log("is input active?", isInputActive)
  return (
      <>
      
    {/* <span className="inline-text" ref={wrapperRef}>
      <span
        ref={textRef}
        onClick={() => setIsInputActive(true)}
        className={`inline-text_copy inline-text_copy--${
          !isInputActive ? "active" : "hidden"
        }`}
      >
        {props.text}
      </span>

      
      <input
        maxLength="35"
        ref={inputRef}
        // set the width to the input length multiplied by the x height
        // it's not quite right but gets it close
        style={{ width: Math.ceil(inputValue.length * 1.1) + "ex" }}
        value={inputValue}
        onChange={e => {
          setInputValue(e.target.value);
        }}
        className={`inline-text_input inline-text_input--${
          isInputActive ? "active" : "hidden"
        }`}
      />
      
    </span> */}

    <span className="inline-text" ref={wrapperRef}>
   <EuiToolTip position="top" content="Edit task's name">

    <InlineEditContainer>
      <span
        ref={textRef}
        onClick={() => setIsInputActive(true)}
        className={`inline-text_copy inline-text_copy--${
          !isInputActive ? "active" : "hidden"
        }`}
      >
      <InlineTextTitle>{props.text}</InlineTextTitle>
        
      </span>

      
      <InlineEditInput
        maxLength="35"
        inputRef={inputRef}
        // set the width to the input length multiplied by the x height
        // it's not quite right but gets it close
        style={{ width: Math.ceil(inputValue.length * 1.1) + "ex" }}
        value={inputValue}
        onChange={e => {
          setInputValue(e.target.value);
        }}
        isInputActive={!isInputActive ? "none" : ""}
      />
      </InlineEditContainer>
      </EuiToolTip>
    </span>
    </>
  );
  
}

export default InlineEdit;