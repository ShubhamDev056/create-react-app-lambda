import React from "react";
import { Link } from "react-router-dom";

const Header = ({ appLogo }) => {
  return (
    <nav className="navbar">
      <div className="container-fluid">
        <div className="navbar-header">
          <a
            href="javascript:void(0);"
            className="navbar-toggle collapsed"
            data-toggle="collapse"
            data-target="#navbar-collapse"
            aria-expanded="false"
          />
          <a href="javascript:void(0);" className="bars" />
          <a className="navbar-brand" href="index.html">
            {localStorage.getItem("name")}
          </a>
        </div>
        <div className="collapse navbar-collapse" id="navbar-collapse">
          <ul className="nav navbar-nav navbar-right">
            {/* Call Search */}
            {/* #END# Call Search */}
            {/* Notifications */}

            {/* #END# Notifications */}
            {/* Tasks */}

            {/* #END# Tasks */}
            <li className="">
              <Link to="/logout">
                <i className="material-icons">logout</i>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
export default Header;
