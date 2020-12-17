import React, { Component } from "react";
import axios from "axios";
import {Link} from "react-router-dom";
// React Notification
import { NotificationManager } from 'react-notifications';

export class Register extends Component {
    constructor(props){
        super(props);
        this.state = {
          page: props.page,
          submitting: false,
          submitted: false,
          failedSubmit: false,
          buttonText:"Submit",
          fields: {},
          errors: {},
          redirectToSuccess: false,
        };
      }
      componentWillMount(){
        document.getElementById('body').className='signup-page'
      }
        
      handleValidation(){
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;
    

        if(!fields["company_name"]){
           formIsValid = false;
           errors["company_name"] = "Company name is required.";
        }
        if(!fields["first_name"]){
          formIsValid = false;
          errors["first_name"] = "First name is required.";
       }
        if(!fields["last_name"]){
          formIsValid = false;
          errors["last_name"] = "Last name is required.";
       }
       if(!fields["email"]){
        formIsValid = false;
        errors["email"] = "Email address is required.";
    }
    if(typeof fields["email"] !== "undefined"){
        let lastAtPos = fields["email"].lastIndexOf('@');
        let lastDotPos = fields["email"].lastIndexOf('.');
    
        if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["email"].indexOf('@@') == -1 && lastDotPos > 2 && (fields["email"].length - lastDotPos) > 2)) {
          formIsValid = false;
          errors["email"] = "Please enter valid email address.";
        }
    }
    //Contact
    if(!fields["phone_number"]){
      formIsValid = false;
      errors["phone_number"] = "Phone number is required.";
    }
    
     //Password
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
   
       this.setState({errors: errors});
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
        url:"http://157.245.250.121:4100/api/property_register", 
        data: this.state.fields,
    }).then((response)=>{
      console.log(response)
      if(response.data === "email already exists"){
        NotificationManager.warning('Email id already exists.', 'Error');
      }
      if (response.data.result === "success") {
        NotificationManager.success('Successfully Registered.', 'Success');
        setTimeout(function(){
          window.location.reload();
      }, 2000)
        //this.setState({ redirectToSuccess: true }); // after signing up, set the state to true. This will trigger a re-render
      }
    })
    }
      


    

  }
    handleChange(field, e){         
        let fields = this.state.fields;
        
        if(e.target.files){
          fields[field] = e.target.files[0];
        }else{
          fields[field] = e.target.value;
        }
        console.log(fields)        
        this.setState({fields});
    }
     //--------- Reset Form Fields -------------
  resetForm = () => {
    this.setState({
      fields:{}
    })
  };
    render() {
        return (
                <div className="signup-box">
                <div className="logo">
                    <a href="javascript:void(0);">Registration</a>
                </div>
                <div className="card">
                    <div className="body">
                    <form id="sign_ups" method="POST" onSubmit={ (e) => this.handleSubmit(e)}>
                        <div className="msg">Register a new company</div>
                        <div className="input-group">
                        <span className="input-group-addon">
                            <i className="material-icons">home</i>
                        </span>
                        <div className={`form-line  ${this.state.errors.company_name ? 'error focused' : ''}`}>
                            <input
                             type="text" 
                             className="form-control" 
                             ref="company_name" 
                             placeholder="Company Name" 
                             value={this.state.fields["company_name"]} 
                             onChange={this.handleChange.bind(this, "company_name")}
                            />
                        </div>
                        <label id="password-error" class="error" for="password">{this.state.errors.company_name}</label>
                        </div>
                        <div className="input-group">
                        <span className="input-group-addon">
                            <i className="material-icons">person</i>
                        </span>
                        <div className={`form-line  ${this.state.errors.first_name ? 'error focused' : ''}`}>
                            <input 
                            type="text" 
                            className="form-control" 
                            ref="first_name" 
                            placeholder="First Name"
                            value={this.state.fields["first_name"]} 
                            onChange={this.handleChange.bind(this, "first_name")}
                            />
                        </div>
                        <label id="password-error" class="error" for="password">{this.state.errors.first_name}</label>
                        </div>
                        <div className="input-group">
                        <span className="input-group-addon">
                            <i className="material-icons">person</i>
                        </span>
                        <div className={`form-line  ${this.state.errors.last_name ? 'error focused' : ''}`}>
                            <input 
                             type="text" 
                             className="form-control" 
                             ref="last_name" 
                             placeholder="Last Name" 
                             value={this.state.fields["last_name"]} 
                             onChange={this.handleChange.bind(this, "last_name")}
                            />
                        </div>
                        <label id="password-error" class="error" for="password">{this.state.errors.last_name}</label>
                        </div>
                        <div className="input-group">
                        <span className="input-group-addon">
                            <i className="material-icons">email</i>
                        </span>
                        <div className={`form-line  ${this.state.errors.email ? 'error focused' : ''}`}>
                            <input 
                             type="email" 
                             className="form-control" 
                             ref="email" 
                             placeholder="Email Address" 
                             value={this.state.fields["email"]} 
                             onChange={this.handleChange.bind(this, "email")}
                            />
                        </div>
                        <label id="password-error" class="error" for="password">{this.state.errors.email}</label>
                        </div>
                        <div className="input-group">
                        <span className="input-group-addon">
                            <i className="material-icons">phone</i>
                        </span>
                        <div className={`form-line  ${this.state.errors.phone_number ? 'error focused' : ''}`}>
                            <input 
                             type="text" 
                             className="form-control" 
                             ref="phone_number" 
                             placeholder="Contact Number" 
                             value={this.state.fields["phone_number"]} 
                             onChange={this.handleChange.bind(this, "phone_number")}
                            />
                        </div>
                        <label id="password-error" class="error" for="password">{this.state.errors.phone_number}</label>
                        </div>
                        <div className="input-group">
                        <span className="input-group-addon">
                            <i className="material-icons">lock</i>
                        </span>
                        <div className={`form-line  ${this.state.errors.password ? 'error focused' : ''}`}>
                            <input 
                             type="password" 
                             className="form-control" 
                             name="password" 
                             minLength={6} 
                             placeholder="Password" 
                             value={this.state.fields["password"]} 
                             onChange={this.handleChange.bind(this, "password")}
                            />
                        </div>
                        <label id="password-error" class="error" for="password">{this.state.errors.password}</label>
                        </div>
                        <div className="input-group">
                        <span className="input-group-addon">
                            <i className="material-icons">lock</i>
                        </span>
                        <div className={`form-line  ${this.state.errors.confirm_password ? 'error focused' : ''}`}>
                            <input type="password" className="form-control" ref="confirm_password" minLength={6} placeholder="Confirm Password" value={this.state.fields["confirm_password"]} 
                             onChange={this.handleChange.bind(this, "confirm_password")}  />
                        </div>
                        <label id="password-error" class="error" for="password">{this.state.errors.confirm_password}</label>
                        </div>
                        <div className="form-group">
                        <input type="checkbox" name="terms" id="terms" className="filled-in chk-col-pink" value={this.state.fields["terms"]} 
                             onChange={this.handleChange.bind(this, "terms")} />
                        <label htmlFor="terms">I read and agree to the <a href="javascript:void(0);" >terms of usage</a>.</label>
                        </div>
                        <button className="btn btn-block btn-lg bg-pink waves-effect" type="submit">SIGN UP</button>
                        <div className="m-t-25 m-b--5 align-center">
                        <Link  to="/">
                        Already have an account?
                        </Link>
                        </div>
                    </form>
                    </div>
                </div>
                </div>
        )
    }
}

export default Register
