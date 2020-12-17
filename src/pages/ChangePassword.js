import React, { Component } from "react";
import { Link } from "react-router-dom";
import Header from "../components/partials/Header";
import Sidebar from "../components/partials/Sidebar";
import axios from "axios";
import { NotificationManager } from "react-notifications";
import { Redirect } from "react-router";

export class ChangePassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
          submitting: false,
          submitted: false,
          failedSubmit: false,
          buttonText: "Submit",
          fields: {},
          errors: {},
          redirectToSuccess: false,
          id: null,
        };
      }
      componentWillMount() {
        document.getElementById("body").className = "theme-red";
        this.setState({ id: localStorage.getItem('id') });
      }

    
      handleValidation() {
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;
    
        if (!fields["old_password"]) {
          formIsValid = false;
          errors["old_password"] = "Old Password is required.";
        }
        if(!fields["password"]){
            formIsValid = false;
            errors["password"] = "Password is required.";
         }
         //Confirm Password
         if(!fields["confirm_password"]){
           formIsValid = false;
           errors["confirm_password"] = "Confirm Password is required.";
        }
 
        if (typeof fields["password"] !== "undefined" && typeof fields["confirm_password"] !== "undefined") {
           
         if (fields["password"] != fields["confirm_password"]) {
           formIsValid = false;
           errors["password"] = "Passwords don't match.";
         }
       } 
    
        this.setState({ errors: errors });
        console.log(this.state.errors);
        return formIsValid;
      }
    
      //--------- Submit Handller
      handleSubmit = (e) => {
        e.preventDefault();
        if (this.handleValidation()) {
          this.setState({
            buttonText: "Submiting...",
          });
    
          console.log(this.state.fields);
            axios({
              method: "POST",
              url: "http://157.245.250.121:4100/api/change_password",
              data: this.state.fields,
            }).then((response) => {
              console.log(response);
              if (response.data.message === "The password you have entered does not match your current one.") {
                NotificationManager.warning(
                  "Please Enter Correct Old Password",
                  "Error"
                );
                this.setState({
                    buttonText: "Submit",
                  });
              }
              if (response.data === "password successfully updated") {
                NotificationManager.success(
                  "Password successfully change.",
                  "Success"
                );
                this.setState({
                    buttonText: "Submit",
                  });
                this.setState({ redirectToSuccess: true });
              }
            });
          
        }
      };
      handleChange(field, e) {
        let fields = this.state.fields;
        fields[field] = e.target.value;
        fields["id"] = this.state.id
        console.log(fields);
        this.setState({ fields });
      }
    render() {
        if (this.state.redirectToSuccess) {
            // redirect to home if signed up
            return <Redirect to = {{ pathname: "/dashboard" }} />;
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
                          <h2>Change Password</h2>
                          <ul class="header-dropdown m-r--5"></ul>
                        </div>
                        <div className="body">
                          <form
                            method="POST"
                            id="form_validation"
                            className="form-horizontal"
                            onSubmit={(e) => this.handleSubmit(e)}
                          >
                            <div className="form-group">
                              <label
                                htmlFor="NameSurname"
                                className="col-sm-2 control-label"
                              >
                                Old Password
                              </label>
                              <div className="col-sm-10">
                                <div className="form-line">
                                  <input 
                                    type="password"
                                    className="form-control"
                                    ref="old_password"
                                    placeholder="Old Password"
                                    value={this.state.fields.old_password}
                                    onChange={this.handleChange.bind(
                                      this,
                                      "old_password"
                                    )}
                                  />
                                </div>
                                <label
                                  id="password-error"
                                  class="error"
                                  for="password"
                                >
                                  {this.state.errors.old_password}
                                </label>
                              </div>
                            </div>
                            <div className="form-group">
                              <label
                                htmlFor="NameSurname"
                                className="col-sm-2 control-label"
                              >
                                New Password
                              </label>
                              <div className="col-sm-10">
                                <div className="form-line">
                                  <input
                                    type="password"
                                    className="form-control"
                                    ref="password"
                                    placeholder="New Password"
                                    value={this.state.fields.password}
                                    onChange={this.handleChange.bind(
                                      this,
                                      "password"
                                    )}
                                  />
                                </div>
                                <label
                                  id="password-error"
                                  class="error"
                                  for="password"
                                >
                                  {this.state.errors.password}
                                </label>
                              </div>
                            </div>
                            <div className="form-group">
                              <label
                                htmlFor="NameSurname"
                                className="col-sm-2 control-label"
                              >
                                Confim Password
                              </label>
                              <div className="col-sm-10">
                                <div className="form-line">
                                  <input
                                    type="password"
                                    className="form-control"
                                    ref="confirm_password"
                                    placeholder="Confim Password"
                                    value={this.state.fields.confirm_password}
                                    onChange={this.handleChange.bind(
                                      this,
                                      "confirm_password"
                                    )}
                                  />
                                </div>
                                <label
                                  id="password-error"
                                  class="error"
                                  for="password"
                                >
                                  {this.state.errors.confirm_password}
                                </label>
                              </div>
                            </div>
                           
    
                            <div className="form-group">
                              <div className="col-sm-offset-2 col-sm-10">
                                <button type="submit" className="btn btn-success">
                                  {this.state.buttonText}
                                </button>
                              </div>
                            </div>
                          </form>
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
        )
    }
}

export default ChangePassword
