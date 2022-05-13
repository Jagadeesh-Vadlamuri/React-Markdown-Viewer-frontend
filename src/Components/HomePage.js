import React from "react";
import { Link } from "react-router-dom";
import AssignmentReturnedIcon from "@mui/icons-material/AssignmentReturned";

const HomePage = () => {
  return (
      <div className="middlebody">
    <div className="container ">
      <h1 className="text-center">Welcome to React Markdown Editor</h1>
      <form>
        <div className="d-flex justify-content-center align-items-center">
          <AssignmentReturnedIcon style={{ fontSize: 250 }} />
        </div>
        <div className="d-flex justify-content-center align-items-center">
          <Link className="btn btn-primary mb-3" to="/createTask">
            Create Task
          </Link>
          <Link className="btn btn-secondary mb-3 mx-4" to="/getTasks">
            Show all Tasks
          </Link>
        </div>
      </form>
    </div>
    </div>
  );
};

export default HomePage;
