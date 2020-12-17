import React, { Component } from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import { NotificationManager } from 'react-notifications';
import { Redirect } from 'react-router'


export class ResetPassword extends Component {
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
          email:null,
        };
      }
    componentWillMount(){
        document.getElementById('body').className='fp-page'
        this.setState({email:this.props.match.params.id})
        console.log((this.props.match.params.id));
      }
      handleValidation(){
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;
    
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
            url:"http://157.245.250.121:4100/api/reset_password", 
            data: this.state.fields,
        }).then((response)=>{
          console.log(response)
          if (response.data.message === "password not reset") {
              this.setState({ buttonText: "RESET MY PASSWORD" });
              NotificationManager.warning('Password not reset please try again.', 'Error');              
          }if(response.data.message === "password successfully reset"){
            this.setState({ buttonText: "RESET MY PASSWORD" });
            NotificationManager.success('Password successfully reset', 'Success');
            this.setState({ redirectToSuccess: true });
          }
        })
        }
      }
        handleChange(field, e){         
            let fields = this.state.fields;
            
            fields[field] = e.target.value;
            fields['email'] = this.state.email;
            console.log(fields)        
            this.setState({fields});
        }
      
    render() {
      if (this.state.redirectToSuccess) {
        // redirect to home if signed up
        return <Redirect to = {{ pathname: "/" }} />;
      }
        return (
            <div className="fp-box">
            <div className="logo">
                <a href="javascript:void(0);">Reset Password</a>
            </div>
            <div className="card">
                <div className="body">
                <form id="reset_passwords" method="POST" onSubmit={ (e) => this.handleSubmit(e)}>
                    <div className="msg">
                    </div>
                    <div className="input-group">
                    <span className="input-group-addon">
                        <i className="material-icons">lock</i>
                    </span>
                    <div className={`form-line  ${this.state.errors.password ? 'error focused' : ''}`}>
                        <input 
                         type="password" 
                         className="form-control"
                         ref="password" 
                         placeholder="New Password" 
                         value={this.state.fields["password"]} 
                         onChange={this.handleChange.bind(this, "password")}
                         minLength={6} 
                         />
                    </div>
                    <label id="password-error" class="error" for="password">{this.state.errors.password}</label>
                    </div>
                    <div className="input-group">
                    <span className="input-group-addon">
                        <i className="material-icons">lock</i>
                    </span>
                    <div className={`form-line  ${this.state.errors.confirm_password ? 'error focused' : ''}`}>
                        <input 
                         type="password" 
                         className="form-control" 
                         ref="confirm_password" 
                         placeholder="Confirm New Password" 
                         value={this.state.fields["confirm_password"]} 
                         onChange={this.handleChange.bind(this, "confirm_password")}
                         id="confirm_password"
                         minLength={6} 
                         />
                    </div>
                    <label id="password-error" class="error" for="password">{this.state.errors.confirm_password}</label>
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

export default ResetPassword
