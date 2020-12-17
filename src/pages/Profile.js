import React, { Component } from "react";
import { Link } from "react-router-dom";
import Header from "../components/partials/Header";
import Sidebar from "../components/partials/Sidebar";
import axios from "axios";
import { NotificationManager } from 'react-notifications';
import { Redirect } from 'react-router'

export class Profile extends Component {
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
    };
  }
  componentWillMount() {
    document.getElementById("body").className = "theme-red";
  }
  componentDidMount() {
    axios({
      method: "POST",
      url: "http://157.245.250.121:4100/api/company_profile",
      data: { id: localStorage.getItem("id") },
    }).then((res) => {
      const profileData = res.data;
      this.setState({ fields:profileData });
      console.log(this.state.fields);
    });
  }

  handleValidation(){
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    //phone
    if(!fields["phone_number"]){
      formIsValid = false;
      errors["phone_number"] = "Contact Number is required.";
  }
   //first name
    if(!fields["first_name"]){
      formIsValid = false;
      errors["first_name"] = "First Name is required.";
  }
   //last name
   if(!fields["last_name"]){
    formIsValid = false;
    errors["last_name"] = "Last Name is required.";
}
 //company name
 if(!fields["company_name"]){
    formIsValid = false;
    errors["company_name"] = "Company Name is required.";
}
 

   this.setState({errors: errors});
   console.log(this.state.errors)
   return formIsValid;
}
 
  
    //--------- Submit Handller 
    handleSubmit = (e) => {
        e.preventDefault()
        if(this.handleValidation()){
          this.setState({
            buttonText: 'Submiting...'
        })
        
          console.log(this.state.fields);
          axios({
            method: "POST", 
            url:"http://157.245.250.121:4100/api/edit_company_profile", 
            data: this.state.fields,
        }).then((response)=>{
          console.log(response)
          if (response.data.message === "profile not reset") {
              this.setState({ buttonText: "Edit Profile" });
              NotificationManager.warning('Email does not exist.', 'Error');              
          }if(response.data.message === "profile successfully update"){
            this.setState({ buttonText: "Edit Profile" });
            NotificationManager.success('Profile successfully updated.', 'Success');
            let fullName = this.state.fields.first_name+' '+this.state.fields.last_name;
            localStorage.setItem('name', fullName);
            this.setState({ redirectToSuccess: true }); 
          }
            
        })
        }
      }
        handleChange(field, e){         
            let fields = this.state.fields;
            // this.setState(prevState => ({
            //     item: { ...prevState.item,  [e.target.name]: e.target.value }
            //   }))
              fields[field] = e.target.value;
              console.log(fields)        
              this.setState({fields});
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
                      <h2>Profile</h2>
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
                            Company
                          </label>
                          <div className="col-sm-10">
                            <div className="form-line">
                              <input
                                type="text"
                                className="form-control"
                                ref="company_name"
                                placeholder="Company Name"
                                
                                value={this.state.fields.company_name}
                                onChange={this.handleChange.bind(this, "company_name")}
                              />
                            </div>
                            <label id="password-error" class="error" for="password">{this.state.errors.company_name}</label>
                          </div>
                        </div>
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
                                onChange={this.handleChange.bind(this, "first_name")}
                              />
                            </div>
                            <label id="password-error" class="error" for="password">{this.state.errors.first_name}</label>
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
                                onChange={this.handleChange.bind(this, "last_name")}
                              />
                            </div>
                            <label id="password-error" class="error" for="password">{this.state.errors.last_name}</label>
                          </div>
                        </div>
                        <div className="form-group">
                          <label
                            htmlFor="NameSurname"
                            className="col-sm-2 control-label"
                          >
                            Contact Number
                          </label>
                          <div className="col-sm-10">
                            <div className="form-line">
                              <input
                                type="number"
                                className="form-control"
                                ref="phone_number"
                                placeholder="Contact Number"
                                maxLength={10}
                                value={this.state.fields.phone_number}
                                onChange={this.handleChange.bind(this, "phone_number")}
                              />
                            </div>
                            <label id="password-error" class="error" for="password">{this.state.errors.phone_number}</label>
                          </div>
                        </div>

                        <div className="form-group">
                          <label
                            htmlFor="NameSurname"
                            className="col-sm-2 control-label"
                          >
                            Website
                          </label>
                          <div className="col-sm-10">
                            <div className="form-line">
                              <input
                                type="text"
                                className="form-control"
                                ref="website"
                                placeholder="Website"
                                value={this.state.fields.website}
                                onChange={this.handleChange.bind(this, "website")}
                              />
                            </div>
                            <label id="password-error" class="error" for="password">{this.state.errors.website}</label>
                          </div>
                        </div>
                        <div className="form-group">
                          <label
                            htmlFor="NameSurname"
                            className="col-sm-2 control-label"
                          >
                            Company ID
                          </label>
                          <div className="col-sm-10">
                            <div className="form-line">
                              <input
                                type="text"
                                className="form-control"
                                ref="unique_company_id"
                                placeholder="Unique Company ID"
                                value={this.state.fields.unique_company_id}
                                onChange={this.handleChange.bind(this, "unique_company_id")}
                              />
                            </div>
                            <label id="password-error" class="error" for="password">{this.state.errors.unique_company_id}</label>
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
                                onChange={this.handleChange.bind(this, "address_one")}
                              />
                            </div>
                            <label id="password-error" class="error" for="password">{this.state.errors.address_one}</label>
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
                                onChange={this.handleChange.bind(this, "address_two")}
                              />
                            </div>
                            <label id="password-error" class="error" for="password">{this.state.errors.address_two}</label>
                          </div>
                        </div>

                        <div className="form-group">
                          <label
                            htmlFor="NameSurname"
                            className="col-sm-2 control-label"
                          >
                            Zip Code
                          </label>
                          <div className="col-sm-10">
                            <div className="form-line">
                              <input
                                type="number"
                                className="form-control"
                                ref="zip"
                                placeholder="Zip Code"
                                maxLength={10}
                                value={this.state.fields.zip}
                                onChange={this.handleChange.bind(this, "zip")}
                              />
                            </div>
                            <label id="password-error" class="error" for="password">{this.state.errors.zip}</label>
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
                            <label id="password-error" class="error" for="password">{this.state.errors.city}</label>
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
                            <label id="password-error" class="error" for="password">{this.state.errors.state}</label>
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

export default Profile;
