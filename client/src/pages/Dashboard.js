import React, { Fragment} from "react";
import { Link, withRouter } from "react-router-dom";


import ListTodo from "../components/ListTodo";
import InputTodo from "../components/InputTodo";

// redux
// import { connect } from "react-redux";
// import { getUserData } from "../redux/index";

const Dashboard = () => {
  
  

  return (
    <Fragment>
     <div>Your Dashboard</div>
     <InputTodo />
     <ListTodo />
    
    </Fragment>
  );
};


// connect react components to Redux store
export default Dashboard;
