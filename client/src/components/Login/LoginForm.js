import React, { Fragment, useState, useEffect } from "react";
import { withRouter } from "react-router-dom";

import {
  EuiButton,
  EuiCheckboxGroup,
  EuiFieldText,
  EuiForm,
  EuiFormRow,
  EuiFlexGroup,
  EuiFlexItem,
  EuiButtonEmpty,
  EuiHorizontalRule,
  EuiGlobalToastList,
} from "@elastic/eui";

import styled from "styled-components";

// redux
import { connect } from "react-redux";
import { loginUser } from "../../redux/index";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // error validations triggers

  const [showEmailErrors, setShowEmailErrors] = useState(false);
  const [emailErrors, setEmailErrors] = useState("");
  const [isEmailValid, setEmailValid] = useState("");

  const [showPasswordErrors, setShowPasswordErrors] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState("");
  const [isPasswordValid, setPasswordValid] = useState("");

  const handleEmail = (e) => {
    setEmail(e.target.value); 
  };

  const handlePassword = (e) => {
    setPassword(e.target.value); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await props.loginUser(email, password);

    // get error data from state
    const errorMsg = props.auth.error;

    if (errorMsg) {
      console.log("Login Failed");
      // trigger notifications
      setShowEmailErrors(true);
      setShowPasswordErrors(true);

      const toastMessage = errorMsg;
      const toast = getToast(toastMessage);
      setToasts(toasts.concat(toast.toast));
      console.log(toast);
    } else {
      setShowEmailErrors(false);
      setShowPasswordErrors(false);
      props.history.push("/login");
    }
  };

  useEffect(() => {
    if (props.auth.error === "") {
    } else {
    }

    if (props.auth.isAuthenticated) {
      props.history.push("/");
    }
  }, [props.auth.loading]);

  // const [toastMessage, setToastMessage] = useState("");
  const [toasts, setToasts] = useState([]);
  const removeToast = (removedToast) => {
    setToasts([]);
  };
  const getToast = (message) => {
    // set up toast notifications
    const toastsList = [
      {
        title: message,
        color: "danger",
        iconType: "user",
      },

    ];
    return {
      id: `1001`,
      toast: toastsList[0],
    };
  };
  

  return (
    <Fragment>
    

      <>
        <EuiForm component="form">
          <EuiFormRow
            label="Email"
            isInvalid={showEmailErrors}
            error={emailErrors}
          >
            <EuiFieldText
              name="email"
              isInvalid={showEmailErrors}
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </EuiFormRow>
          <EuiFormRow
            label="Password"
            helpText="At least 8 characters"
            isInvalid={showPasswordErrors}
            error={passwordErrors}
          >
            <EuiFieldText
              name="password"
              isInvalid={showPasswordErrors}
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </EuiFormRow>

          <EuiHorizontalRule size="half" margin="l" />

          <EuiFlexGroup
            gutterSize="s"
            alignItems="center"
            justifyContent="spaceAround"
          >
            <EuiFlexItem grow={false}>
              <EuiButton href="#" onClick={handleSubmit}>
                Login
              </EuiButton>
            </EuiFlexItem>
          </EuiFlexGroup>

          <EuiFlexGroup
            gutterSize="s"
            alignItems="center"
            justifyContent="spaceAround"
          >
            <EuiFlexItem grow={false}>
              <EuiButtonEmpty href="#">Register</EuiButtonEmpty>
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiForm>
        <EuiGlobalToastList
          toasts={toasts}
          dismissToast={removeToast}
          toastLifeTimeMs={6000}
        />
      </>
    </Fragment>
  );
};

// REDUX //

// mapping store state to props
const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};
// mapping action creators to props
const mapDispatchToProps = (dispatch) => {
  return {
    loginUser: (email, password) => dispatch(loginUser(email, password)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
