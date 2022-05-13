import React from "react";
import {Link} from 'react-router-dom';
import DownloadIcon from '@mui/icons-material/Download';

const Navbar = () => {
  return (
    <div className="mb-4">
      <nav className="navbar navbar-fixed-top navbar-light bg-success">
        <div className="container-fluid d-flex justify-content-center align-items-center mt-1">
          <Link className="navbar-brand text-light" to="/">
          <h2><DownloadIcon style={{fontSize: 45}}/>
            React Markdown Editor</h2>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
