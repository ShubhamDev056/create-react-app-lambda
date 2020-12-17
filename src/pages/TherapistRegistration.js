import React, { Component } from "react";
import axios from "axios";
import { Redirect } from 'react-router'
import SignatureCanvas from 'react-signature-canvas';


export default class TherapistRegistration extends Component {
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
      redirectToSuccess: false
    };
  }
  //--------- Apply validations on fields -----------
  handleValidation(){
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

//First Name
    if(!fields["first_name"]){
       formIsValid = false;
       errors["first_name"] = "First name is required.";
    }
    //Last Name
    if(!fields["last_name"]){
      formIsValid = false;
      errors["last_name"] = "Last name is required.";
   }
  //License
  if(!fields["license_number"]){
    formIsValid = false;
    errors["license_number"] = "License is required.";
 }
 //License Type
 if(!fields["license_type"]){
  formIsValid = false;
  errors["license_type"] = "License type is required.";
}
//Contact
if(!fields["phone_number"]){
  formIsValid = false;
  errors["phone_number"] = "Phone number is required.";
}
//Email
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
if(!fields["practice_name"]){
  formIsValid = false;
  errors["practice_name"] = "Practice Name is required.";
}
//State
if(!fields["state"]){
  formIsValid = false;
  errors["state"] = "State is required.";
} 
//Address
if(!fields["address"]){
  formIsValid = false;
  errors["address"] = "Address is required.";
}    
if(typeof fields["address"] !== "undefined"){
  if(!fields["address"].match(/^[a-zA-Z]+$/)){
     formIsValid = false;
     errors["address"] = "Only letters";
  }        
}
//City
if(!fields["city"]){
  formIsValid = false;
  errors["city"] = "City is required.";
} 
//Zip Code
if(!fields["zip"]){
  formIsValid = false;
  errors["zip"] = "Zip Code is required.";
}
//price_per_hour
//Zip Code
if(!fields["price_per_hour"]){
  formIsValid = false;
  errors["price_per_hour"] = "Price Per Hour is required.";
}
//State License
if(!fields["state_license"]){
  formIsValid = false;
  errors["state_license"] = "State License is required.";
}
//State License Number
if(!fields["state_license_no"]){
  formIsValid = false;
  errors["state_license_no"] = "State License Number is required.";
}
//Description
if(!fields["description"]){
  formIsValid = false;
  errors["description"] = "Description is required.";
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
        url:"http://157.245.250.121:4100/api/register_therapist", 
        data: this.state.fields,
    }).then((response)=>{
      console.log(response)
      if (response.status === 200) {
        this.setState({ redirectToSuccess: true }); // after signing up, set the state to true. This will trigger a re-render
      }
      
      
        // if (response.data === 'Success'){
        //     alert("Message Sent."); 
        //     this.resetForm()
        // }else if(response.data === 'fail'){
        //     alert("Message failed to send.")
        // }
    })
    
   }else{
    
      //alert("Form has errors.")
   }

    

  }
  //--------- Submit Handller End -----------
  handleChange(field, e){         
    let fields = this.state.fields;
    
    if(e.target.files){
      fields[field] = e.target.files[0];
    }else{
      fields[field] = e.target.value;
    }
            
    this.setState({fields});
}
  //--------- Reset Form Fields -------------
  resetForm = () => {
    this.setState({
      name: "",
      email: "",
      phone: "",
      message: "",
      buttonText:""
    })
  };
  //--------- Reset Form Fields End ---------
  render() {
    if (this.state.redirectToSuccess) {
      // redirect to home if signed up
      return <Redirect to = {{ pathname: "/success" }} />;
    }
    return (
      <>
        <main role="main" className="contentarea">
      <section className="formarea">
        <div className="container">
          <div className="row">
            <div className="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 bgdarkblue">
              <div className="wel regis">
                <img src="common/images/welcom.png" />
                <h3 className="text-center text-white pb-4 mt-4">Welcome</h3>	
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                  tempor incididunt ut labore et dolore magna aliqua.</p>
              </div>
            </div>
            <div className="col-12 col-sm-12 col-md-8 col-lg-8 col-xl-8 bg-white">							
              <form className="registration"  
              onSubmit={ (e) => this.handleSubmit(e)}
              >	
                <h3 className="text-center pb-4">Thearapist Registration</h3>
                <div className="row">
                  <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                    <div className="form-group">
                      <label>First Name</label>
                      <input 
                       type="text" 
                       ref="first_name" 
                       className="form-control" 
                       value={this.state.fields["first_name"]} 
                       onChange={this.handleChange.bind(this, "first_name")}
                      />
                       <span style={{color: "red"}}>{this.state.errors["first_name"]}</span>
                    </div>
                    <div className="form-group">
                      <label>License</label>
                      <input 
                       type="text" 
                       ref="license_number" 
                       className="form-control"
                       value={this.state.fields["license_number"]}
                       onChange={this.handleChange.bind(this, "license_number")} 
                      />
                      <span style={{color: "red"}}>{this.state.errors["license_number"]}</span>
                    </div>
                    <div className="form-group">
                      <label>Phone Number</label>
                      <input 
                       type="number" 
                       ref="phone_number" 
                       className="form-control"
                       value={this.state.fields["phone_number"]}
                       onChange={this.handleChange.bind(this, "phone_number")}
                       maxLength="10"
                      />
                      <span style={{color: "red"}}>{this.state.errors["phone_number"]}</span>
                    </div>
                    <div className="form-group">
                      <label>Practice Name (If Applicable)</label>
                      <input 
                       type="text" 
                       ref="practice_name" 
                       className="form-control"
                       value={this.state.fields["practice_name"]}
                       onChange={this.handleChange.bind(this, "practice_name")}
                      />
                      <span style={{color: "red"}}>{this.state.errors["practice_name"]}</span>
                    </div>
                    <div className="form-group">
                      <label>Address</label>
                      <input 
                       type="text" 
                       ref="address" 
                       className="form-control"
                       value={this.state.fields["address"]}
                       onChange={this.handleChange.bind(this, "address")}
                     />
                     <span style={{color: "red"}}>{this.state.errors["address"]}</span>
                    </div>
                    <div className="form-group">
                      <label>Zipcode</label>
                      <input 
                       type="number" 
                       ref="zip" 
                       className="form-control"
                       value={this.state.fields["zip"]}
                       onChange={this.handleChange.bind(this, "zip")}
                      />
                      <span style={{color: "red"}}>{this.state.errors["zip"]}</span>
                    </div>
                    <div className="form-group">
                      <label>State License</label>
                      <input 
                       type="text" 
                       ref="state_license" 
                       className="form-control"
                       value={this.state.fields["state_license"]}
                       onChange={this.handleChange.bind(this, "state_license")}
                      />
                      <span style={{color: "red"}}>{this.state.errors["state_license"]}</span>
                    </div>
                    {/* <div className="form-group">
                      <label>Signature</label>
                      <input type="file" name="add" />
                    </div> */}
                  </div>
                  <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                    <div className="form-group">
                      <label>Last Name</label>
                      <input 
                       type="text" 
                       ref="last_name" 
                       className="form-control"
                       value={this.state.fields["last_name"]} 
                      onChange={this.handleChange.bind(this, "last_name")}
                      />
                      <span style={{color: "red"}}>{this.state.errors["last_name"]}</span>
                    </div>
                    <div 
                     className="form-group" 
                     ref="license_type" 
                     onChange={this.handleChange.bind(this, "license_type")}
                    >
                      <label>License Type</label>
                      <select className="type form-control">
                        <option value="">-- Select License Type --</option>
                        <option value={this.state.fields["license_type"]}>LPC</option>
                        <option value={this.state.fields["license_type"]}>Ph.D.</option>
                        <option value={this.state.fields["license_type"]}>Psy.D.</option>
                        <option value={this.state.fields["license_type"]}>LMFT</option>
                        <option value={this.state.fields["license_type"]}>LCADAC</option>
                        <option value={this.state.fields["license_type"]}>LICSW</option>
                        <option value={this.state.fields["license_type"]}>LCSW Licensed Clinical Social Worker</option>
                        <option value={this.state.fields["license_type"]}>ACSW</option>
                        <option value={this.state.fields["license_type"]}>LMSW</option>
                        <option value={this.state.fields["license_type"]}>LMHC</option>
                        <option value={this.state.fields["license_type"]}>MHC</option>
                      </select>
                      <span style={{color: "red"}}>{this.state.errors["license_type"]}</span>
                    </div>
                    <div className="form-group">
                      <label>Email</label>
                      <input 
                       type="text" 
                       ref="email" 
                       className="form-control" 
                       value={this.state.fields["email"]}
                       onChange={this.handleChange.bind(this, "email")}
                      />
                       <span style={{color: "red"}}>{this.state.errors["email"]}</span>
                    </div>
                    <div 
                     className="form-group">
                      <label>State</label>
                      <select 
                       className="form-control"
                       ref="state"
                      onChange={this.handleChange.bind(this, "state")}
                      >
                        <option value="">-- Select State --</option>
                        <option value={this.state.fields["state"]}> Australia</option>
                        <option value={this.state.fields["state"]}> Australia</option>
                        <option value={this.state.fields["state"]}> USA</option>
                        <option value={this.state.fields["state"]}> India</option>
                        <option value={this.state.fields["state"]}> Japan</option>
                        <option value={this.state.fields["state"]}> Shreelanka</option>
                      </select>
                      <span style={{color: "red"}}>{this.state.errors["state"]}</span>
                    </div>
                    <div className="form-group">
                      <label>City</label>
                      <input 
                       type="text" 
                       ref="city" 
                       className="form-control"
                       value={this.state.fields["city"]}
                      onChange={this.handleChange.bind(this, "city")}
                      />
                       <span style={{color: "red"}}>{this.state.errors["city"]}</span>
                    </div>
                    <div className="form-group">
                      <label>Price Per Hour</label>
                      <input 
                       type="number" 
                       ref="price_per_hour" 
                       className="form-control"
                       value={this.state.fields["price_per_hour"]}
                       onChange={this.handleChange.bind(this, "price_per_hour")}
                      />
                      <span style={{color: "red"}}>{this.state.errors["price_per_hour"]}</span>
                    </div>
                    <div className="form-group">
                      <label>State License Number</label>
                      <input 
                       type="text" 
                       ref="state_license_no" 
                       className="form-control"
                       value={this.state.fields["state_license_no"]}
                       onChange={this.handleChange.bind(this, "state_license_no")}
                      />
                      <span style={{color: "red"}}>{this.state.errors["state_license_no"]}</span>
                    </div>
                   
                  </div>
                </div>
                <div className="row">  
                  <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                  <div className="form-group">
                      <label>Description</label>
                      <textarea 
                       className="form-control w-100"
                       rows={5}
                       ref="description"
                       onChange={this.handleChange.bind(this, "description")}
                      >
                        {this.state.fields["description"]}
                      </textarea>
                      <span style={{color: "red"}}>{this.state.errors["description"]}</span>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                  <div className="form-group">
                      <label>Description</label>
                      <textarea 
                       className="form-control w-100"
                       rows={5}
                       ref="description"
                       onChange={this.handleChange.bind(this, "description")}
                      >
                        {this.state.fields["description"]}
                      </textarea>
                      <span style={{color: "red"}}>{this.state.errors["description"]}</span>
                    </div>
                  </div>
                </div>
                <div className="row">  
                  <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                    <div className="form-group mt-3">
                      <button type="submit" className="btn submit btn-primary btn-md">{this.state.buttonText}</button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>	
        </div>
      </section>
</main>

      </>
    );
  }
}
