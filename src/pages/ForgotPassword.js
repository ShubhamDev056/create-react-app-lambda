import React, { Component } from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import { NotificationManager } from 'react-notifications';

export class ForgotPassword extends Component {
    constructor(props){
        super(props);
        this.state = {
          page: props.page,
          submitting: false,
          submitted: false,
          failedSubmit: false,
          buttonText:"RESET MY PASSWORD",
          fields: {},
          errors: {},
          redirectToSuccess: false,
        };
      }
    componentWillMount(){
        document.getElementById('body').className='fp-page'
      }
      handleValidation(){
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;
    
        //email
        if(!fields["email"]){
          formIsValid = false;
          errors["email"] = "Email is required.";
      }
      if (typeof fields["email"] !== "undefined") {
            
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        if (!pattern.test(fields["email"])) {
          formIsValid = false;
          errors["email"] = "Please enter valid email address.";
        }
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
                url:"http://157.245.250.121:4100/api/forgot_password", 
                data: this.state.fields,
            }).then((response)=>{
              console.log(response)
              if (response.data.message === "Email does not match") {
                  this.setState({ buttonText: "RESET MY PASSWORD" });
                  NotificationManager.warning('Email does not exist.', 'Error');              
              }else{
                this.setState({ buttonText: "RESET MY PASSWORD" });
                NotificationManager.success('We have sent a reset password link to your email.', 'Success');
                  
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
       
    render() {
        return (
            <div className="fp-box">
            <div className="logo">
                <a href="javascript:void(0);">Forgot Password</a>
            </div>
            <div className="card">
                <div className="body">
                <form id="forgot_passwords" method="POST" onSubmit={ (e) => this.handleSubmit(e)}>
                    <div className="msg">
                    Enter your email address that you used to register. We'll send you an email with your username and a
                    link to reset your password.
                    </div>
                    <div className="input-group">
                    <span className="input-group-addon">
                        <i className="material-icons">email</i>
                    </span>
                    <div className={`form-line  ${this.state.errors.email ? 'error focused' : ''}`}>
                        <input type="text" className="form-control" ref="email" placeholder="Email"   value={this.state.fields["email"]} 
          onChange={this.handleChange.bind(this, "email")} />
                    </div>
                    <label id="password-error" class="error" for="password">{this.state.errors.email}</label>
                    </div>
        <button className="btn btn-block btn-lg bg-pink waves-effect" type="submit">{this.state.buttonText}</button>
                    <div className="row m-t-20 m-b--5 align-center">
                    <Link to="/">Sign In!</Link>
                    </div>
                </form>
                </div>
            </div>
            </div>

        )
    }
}

export default ForgotPassword
