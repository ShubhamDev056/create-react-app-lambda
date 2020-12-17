import React, { Component } from "react";
import { Link } from "react-router-dom";

export class Sidebar extends Component {
  render() {
    return (
      <>
        <aside id="leftsidebar" className="sidebar">
          {/* User Info */}
          <div className="user-info">
            <div className="image">
              <img src="images/user.png" width={48} height={48} alt="User" />
            </div>
            <div className="info-container">
              <div
                className="name"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                {localStorage.getItem("name")}
              </div>
              <div className="email">{localStorage.getItem("email")}</div>
              <div className="btn-group user-helper-dropdown">
                <i
                  className="material-icons"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="true"
                >
                  keyboard_arrow_down
                </i>
                <ul className="dropdown-menu pull-right">
                  <li>
                    <Link to="/profile">
                      <i className="material-icons">person</i>Profile
                    </Link>
                  </li>
                  <li role="separator" className="divider" />
                  <li>
                    <Link to="/change-password">
                      <i className="material-icons">lock</i>Change Password
                    </Link>
                  </li>
                  <li role="separator" className="divider" />
                  <li>
                    <Link to="/logout">
                      <i className="material-icons">input</i>Sign Out
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {/* #User Info */}
          {/* Menu */}
          <div className="menu">
            <ul className="list">
              <li className="header">MAIN NAVIGATION</li>
              <li className="active">
                <Link to="/dashboard">
                  <i className="material-icons">home</i>
                  <span>Dashboard</span>
                </Link>
              </li>
              <li>
                <Link to="/profile">
                  <i className="material-icons">text_fields</i>
                  <span>My Account</span>
                </Link>
              </li>
              <li>
                <Link to="/my-lookup">
                  <i className="material-icons">layers</i>
                  <span>My Lookups</span>
                </Link>
              </li>
              <li>
                <Link to="/do-a-lookup">
                  <i className="material-icons">layers</i>
                  <span>Do a Lookups</span>
                </Link>
              </li>
              <li>
                <Link to="/dashboard">
                  <i className="material-icons">layers</i>
                  <span>Enter a guest review</span>
                </Link>
              </li>
            </ul>
          </div>
          {/* #Menu */}
          {/* Footer */}
          <div className="legal">
            <div className="copyright">© 2020 - 2021</div>
            <div className="version"></div>
          </div>
          {/* #Footer */}
        </aside>
        {/* #END# Left Sidebar */}
        {/* Right Sidebar */}
        <aside id="rightsidebar" className="right-sidebar">
          <ul className="nav nav-tabs tab-nav-right" role="tablist">
            <li role="presentation" className="active">
              <a href="#skins" data-toggle="tab">
                SKINS
              </a>
            </li>
            <li role="presentation">
              <a href="#settings" data-toggle="tab">
                SETTINGS
              </a>
            </li>
          </ul>
          <div className="tab-content">
            <div
              role="tabpanel"
              className="tab-pane fade in active in active"
              id="skins"
            >
              <ul className="demo-choose-skin">
                <li data-theme="red" className="active">
                  <div className="red" />
                  <span>Red</span>
                </li>
                <li data-theme="pink">
                  <div className="pink" />
                  <span>Pink</span>
                </li>
                <li data-theme="purple">
                  <div className="purple" />
                  <span>Purple</span>
                </li>
                <li data-theme="deep-purple">
                  <div className="deep-purple" />
                  <span>Deep Purple</span>
                </li>
                <li data-theme="indigo">
                  <div className="indigo" />
                  <span>Indigo</span>
                </li>
                <li data-theme="blue">
                  <div className="blue" />
                  <span>Blue</span>
                </li>
                <li data-theme="light-blue">
                  <div className="light-blue" />
                  <span>Light Blue</span>
                </li>
                <li data-theme="cyan">
                  <div className="cyan" />
                  <span>Cyan</span>
                </li>
                <li data-theme="teal">
                  <div className="teal" />
                  <span>Teal</span>
                </li>
                <li data-theme="green">
                  <div className="green" />
                  <span>Green</span>
                </li>
                <li data-theme="light-green">
                  <div className="light-green" />
                  <span>Light Green</span>
                </li>
                <li data-theme="lime">
                  <div className="lime" />
                  <span>Lime</span>
                </li>
                <li data-theme="yellow">
                  <div className="yellow" />
                  <span>Yellow</span>
                </li>
                <li data-theme="amber">
                  <div className="amber" />
                  <span>Amber</span>
                </li>
                <li data-theme="orange">
                  <div className="orange" />
                  <span>Orange</span>
                </li>
                <li data-theme="deep-orange">
                  <div className="deep-orange" />
                  <span>Deep Orange</span>
                </li>
                <li data-theme="brown">
                  <div className="brown" />
                  <span>Brown</span>
                </li>
                <li data-theme="grey">
                  <div className="grey" />
                  <span>Grey</span>
                </li>
                <li data-theme="blue-grey">
                  <div className="blue-grey" />
                  <span>Blue Grey</span>
                </li>
                <li data-theme="black">
                  <div className="black" />
                  <span>Black</span>
                </li>
              </ul>
            </div>
            <div role="tabpanel" className="tab-pane fade" id="settings">
              <div className="demo-settings">
                <p>GENERAL SETTINGS</p>
                <ul className="setting-list">
                  <li>
                    <span>Report Panel Usage</span>
                    <div className="switch">
                      <label>
                        <input type="checkbox" defaultChecked />
                        <span className="lever" />
                      </label>
                    </div>
                  </li>
                  <li>
                    <span>Email Redirect</span>
                    <div className="switch">
                      <label>
                        <input type="checkbox" />
                        <span className="lever" />
                      </label>
                    </div>
                  </li>
                </ul>
                <p>SYSTEM SETTINGS</p>
                <ul className="setting-list">
                  <li>
                    <span>Notifications</span>
                    <div className="switch">
                      <label>
                        <input type="checkbox" defaultChecked />
                        <span className="lever" />
                      </label>
                    </div>
                  </li>
                  <li>
                    <span>Auto Updates</span>
                    <div className="switch">
                      <label>
                        <input type="checkbox" defaultChecked />
                        <span className="lever" />
                      </label>
                    </div>
                  </li>
                </ul>
                <p>ACCOUNT SETTINGS</p>
                <ul className="setting-list">
                  <li>
                    <span>Offline</span>
                    <div className="switch">
                      <label>
                        <input type="checkbox" />
                        <span className="lever" />
                      </label>
                    </div>
                  </li>
                  <li>
                    <span>Location Permission</span>
                    <div className="switch">
                      <label>
                        <input type="checkbox" defaultChecked />
                        <span className="lever" />
                      </label>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </aside>
      </>
    );
  }
}

export default Sidebar;
