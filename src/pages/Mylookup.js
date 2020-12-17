import React, { Component } from "react";
import { Link } from "react-router-dom";
import Header from "../components/partials/Header";
import Sidebar from "../components/partials/Sidebar";
import axios from "axios";
import { NotificationManager } from "react-notifications";
import { Redirect } from "react-router";

export class Mylookup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lookups: []
    };
  }
  componentWillMount() {
    document.getElementById("body").className = "theme-red";
  }
  
  fetchData = ()=>{
    axios(`http://157.245.250.121:4100/api/get_looup`).then((res) => {
      const lookups = res.data;
      this.setState({ lookups });
      console.log(this.state.lookups);
    });
  }

  componentDidMount() {
    axios(`http://157.245.250.121:4100/api/get_looup`).then((res) => {
      const lookups = res.data;
      this.setState({ lookups });
      console.log(this.state.lookups);
    });
  }
  handleDelete = userId => {
    axios({
      method: "DELETE",
      url: "http://157.245.250.121:4100/api/delete_lookup_data",
      data: { id: userId },
    }).then((res) => {
      NotificationManager.success(
        "Record Successfully Deleted.",
        "Success"
      );
      this.fetchData();
    });
  }

  

  render() {
    if (this.state.redirectToSuccess) {
      // redirect to home if signed up
      return <Redirect to={{ pathname: "/dashboard" }} />;
    }
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
              <div className="block-header"></div>
              {/* Widgets */}
              <div className="row clearfix">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <div className="card">
                    <div className="header">
                      <h2>My Lookups</h2>
                      <p></p>
                      <Link to="/addedit-lookup">
                      <button title="Add Lookups" type="button" class="btn bg-indigo btn-circle waves-effect waves-circle waves-float">
                                    <i class="material-icons">add</i>
                                </button>
                                </Link>
                      <ul class="header-dropdown m-r--5">
                      
                            </ul>
                    </div>
                    <div className="body">
                      <div className="table-responsive">
                        <table className="table table-bordered table-striped table-hover js-basic-example dataTable">
                          <thead>
                            <tr>
                              <th>First Name</th>
                              <th>Last Name</th>
                              <th>City</th>
                              <th>State</th>
                              <th>Address</th>
                              <th>Email</th>
                              <th>Phone Number</th>
                              <th>Reviews</th>
                              <th>Created At</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                          {this.state.lookups.map(item => (
                                <tr key={item.id}>
                                <td>{item.first_name}</td>
                                <td>{item.last_name}</td>
                                <td>{item.city}</td>
                                <td>{item.state}</td>
                                <td>{item.address_one+ ' '+item.address_two+ ' '+item.address_three }</td>
                                <td>
                                    {item.email_one}
                                  
                               </td>
                                <td>{item.phone_one}</td>
                                <td>{item.reviews}</td>
                                <td>{item.created_at}</td>
                                <td>

                                  <Link to={`/addedit-lookup/${item.id}`} >
                                  <button type="button" class="btn bg-indigo btn-circle waves-effect waves-circle waves-float">
                                    <i class="material-icons">edit</i>
                                </button>
                                </Link>
                                
                                <button onClick={() => {if(window.confirm('Are you sure to delete this record?')){ this.handleDelete(item.id)};}} type="button" class="btn bg-red btn-circle waves-effect waves-circle waves-float">
                                    <i class="material-icons">delete</i>
                                </button>
                                </td>
                              </tr>
                            ))}
                            
                            
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* #END# Widgets */}

              <div className="row clearfix"></div>
            </div>
          </section>
        </div>
      </>
    );
  }
}

export default Mylookup;
