// rules for validations

export const registerFormValidationsRules = {
  fNameValidator: function (fname) {
    let validationResults = {
      isValid: true,
      errorMsgs: [],
    };
    const nameAsString = fname.toString();
    if (nameAsString.length >= 3 && nameAsString.length <= 50) {
      console.log("first name ok");
      console.log(validationResults);
      return validationResults;
    } else {
      if (nameAsString.length < 3) {
        return (validationResults = {
          isValid: false,
          errorMsgs: ["Too short."],
        });
      } else if (nameAsString.length > 50) {
        return (validationResults = {
          isValid: false,
          errorMsgs: ["Too long."],
        });
      }
      return false;
    }
  },

  lNameValidator: function (lname) {
    let validationResults = {
      isValid: true,
      errorMsgs: [],
    };
    const nameAsString = lname.toString();
    if (nameAsString.length >= 3 && nameAsString.length <= 50) {
      console.log("last name ok");
      return validationResults;
    } else {
      if (nameAsString.length < 3) {
        return (validationResults = {
          isValid: false,
          errorMsgs: ["Too short."],
        });
      } else if (nameAsString.length > 50) {
        return (validationResults = {
          isValid: false,
          errorMsgs: ["Too long."],
        });
      }
      return false;
    }
  },

  emailValidator: function (email) {
    let validationResults = {
      isValid: true,
      errorMsgs: [],
    };
    const emailAsString = email.toString();
    const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    console.log(regexp.test(emailAsString));
    if (
      emailAsString.length >= 3 &&
      emailAsString.length <= 80 &&
      regexp.test(emailAsString)
    ) {
      console.log("email ok");
      return validationResults;
      
    } else if (emailAsString.length === 0) {
        return (validationResults = {
            isValid: false,
            errorMsgs: ["Email field cannot be empty."],
          });
    } else {
      return (validationResults = {
        isValid: false,
        errorMsgs: ["Wrong email format. Pick another one."],
      });
    }
  },

  passwordlValidator: function (password) {
    let validationResults = {
      isValid: true,
      errorMsgs: [],
    };
    const passwordAsString = password.toString();
    console.log(passwordAsString.length);
    if (passwordAsString.length >= 8 && passwordAsString.length <= 80) {
      console.log("password ok");
      return validationResults;
    } else if (passwordAsString.length < 8) {
      console.log("password too short");
      return (validationResults = {
        isValid: false,
        errorMsgs: ["password too short"],
      });
    } else if (passwordAsString.length > 80) {
      console.log("password too short");
      return (validationResults = {
        isValid: false,
        errorMsgs: ["password too long"],
      });
    }
  },
};
