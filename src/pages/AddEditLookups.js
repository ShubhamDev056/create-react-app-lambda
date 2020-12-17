import React, { Component } from "react";
import { Link } from "react-router-dom";
import Header from "../components/partials/Header";
import Sidebar from "../components/partials/Sidebar";
import axios from "axios";
import { NotificationManager } from "react-notifications";
import { Redirect } from "react-router";

export class AddEditLookups extends Component {
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
    this.setState({ id: this.props.match.params.id });
    console.log(this.props.match.params.id);
  }
  componentDidMount() {
    if (this.state.id != null) {
      axios({
        method: "POST",
        url: "http://157.245.250.121:4100/api/lookup_data",
        data: { id: this.state.id },
      }).then((res) => {
        const profileData = res.data[0];
        this.setState({ fields: profileData });
        console.log(this.state.fields);
      });
    }
  }

  handleValidation() {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    //first name
    if (!fields["first_name"]) {
      formIsValid = false;
      errors["first_name"] = "First Name is required.";
    }
    //last name
    if (!fields["last_name"]) {
      formIsValid = false;
      errors["last_name"] = "Last Name is required.";
    }
    if (!fields["country"]) {
      formIsValid = false;
      errors["country"] = "Country is required.";
    }
    if (!fields["city"]) {
      formIsValid = false;
      errors["city"] = "City is required.";
    }
    if (!fields["state"]) {
      formIsValid = false;
      errors["state"] = "State is required.";
    }
    if (!fields["address_one"]) {
      formIsValid = false;
      errors["address_one"] = "Address is required.";
    }
    if (!fields["email_one"]) {
      formIsValid = false;
      errors["email_one"] = "Email is required.";
    }
    if (typeof fields["email_one"] !== "undefined") {
      var pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );
      if (!pattern.test(fields["email_one"])) {
        formIsValid = false;
        errors["email_one"] = "Please enter valid email address.";
      }
    }
    if (!fields["phone_one"]) {
      formIsValid = false;
      errors["phone_one"] = "Contact Number is required.";
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
      if (this.state.id != null) {
        axios({
          method: "POST",
          url: "http://157.245.250.121:4100/api/update_lookup_data",
          data: this.state.fields,
        }).then((response) => {
          console.log(response);
          if (response.data.message === "Lookup is not update") {
            this.setState({ buttonText: "Edit Profile" });
            NotificationManager.warning(
              "Lookup is not update please try after sone time.",
              "Error"
            );
          }
          if (response.data.message === "lookup successfully update") {
            this.setState({ buttonText: "Edit Lookup" });
            NotificationManager.success(
              "Lookup successfully updated.",
              "Success"
            );
            let fullName =
              this.state.fields.first_name + " " + this.state.fields.last_name;
            localStorage.setItem("name", fullName);
            this.setState({ redirectToSuccess: true });
          }
        });
      } else {
          console.log('gg')
        console.log(this.state.fields);
        axios({
            method: "POST",
            url: "http://157.245.250.121:4100/api/insert_lookup_data",
            data: this.state.fields,
          }).then((response) => {
            console.log(response);
            this.setState({
                buttonText: "Submit",
              });
            if (response.data.result === "success") {
              NotificationManager.success(
                "Lookup successfully added.",
                "Success"
              );
              this.setState({ redirectToSuccess: true });
            }else{
              this.setState({ buttonText: "Edit Lookup" });
              NotificationManager.warning(
                "Internal Server Error Please Try After Some Time.",
                "Error"
              );
              this.setState({ redirectToSuccess: true });
            }
          });
      }
    }
  };
  handleChange(field, e) {
    let fields = this.state.fields;
    // this.setState(prevState => ({
    //     item: { ...prevState.item,  [e.target.name]: e.target.value }
    //   }))
    fields[field] = e.target.value;
    console.log(fields);
    this.setState({ fields });
  }
  render() {
    if (this.state.redirectToSuccess) {
        // redirect to home if signed up
        return <Redirect to = {{ pathname: "/my-lookup" }} />;
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
                      <h2>{this.state.id ? "Edit Lookup" : "Add Lookup"}</h2>
                      <p></p>
                      <Link to="/my-lookup">
                        <button
                          title="Add Lookups"
                          type="button"
                          class="btn bg-indigo btn-circle waves-effect waves-circle waves-float"
                        >
                          <i class="material-icons">keyboard_backspace</i>
                        </button>
                      </Link>
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
                            First Name
                          </label>
                          <div className="col-sm-10">
                            <div className="form-line">
                              <input
                                type="text"
                                className="form-control"
                                ref="first_name"
                                placeholder="First Name"
                                value={this.state.fields.first_name}
                                onChange={this.handleChange.bind(
                                  this,
                                  "first_name"
                                )}
                              />
                            </div>
                            <label
                              id="password-error"
                              class="error"
                              for="password"
                            >
                              {this.state.errors.first_name}
                            </label>
                          </div>
                        </div>
                        <div className="form-group">
                          <label
                            htmlFor="NameSurname"
                            className="col-sm-2 control-label"
                          >
                            Last Name
                          </label>
                          <div className="col-sm-10">
                            <div className="form-line">
                              <input
                                type="text"
                                className="form-control"
                                ref="last_name"
                                placeholder="Last Name"
                                value={this.state.fields.last_name}
                                onChange={this.handleChange.bind(
                                  this,
                                  "last_name"
                                )}
                              />
                            </div>
                            <label
                              id="password-error"
                              class="error"
                              for="password"
                            >
                              {this.state.errors.last_name}
                            </label>
                          </div>
                        </div>
                        <div className="form-group">
                          <label
                            htmlFor="NameSurname"
                            className="col-sm-2 control-label"
                          >
                            County
                          </label>
                          <div className="col-sm-10">
                            <div className="form-line">
                              <input
                                type="text"
                                className="form-control"
                                ref="country"
                                placeholder="country"
                                value={this.state.fields.country}
                                onChange={this.handleChange.bind(
                                  this,
                                  "country"
                                )}
                              />
                            </div>
                            <label
                              id="password-error"
                              class="error"
                              for="password"
                            >
                              {this.state.errors.country}
                            </label>
                          </div>
                        </div>
                        <div className="form-group">
                          <label
                            htmlFor="NameSurname"
                            className="col-sm-2 control-label"
                          >
                            City
                          </label>
                          <div className="col-sm-10">
                            <div className="form-line">
                              <input
                                type="text"
                                className="form-control"
                                ref="city"
                                placeholder="City"
                                value={this.state.fields.city}
                                onChange={this.handleChange.bind(this, "city")}
                              />
                            </div>
                            <label
                              id="password-error"
                              class="error"
                              for="password"
                            >
                              {this.state.errors.city}
                            </label>
                          </div>
                        </div>

                        <div className="form-group">
                          <label
                            htmlFor="NameSurname"
                            className="col-sm-2 control-label"
                          >
                            State
                          </label>
                          <div className="col-sm-10">
                            <div className="form-line">
                              <input
                                type="text"
                                className="form-control"
                                ref="state"
                                placeholder="State"
                                value={this.state.fields.state}
                                onChange={this.handleChange.bind(this, "state")}
                              />
                            </div>
                            <label
                              id="password-error"
                              class="error"
                              for="password"
                            >
                              {this.state.errors.state}
                            </label>
                          </div>
                        </div>
                        <div className="form-group">
                          <label
                            htmlFor="NameSurname"
                            className="col-sm-2 control-label"
                          >
                            Address One
                          </label>
                          <div className="col-sm-10">
                            <div className="form-line">
                              <input
                                type="text"
                                className="form-control"
                                ref="address_one"
                                placeholder="Address One"
                                value={this.state.fields.address_one}
                                onChange={this.handleChange.bind(
                                  this,
                                  "address_one"
                                )}
                              />
                            </div>
                            <label
                              id="password-error"
                              class="error"
                              for="password"
                            >
                              {this.state.errors.address_one}
                            </label>
                          </div>
                        </div>
                        <div className="form-group">
                          <label
                            htmlFor="NameSurname"
                            className="col-sm-2 control-label"
                          >
                            Address Two
                          </label>
                          <div className="col-sm-10">
                            <div className="form-line">
                              <input
                                type="text"
                                className="form-control"
                                ref="address_two"
                                placeholder="Address Two"
                                value={this.state.fields.address_two}
                                onChange={this.handleChange.bind(
                                  this,
                                  "address_two"
                                )}
                              />
                            </div>
                            <label
                              id="password-error"
                              class="error"
                              for="password"
                            >
                              {this.state.errors.address_two}
                            </label>
                          </div>
                        </div>
                        <div className="form-group">
                          <label
                            htmlFor="NameSurname"
                            className="col-sm-2 control-label"
                          >
                            Email
                          </label>
                          <div className="col-sm-10">
                            <div className="form-line">
                              <input
                                type="email"
                                className="form-control"
                                ref="email_one"
                                placeholder="Email"
                                value={this.state.fields.email_one}
                                onChange={this.handleChange.bind(
                                  this,
                                  "email_one"
                                )}
                              />
                            </div>
                            <label
                              id="password-error"
                              class="error"
                              for="password"
                            >
                              {this.state.errors.email_one}
                            </label>
                          </div>
                        </div>
                        <div className="form-group">
                          <label
                            htmlFor="NameSurname"
                            className="col-sm-2 control-label"
                          >
                            Email Two
                          </label>
                          <div className="col-sm-10">
                            <div className="form-line">
                              <input
                                type="email"
                                className="form-control"
                                ref="email_two"
                                placeholder="Email Two"
                                value={this.state.fields.email_two}
                                onChange={this.handleChange.bind(
                                  this,
                                  "email_two"
                                )}
                              />
                            </div>
                            <label
                              id="password-error"
                              class="error"
                              for="password"
                            >
                              {this.state.errors.email_two}
                            </label>
                          </div>
                        </div>
                        <div className="form-group">
                          <label
                            htmlFor="NameSurname"
                            className="col-sm-2 control-label"
                          >
                            Email Three
                          </label>
                          <div className="col-sm-10">
                            <div className="form-line">
                              <input
                                type="email"
                                className="form-control"
                                ref="email_three"
                                placeholder="Email Three"
                                value={this.state.fields.email_three}
                                onChange={this.handleChange.bind(
                                  this,
                                  "email_three"
                                )}
                              />
                            </div>
                            <label
                              id="password-error"
                              class="error"
                              for="password"
                            >
                              {this.state.errors.email_three}
                            </label>
                          </div>
                        </div>
                        <div className="form-group">
                          <label
                            htmlFor="NameSurname"
                            className="col-sm-2 control-label"
                          >
                            Contact
                          </label>
                          <div className="col-sm-10">
                            <div className="form-line">
                              <input
                                type="number"
                                className="form-control"
                                ref="phone_one"
                                placeholder="Contact"
                                maxLength={10}
                                value={this.state.fields.phone_one}
                                onChange={this.handleChange.bind(
                                  this,
                                  "phone_one"
                                )}
                              />
                            </div>
                            <label
                              id="password-error"
                              class="error"
                              for="password"
                            >
                              {this.state.errors.phone_one}
                            </label>
                          </div>
                        </div>
                        <div className="form-group">
                          <label
                            htmlFor="NameSurname"
                            className="col-sm-2 control-label"
                          >
                            Contact Two
                          </label>
                          <div className="col-sm-10">
                            <div className="form-line">
                              <input
                                type="number"
                                className="form-control"
                                ref="phone_two"
                                placeholder="Contact Two"
                                maxLength={10}
                                value={this.state.fields.phone_two}
                                onChange={this.handleChange.bind(
                                  this,
                                  "phone_two"
                                )}
                              />
                            </div>
                            <label
                              id="password-error"
                              class="error"
                              for="password"
                            >
                              {this.state.errors.phone_two}
                            </label>
                          </div>
                        </div>
                        <div className="form-group">
                          <label
                            htmlFor="NameSurname"
                            className="col-sm-2 control-label"
                          >
                            Contact Three
                          </label>
                          <div className="col-sm-10">
                            <div className="form-line">
                              <input
                                type="number"
                                className="form-control"
                                ref="phone_three"
                                placeholder="Contact Three"
                                maxLength={10}
                                value={this.state.fields.phone_three}
                                onChange={this.handleChange.bind(
                                  this,
                                  "phone_three"
                                )}
                              />
                            </div>
                            <label
                              id="password-error"
                              class="error"
                              for="password"
                            >
                              {this.state.errors.phone_three}
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
    );
  }
}

export default AddEditLookups;
