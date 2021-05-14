import React, { Fragment, useEffect, useState } from "react";

import { Link, withRouter } from "react-router-dom";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
  EuiGlobalToastList
} from "@elastic/eui";

// redux
import { connect } from "react-redux";
import { getAllTasks, updateTask } from "../../redux/index";

// api 
import {userApi} from "../../api/user-api";

// loading skeletons
import Skeleton from "react-loading-skeleton";

//validation rules
import { registerFormValidationsRules } from "../../utils/validations/registrationFormValidations";

// framer motion 
import { motion } from "framer-motion";


export const RegistrationForm = (props) => {
  // form inputs
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // error validations triggers

  const [showFNameErrors, setShowFNameErrors] = useState(false);
  const [fNameErrors, setFNameErrors] = useState("");
  const [isFNameValid, setIsFNameValid] = useState("");

  const [showLNameErrors, setShowLNameErrors] = useState(false);
  const [lNameErrors, setLNameErrors] = useState("");
  const [isLNameValid, setIsLNameValid] = useState("");

  const [showEmailErrors, setShowEmailErrors] = useState(false);
  const [emailErrors, setEmailErrors] = useState("");
  const [isEmailValid, setEmailValid] = useState("");

  const [showPasswordErrors, setShowPasswordErrors] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState("");
  const [isPasswordValid, setPasswordValid] = useState("");

  const [isAllValid, setIsAllValid] = useState(false);

  // set FName validation
  const setFNameValidation = (fName) => {
    const isFirstNameValidated = registerFormValidationsRules.fNameValidator(
      fName
    );
    if (!isFirstNameValidated.isValid) {
      console.log(isFirstNameValidated.isValid);
      setShowFNameErrors(true);
      setFNameErrors(isFirstNameValidated.errorMsgs);
      setIsFNameValid(false);
    } else {
      setShowFNameErrors(false);
      setFNameErrors([]);
      setIsFNameValid(true);
    }
  };

  // set LName validation
  const setLNameValidation = (lName) => {
    const isLastNameValidated = registerFormValidationsRules.lNameValidator(
      lName
    );

    if (!isLastNameValidated.isValid) {
      console.log(isLastNameValidated.isValid);
      setShowLNameErrors(true);
      setLNameErrors(isLastNameValidated.errorMsgs);
      setIsLNameValid(false);
    } else {
      setShowLNameErrors(false);
      setLNameErrors([]);
      setIsLNameValid(true);
    }
  };

  // set Email validation
  const setEmailValidation = (email) => {
    const isEmailValidated = registerFormValidationsRules.emailValidator(email);

    if (!isEmailValidated.isValid) {
      console.log(isEmailValidated.isValid);
      setShowEmailErrors(true);
      setEmailErrors(isEmailValidated.errorMsgs);
      setEmailValid(false);
    } else {
      setShowEmailErrors(false);
      setEmailErrors([]);
      setEmailValid(true);
    }
  };

  // set password valid
  const setPasswordValidation = (password) => {
    const isPasswordValidated = registerFormValidationsRules.passwordlValidator(
      password
    );

    if (!isPasswordValidated.isValid) {
      console.log(isPasswordValidated.isValid);
      setShowPasswordErrors(true);
      setPasswordErrors(isPasswordValidated.errorMsgs);
      setPasswordValid(false);
    } else {
      setShowPasswordErrors(false);
      setPasswordErrors([]);
      setPasswordValid(true);
    }
  };

  // validate all fields
  const validateAll = () => {
    setFNameValidation(fName);
    setLNameValidation(lName);
    setEmailValidation(email);
    setPasswordValidation(password);
    if (isFNameValid && isLNameValid && isEmailValid && isPasswordValid) {
      return true;
    } else {
      return false;
    }
  };


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
    color: 'danger',
    iconType: 'user',
    text: (
      <Fragment>
        <p>Please use another email instead.</p>
      </Fragment>
    ),
  }


]


    return  (
      {
        id: `1001`,
        toast: toastsList[0]
    }
  
    )

  }
      
  

  // submit the form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateAll()) {
      console.log("Global Validation returned true");
      const response = await userApi.register( 
        fName,
        lName,
        email,
        password
      );
      console.log(response);
      if (response.error) {
        console.log("Global Validation returned FALSE");
        // trigger notifications
        const toastMessage = response.error.message;
        const toast = getToast(toastMessage);
        setToasts(toasts.concat(toast.toast));
        console.log(toast)
      } else {
        props.history.push("/login");
      }
    } return null;
  };

  console.log(showFNameErrors);
  console.log(showFNameErrors);

  return (
    <Fragment>
      <EuiForm component="form">
        <EuiFormRow>
          <EuiFlexGroup style={{ maxWidth: 600 }}>
            <EuiFlexItem>
              <EuiFormRow
                label="First name"
                isInvalid={showFNameErrors}
                error={fNameErrors}
              >
                <EuiFieldText
                  name="fname"
                  isInvalid={showFNameErrors}
                  onChange={(e) => setFName(e.target.value)}
                />
              </EuiFormRow>
            </EuiFlexItem>

            <EuiFlexItem>
              <EuiFormRow
                label="Last name"
                isInvalid={showLNameErrors}
                error={lNameErrors}
              >
                <EuiFieldText
                  name="lname"
                  isInvalid={showLNameErrors}
                  type="text"
                  onChange={(e) => setLName(e.target.value)}
                />
              </EuiFormRow>
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiFormRow>
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
          <motion.div whileHover={{ scale: 1.1}}>
          <EuiButton whileHover={{scale: 1.1}} href="#" onClick={handleSubmit}>
              Register Now
            </EuiButton>

          </motion.div>
           
          </EuiFlexItem>
        </EuiFlexGroup>

        <EuiFlexGroup
          gutterSize="s"
          alignItems="center"
          justifyContent="spaceAround"
        >
          <EuiFlexItem grow={false}>
            <EuiButtonEmpty href="#">Login</EuiButtonEmpty>
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiForm>
      <EuiGlobalToastList
        toasts={toasts}
        dismissToast={removeToast}
        toastLifeTimeMs={6000}
      />
    </Fragment>
  );
};

// REDUX //

// mapping store state to props
const mapStateToProps = (state, ownProps) => {
  return {
    // tasks: state.tasks.data.filter(
    //   (task) => task.task_id === ownProps.match.params.id
    // ),
  };
};
// mapping action creators to props
const mapDispatchToProps = (dispatch) => {
  return {
    // getAllTasks: () => dispatch(getAllTasks()),
    // updateTask: (newDescription, taskId ) =>
    //   dispatch(updateTask(newDescription, taskId )),
  };
};

// connect react components to Redux store and withRouter
 withRouter(
  connect(mapStateToProps, mapDispatchToProps)(RegistrationForm)
);
