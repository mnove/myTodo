import React, { Fragment, useState, useEffect } from "react";
import { withRouter, useHistory } from "react-router-dom";

import {
  EuiButton,
  EuiFieldText,
  EuiForm,
  EuiFormRow,
  EuiFlexGroup,
  EuiFlexItem,
  EuiButtonEmpty,
  EuiHorizontalRule,
  EuiGlobalToastList,
} from "@elastic/eui";


// redux
import { connect } from "react-redux";
import { loginUser } from "../../redux/index";

// Notifications
import { getToast } from "../../utils/notifications/toastsList";

const Login = (props) => {
  let history = useHistory();

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
      // trigger notifications
      setShowEmailErrors(true);
      setShowPasswordErrors(true);

      // NOTIFICATIONS
      const toast = getToast(1002, errorMsg); // get the toast message from utility fx
      setToasts(toasts.concat(toast.toast)); // set the toast so it displays
    } else {
      setShowEmailErrors(false);
      setShowPasswordErrors(false);
      props.history.push("/dashboard");
    }
  };

  useEffect(() => {
    if (props.auth.error === "") {
    } else {
    }

    if (props.auth.isAuthenticated) {
      props.history.push("/dashboard");
    }
  }, [props.auth.loading]);

  const [toasts, setToasts] = useState([]);
  const removeToast = (removedToast) => {
    setToasts([]);
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
              <EuiButtonEmpty onClick={() => history.push("/register")}>
                Register
              </EuiButtonEmpty>
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
