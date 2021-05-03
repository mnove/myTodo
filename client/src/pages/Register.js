import React, { Fragment, useState } from "react";
import { withRouter } from "react-router-dom";
import { userApi } from "../api/user-api";
import Alert from "react-bootstrap/Alert";

const Register = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // form validation states
  const [firstNameValid, setfirstNameValid] = useState(true);
  const [lastNameValid, setLastNameValid] = useState(true);
  const [emailValid, setEmailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);

  // alerts
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");


  const handleFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastName = (e) => {
    setLastName(e.target.value);
  };


  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    function firstNameValidator(name) {
      const nameAsString = name.toString();
      if (nameAsString.length >= 3 && nameAsString.length <= 50) {
        console.log("first name ok");
        setfirstNameValid(true);
        return true;
      } else {
        setfirstNameValid(false);

        // Alerts
        setShowAlert(true);
        if (nameAsString.length < 3) {
          setAlertMessage("First Name to short. Pick another one.");
        } else if (nameAsString.length > 50) {
          setAlertMessage("First Name to long. Pick another one.");
        }
        return false;
      }
    }

    function lastNameValidator(name) {
      const nameAsString = name.toString();
      if (nameAsString.length >= 3 && nameAsString.length <= 50) {
        console.log("last name ok");
        setLastNameValid(true);
        return true;
      } else {
        setLastNameValid(false);

        // Alerts
        setShowAlert(true);
        if (nameAsString.length < 3) {
          setAlertMessage("Last Name to short. Pick another one.");
        } else if (nameAsString.length > 50) {
          setAlertMessage("Last Name to long. Pick another one.");
        }
        return false;
      }
    }

    function emailValidator(email) {
      const emailAsString = email.toString();
      const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      console.log(regexp.test(emailAsString));
      if (
        emailAsString.length >= 3 &&
        emailAsString.length <= 80 &&
        regexp.test(emailAsString)
      ) {
        console.log("email ok");
        setEmailValid(true);
        return true;
      } else {
        setEmailValid(false);
        // Alerts
        setShowAlert(true);
        setAlertMessage("Wrong email format. Pick another one.");
        
        return false;
      }
    }

    function passwordValidator(password) {
      const passwordAsString = password.toString();
      console.log(passwordAsString.length);
      if (passwordAsString.length >= 8 && passwordAsString.length <= 80) {
        console.log("password ok");
        setPasswordValid(true);
        return true;
      } else {
        console.log("password not ok");
        setPasswordValid(false);

         // Alerts
         setShowAlert(true);
         if (passwordAsString.length < 8) {
           setAlertMessage("Password to short. Pick another one.");
         } else if (passwordAsString.length > 80) {
           setAlertMessage("Password to long. Pick another one.");
         }
        
        return false;
      }
    }

 

    function validateAll() {

      const isFirstNameValidated = firstNameValidator(firstName);
      const isLastNameValidated = lastNameValidator(lastName);
      const isEmailValidated = emailValidator(email);
      const isPasswordValidated = passwordValidator(password);



      if (
        isFirstNameValidated &&
        isLastNameValidated &&
        isEmailValidated &&
        isPasswordValidated
      ) {
        return true;
      } else {
        return false;
      }
    }

    // check all validation rules
    if (validateAll()) {
      console.log("Global Validation returned true");
      const response = await userApi.register(
        firstName,
        lastName,
        email,
        password
      );

      if (response.error) {
        // console.log(response);
        console.log("MESSAGE: ", response.error.message);
      } else {
        console.log(response.data);
        props.history.push("/login");
      }
    } else {
      console.log("Global Validation returned false");
    }
  };

  function renderAlert() {
    if (showAlert) {
      return (
        <Fragment>
          <Alert
            variant="danger"
            onClose={() => setShowAlert(false)}
            dismissible
          >
            <Alert.Heading>{alertMessage}</Alert.Heading>
            <p></p>
          </Alert>
        </Fragment>
      );
    }
  }

  return (
    <Fragment>
      {renderAlert()}
      <main className="form-signin">
        <form onSubmit={handleSubmit}>
          <h1 className="h3 mb-3 fw-normal">Please Register</h1>

          <div className="form-floating">
            <input  style={ firstNameValid ? {borderColor: "black"} : {borderColor: "red"}}
              type="text"
              className="form-control"
              id="floatingFirstName"
              placeholder="Your First Name"
              onChange={handleFirstName}
            />
            <label htmlFor="floatingFirstName">First Name</label>
          </div>

          <div className="form-floating">
            <input  style={ lastNameValid ? {borderColor: "black"} : {borderColor: "red"}}
              type="text"
              className="form-control"
              id="floatingLastName"
              placeholder="Your Last Name"
              onChange={handleLastName}
            />
            <label htmlFor="floatingLastName">Last Name</label>
          </div>

          <div className="form-floating">
            <input  style={ emailValid ? {borderColor: "black"} : {borderColor: "red"}}
              type="email"
              className="form-control"
              id="floatingEmail"
              placeholder="name@example.com"
              onChange={handleEmail}
            />
            <label htmlFor="floatingEmail">Email address</label>
          </div>

          <div className="form-floating">
            <input  style={ passwordValid ? {borderColor: "black"} : {borderColor: "red"}}
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
              onChange={handlePassword}
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>

         

          <button className="w-100 btn btn-lg btn-primary" type="submit">
            Submit
          </button>
          <p className="mt-5 mb-3 text-muted">&copy; 2017–2021</p>

          <div></div>
        </form>
      </main>
    </Fragment>
  );
};

export default withRouter(Register);
