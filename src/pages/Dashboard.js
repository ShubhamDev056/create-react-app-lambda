import React, { Component } from "react";
import { Link } from "react-router-dom";
import Header from "../components/partials/Header";
import Sidebar from "../components/partials/Sidebar";
export class Dashboard extends Component {
  componentWillMount() {
    document.getElementById("body").className = "theme-red";
  }
  render() {
    return (
      <>
        <div>
          <div className="overlay" />
          {/* Search Bar */}
          <div className="search-bar">
            <div className="search-icon">
              <i className="material-icons">search</i>
            </div>
            <input type="text" placeholder="START TYPING..." />
            <div className="close-search">
              <i className="material-icons">close</i>
            </div>
          </div>
          {/* #END# Search Bar */}
          {/* Top Bar */}
          <Header />
          {/* #Top Bar */}
          <section>
            {/* Left Sidebar */}
            <Sidebar />
            {/* #END# Right Sidebar */}
          </section>
          <section className="content">
            <div className="container-fluid">
              <div className="block-header">
                <h2>DASHBOARD</h2>
              </div>
              {/* Widgets */}
              <div className="row clearfix">
                <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                  <div className="info-box bg-pink hover-expand-effect">
                    <div className="icon">
                      <i className="material-icons">playlist_add_check</i>
                    </div>
                    <div className="content">
                      <div className="text">NEW TASKS</div>
                      <div
                        className="number count-to"
                        data-from={0}
                        data-to={125}
                        data-speed={15}
                        data-fresh-interval={20}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                  <div className="info-box bg-cyan hover-expand-effect">
                    <div className="icon">
                      <i className="material-icons">help</i>
                    </div>
                    <div className="content">
                      <div className="text">NEW TICKETS</div>
                      <div
                        className="number count-to"
                        data-from={0}
                        data-to={257}
                        data-speed={1000}
                        data-fresh-interval={20}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                  <div className="info-box bg-light-green hover-expand-effect">
                    <div className="icon">
                      <i className="material-icons">forum</i>
                    </div>
                    <div className="content">
                      <div className="text">NEW COMMENTS</div>
                      <div
                        className="number count-to"
                        data-from={0}
                        data-to={243}
                        data-speed={1000}
                        data-fresh-interval={20}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                  <div className="info-box bg-orange hover-expand-effect">
                    <div className="icon">
                      <i className="material-icons">person_add</i>
                    </div>
                    <div className="content">
                      <div className="text">NEW VISITORS</div>
                      <div
                        className="number count-to"
                        data-from={0}
                        data-to={1225}
                        data-speed={1000}
                        data-fresh-interval={20}
                      />
                    </div>
                  </div>
                </div>
              </div>
              {/* #END# Widgets */}

              <div className="row clearfix">
                {/* Visitors */}
                <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4">
                  <div className="card">
                    <div className="body bg-pink">
                      <div className="m-b--35 font-bold">
                        LATEST SOCIAL TRENDS
                      </div>
                      <ul className="dashboard-stat-list">
                        <li>
                          #socialtrends
                          <span className="pull-right">
                            <i className="material-icons">trending_up</i>
                          </span>
                        </li>
                        <li>
                          #materialdesign
                          <span className="pull-right">
                            <i className="material-icons">trending_up</i>
                          </span>
                        </li>
                        <li>#adminbsb</li>
                        <li>#freeadmintemplate</li>
                        <li>#bootstraptemplate</li>
                        <li>
                          #freehtmltemplate
                          <span className="pull-right">
                            <i className="material-icons">trending_up</i>
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                {/* #END# Visitors */}
                {/* Latest Social Trends */}
                <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4">
                  <div className="card">
                    <div className="body bg-cyan">
                      <div className="m-b--35 font-bold">
                        LATEST SOCIAL TRENDS
                      </div>
                      <ul className="dashboard-stat-list">
                        <li>
                          #socialtrends
                          <span className="pull-right">
                            <i className="material-icons">trending_up</i>
                          </span>
                        </li>
                        <li>
                          #materialdesign
                          <span className="pull-right">
                            <i className="material-icons">trending_up</i>
                          </span>
                        </li>
                        <li>#adminbsb</li>
                        <li>#freeadmintemplate</li>
                        <li>#bootstraptemplate</li>
                        <li>
                          #freehtmltemplate
                          <span className="pull-right">
                            <i className="material-icons">trending_up</i>
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                {/* #END# Latest Social Trends */}
                {/* Answered Tickets */}
                <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4">
                  <div className="card">
                    <div className="body bg-teal">
                      <div className="font-bold m-b--35">ANSWERED TICKETS</div>
                      <ul className="dashboard-stat-list">
                        <li>
                          TODAY
                          <span className="pull-right">
                            <b>12</b> <small>TICKETS</small>
                          </span>
                        </li>
                        <li>
                          YESTERDAY
                          <span className="pull-right">
                            <b>15</b> <small>TICKETS</small>
                          </span>
                        </li>
                        <li>
                          LAST WEEK
                          <span className="pull-right">
                            <b>90</b> <small>TICKETS</small>
                          </span>
                        </li>
                        <li>
                          LAST MONTH
                          <span className="pull-right">
                            <b>342</b> <small>TICKETS</small>
                          </span>
                        </li>
                        <li>
                          LAST YEAR
                          <span className="pull-right">
                            <b>4 225</b> <small>TICKETS</small>
                          </span>
                        </li>
                        <li>
                          ALL
                          <span className="pull-right">
                            <b>8 752</b> <small>TICKETS</small>
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                {/* #END# Answered Tickets */}
              </div>
              <div className="row clearfix"></div>
            </div>
          </section>
        </div>
      </>
    );
  }
}

export default Dashboard;
