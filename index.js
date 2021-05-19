const express = require("express");
const app = express();
var morgan = require('morgan')
const cors = require("cors");
const cookieParser = require('cookie-parser');
const pool = require("./db");
const path = require("path");
const PORT = process.env.PORT || 5000;

// process.env.PORT
// process.env.NODE_ENV

// ROUTES
const registrationRoutes = require("./routes/registrationRoutes");
const authRoutes = require("./routes/authRoutes");
const tasksRoutes = require("./routes/tasksRoutes");
const subtasksRoutes = require("./routes/subtasksRoutes");


// middleware
app.use(cors({
  origin: ["http://localhost:3000"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// for json 
app.use(express.json());

// parsing cookies
app.use(cookieParser());


app.use(morgan('tiny'));

if (process.env.NODE_ENV === "production") {
  // server static content 

  app.use(express.static(path.join(__dirname, "client/build")));


}

// DEFINING & SCOPING ROUTES


app.use('/api/register', registrationRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/tasks', tasksRoutes);
app.use('/api/subtasks', subtasksRoutes);



// Catch-all method
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build/index.html"));
})

app.listen(PORT, () => {
  console.log(
    `################################`,
    "\n",
    `Server has started on port ${PORT}`,
    "\n",
    `################################`
  );
});




