import React, { Fragment, useEffect, useState } from "react";

// import EditTodo from "./EditTodo";
import { TaskItem } from ".";

import { Link, withRouter } from "react-router-dom";

// redux
import { connect } from "react-redux";
import { getAllTasks, deleteTask } from "../../redux/index";

// loading skeletons
import Skeleton from "react-loading-skeleton";

// framer motion
import { AnimatePresence, AnimateSharedLayout, motion } from "framer-motion";

const TaskList = (props) => {
  useEffect(async () => {
    await props.getAllTasks();
  }, []);

  console.log(props);

  const contentToRender = () => {
    if (props.tasks.loading) {
      return (
        <>
          <div style={{ maxWidth: 600 }}>
            <Skeleton count={4} height={60} />
          </div>
        </>
      );
    } else if (props.tasks.error) {
      return (
        <>
          <p>error. Please try again later.</p>
          <h2>{props.tasks.error}</h2>
        </>
      );
    } else {
      return (
        <>
          <AnimateSharedLayout>
            <motion.div
              layout
              style={{ display: "flex", flexDirection: "column-reverse" }}
            >
              <AnimatePresence>
                {props.tasks.data.map((task, index) => {
                  return (
                    <motion.div
                      initial={{ y: "-10vw", opacity: 0, scale: 0.7 }}
                      exit={{ y: -10, scale: 0.0 }}
                      animate={{
                        scale: 1,
                        y: 0,
                        opacity: 1,
                      }}
                      key={index}
                      transition={{ delay: 0, duration: 0.3, type: "spring" }}
                    >
                      <TaskItem
                        task={task}
                        style={{ marginTop: 5, marginBottom: 10 }}
                      />
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          </AnimateSharedLayout>
        </>
      );
    }
  };

  return <Fragment>{contentToRender()}</Fragment>;
};

// REDUX //

// mapping store state to props
const mapStateToProps = (state) => {
  return {
    tasks: state.tasks,
  };
};
// mapping action creators to props
const mapDispatchToProps = (dispatch) => {
  return {
    getAllTasks: () => dispatch(getAllTasks()),
    deleteTask: (taskId) => dispatch(deleteTask(taskId)),
  };
};

// connect react components to Redux store
export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
