// list of all the toasts notifications used in the app

import React, { Fragment } from "react";

export const getToast = (id, message) => {
  const toastsList = [
    {
      // registration invalid
      id: 1001,
      title: message,
      color: "danger",
      iconType: "user",
      text: (
        <Fragment>
          <p>Please use another email instead.</p>
        </Fragment>
      ),
    },

    {
      // login invalid
      id: 1002,
      title: message,
      color: "danger",
      iconType: "user",
    },
  ];

  // retrieve the passed in toast from the list
  const toastToReturn = toastsList.find((toast) => toast.id === id);

  return {
    id: id,
    toast: toastToReturn,
  };
};
