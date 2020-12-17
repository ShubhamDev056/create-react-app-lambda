import React, { Component } from 'react'
import { Redirect } from 'react-router'

export class Logout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirectToSuccess:false
        };
      }
    componentWillMount(){
            localStorage.setItem('name', null);
            localStorage.setItem('email', null);
            localStorage.setItem('id', null);
            this.setState({ redirectToSuccess: true });
      }
    render() {
        if (this.state.redirectToSuccess) {
            // redirect to home if signed up
            return <Redirect to = {{ pathname: "/" }} />;
          }
        return (
            <div>
                
            </div>
        )
    }
}

export default Logout
