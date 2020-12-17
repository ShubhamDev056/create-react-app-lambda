import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { NotificationManager } from "react-notifications";
import { Redirect } from 'react-router'

export class EnterOtp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: props.page,
      submitting: false,
      submitted: false,
      failedSubmit: false,
      buttonText: "Verify",
      fields: {},
      errors: {},
      redirectToSuccess: false,
      id:null,
    };
  }
  componentWillMount() {
    document.getElementById("body").className = "fp-page";
    this.setState({id:this.props.match.params.id})
    console.log((this.props.match.params.id));
  }
  handleValidation() {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    //email
  
    if (!fields["otp"]) {
      formIsValid = false;
      errors["otp"] = "One time password is required.";
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
        buttonText: "Verifying...",
      });

      console.log(this.state.fields);
      axios({
        method: "POST",
        url: "http://157.245.250.121:4100/api/verify_otp",
        data: this.state.fields,
      }).then((response) => {
        console.log(response);
        if (response.data.message === "otp does not match.") {
          this.setState({ buttonText: "Verify" });
          NotificationManager.warning("Please Enter Correct OTP.", "Error");
        } else {
          this.setState({ buttonText: "Verify" });
          NotificationManager.success( "Login Successfull.",
            "Success"
          );
            let fullName = response.data.userinfo.first_name+' '+response.data.userinfo.last_name;
            let emailID = response.data.userinfo.email;
            let id = response.data.userinfo.id;
            localStorage.setItem('name', fullName);
            localStorage.setItem('email', emailID);
            localStorage.setItem('id', id);
            this.setState({ redirectToSuccess: true });
         
        }
      });
    }
  };
  handleChange(field, e) {
    let fields = this.state.fields;
    fields[field] = e.target.value;
    fields['id'] = this.state.id;

    console.log(fields);
    this.setState({ fields });
  }

  render() {
    if (this.state.redirectToSuccess) {
      // redirect to home if signed up
      return <Redirect to = {{ pathname: "/dashboard" }} />;
    }
    return (
      <div className="fp-box">
        <div className="logo">
          <a href="javascript:void(0);">ENTER OTP</a>
        </div>
        <div className="card">
          <div className="body">
            <form
              id="forgot_passwords"
              method="POST"
              onSubmit={(e) => this.handleSubmit(e)}
            >
              <div className="msg"></div>
              <div className="input-group">
                <span className="input-group-addon">
                  <i className="material-icons">email</i>
                </span>
                <div
                  className={`form-line  ${
                    this.state.errors.email ? "error focused" : ""
                  }`}
                >
                  <input
                    type="number"
                    className="form-control"
                    ref="otp"
                    placeholder="Enter OTP"
                    value={this.state.fields["otp"]}
                    onChange={this.handleChange.bind(this, "otp")}
                  />
                </div>
                <label id="password-error" class="error" for="password">
                  {this.state.errors.otp}
                </label>
              </div>
              <button
                className="btn btn-block btn-lg bg-pink waves-effect"
                type="submit"
              >
                {this.state.buttonText}
              </button>
              <div className="row m-t-20 m-b--5 align-center">
                <Link to="/">Sign In!</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default EnterOtp;
