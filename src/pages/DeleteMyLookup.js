import React, { Component } from 'react'
import axios from "axios";
import { NotificationManager } from "react-notifications";
import { Redirect } from "react-router";

export class DeleteMyLookup extends Component {
    constructor(props) {
        super(props);
        this.state = {
          redirectToSuccess: false,
          id: null,
        };
      }
    componentDidMount() {
        this.setState({ id: this.props.match.params.id });
        console.log(this.props.match.params.id);

        axios({
            method: "DELETE",
            url: "http://localhost:4100/api/delete_lookup_data",
            data: { id: this.state.id },
          }).then((res) => {
            NotificationManager.success(
              "Record Successfully Deleted.",
              "Success"
            );
            //this.setState({ redirectToSuccess: true });
          });
      }
    render() {
        if (this.state.redirectToSuccess) {
            // redirect to home if signed up
            return <Redirect to = {{ pathname: "/my-lookup" }} />;
          }
        return (
            <div>
                
            </div>
        )
    }
}

export default DeleteMyLookup
