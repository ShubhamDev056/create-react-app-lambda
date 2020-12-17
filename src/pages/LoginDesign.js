import React, { Component } from "react";
import axios from "axios";
import { Redirect } from 'react-router'
import {Link} from "react-router-dom";
// React Notification
import { NotificationContainer, NotificationManager } from 'react-notifications';

export class LoginDesign extends Component {
    componentWillMount(){
        // document.getElementById('body').className='login-page'
         document.getElementById('body').className='l'
       }
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
         //Confirm Password
         if(!fields["password"]){
           formIsValid = false;
           errors["password"] = "Password is required.";
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
                 return false;
                 axios({
                   method: "POST", 
                   url:"http://157.245.250.121:4100/api/login", 
                   data: this.state.fields,
               }).then((response)=>{
                 console.log(response)
                 // if (response.data.message === "login sucessfully") {
                 //     NotificationManager.success('Successfully login.', 'Success');
                 // //     setTimeout(function(){
                       
                 // // }, 2000)
                 // let fullName = response.data.userinfo.first_name+' '+response.data.userinfo.last_name;
                 // let emailID = response.data.userinfo.email;
                 // let id = response.data.userinfo.id;
                 // localStorage.setItem('name', fullName);
                 // localStorage.setItem('email', emailID);
                 // localStorage.setItem('id', id);
                 // this.setState({ redirectToSuccess: true });
                 
                 // }else{
                 //   NotificationManager.warning('Please enter valid credentials.', 'Error');
                     
                 // }
                 if(response.data.message === "otp successfully updated"){
                   NotificationManager.success('OPT Successfully send to your email id.', 'Success');
                   let id = response.data.userinfo.id;
                   localStorage.setItem('id', id);
                   this.setState({ redirectToSuccess: true });
                 }else{
                   NotificationManager.warning('Please enter valid credentials.', 'Error');
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
                  <>
     <div className="wrapper">
  <header className="tophdr">
    <div className="brand">
      <a href="javascript:void(0)"><img src="common/images/logo.png" alt="brand" /></a>
    </div>
  </header>
  <main role="main" className="contentarea">
    <section className="formsection">
      <div className="d-flex justify-content-between pl-3 pr-3 marginemoji">
        <div className="emojione emoji">
          <img src="common/images/emoji01.png" alt="emoji" />
        </div>
        <div className="emojitwo">
          <img src="common/images/emoji02.png" alt="emoji" />
        </div>
        <div className="emoji">
          <img src="common/images/emoji03.png" alt="emoji" />
        </div>
        <div className="emojitwo">
          <img src="common/images/emoji04.png" alt="emoji" />
        </div>
        <div className="emoji emojilast">
          <img src="common/images/emoji05.png" alt="emoji" />
        </div>
      </div>
      <div className="container">
        <div className="formcenter">
          <form className="form-group" method="POST" onSubmit={ (e) => this.handleSubmit(e)}>
            <h2 className="text-center logincent">Login</h2>
            <div className="form-group">
              <label>Username</label>
              <input
                type="text" 
                className="form-control" 
                ref="email" 
                placeholder="Email" 
                value={this.state.fields["email"]} 
                onChange={this.handleChange.bind(this, "email")}
              />
            </div>
            <label id="email-error" class="error" for="email">{this.state.errors.email}</label>
            <div className="form-group">
              <label>Password</label>
              <input 
                  type="password" 
                  className="form-control" 
                  ref="password" 
                  placeholder="Password" 
                  value={this.state.fields["password"]} 
                  onChange={this.handleChange.bind(this, "password")}
              />
              <div className="form-group text-right">
                <span>Forgot Password?</span>
              </div>						
            </div>
            <label id="password-error" class="error" for="password">{this.state.errors.password}</label>
            <div className="form-group text-center">
              <button type="submit" className="btndanger">Login</button>
            </div>
            <div className="form-group text-center regis">
              <Link to="register">Register</Link>
            </div>
          </form>
        </div>
      </div>
    </section>	
  </main>
</div>
</>
        )
    }
}

export default LoginDesign
