import React from "react";
import MUIDataTable from "mui-datatables";
import { Link } from "react-router-dom";
import Header from "../components/partials/Header";
import Sidebar from "../components/partials/Sidebar";
import axios from "axios";
import { NotificationManager } from "react-notifications";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';


document.body.classList.remove("signup-page");
document.body.classList.add("theme-red");

class WorldTable extends React.Component {
  constructor(props) {
    super(props);
    this.tableRef = React.createRef();
  }
  state = {
    loading: false,
    stats: [],
  };

  componentDidMount() {
    this.setState({ loading: true });
    fetch("http://157.245.250.121:4100/api/get_looup") //data source
      .then((response) => response.json())
      .then((res) => {
        this.setState({ stats: res, loading: true }, () => console.log(res));
      })
      .catch((error) => {
        console.log(error);
      });
  }
 
  getMuiTheme = () => createMuiTheme({
    overrides: {
      MUIDataTableBodyCell: {
        root: {
          fontSize: "14px"
        }
      },
      MuiTableCell: {
        head: {
          fontSize: "14px"
        }
      },
      MUIDataTableHeadCell: {
        fixedHeaderCommon: {
          backgroundColor: "#AAF"
        }
      },
    }
  })
  render() {
    const options = {
      filterType: "checkbox",
    };
    const columns = [
      {
        name: "first_name",
        label: "First Name",
        options: {
          filter: true,
          sort: true,
          sortDirection: 'desc'
        },
      },
      {
        name: "last_name",
        label: "Last Name",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "city",
        label: "City",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "state",
        label: "State",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "address_one",
        label: "Address",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "email_one",
        label: "Email",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "phone_one",
        label: "Phone",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "id",
        label: "Action",
        options: {
          filter: true,
          sort: false,
          rowStyle: {
            fontSize: 50,
          },
          customBodyRender: (id, tableMeta, handleDelete) => {
            return (
              <>
                <Link to={`/addedit-lookup/${id}`}>
                  <button
                    type="button"
                    class="btn bg-indigo btn-circle waves-effect waves-circle waves-float"
                  >
                    <i class="material-icons">edit</i>
                  </button>
                </Link>
                {/* <Link to={`/delete-lookup/${id}`} > */}
                <button
                  type="button"
                  onClick={() => {
                    if(window.confirm('Are you sure to delete this record?')){
                      const {stats } = this.state;
                    stats.shift();
                    this.setState({stats });
                    axios({
                      method: "DELETE",
                      url: "http://157.245.250.121:4100/api/delete_lookup_data",
                      data: { id: id },
                    }).then((res) => {
                      NotificationManager.success(
                        "Record Successfully Deleted.",
                        "Success"
                      );
                    });
                    }
                    
                  }}
                  class="btn bg-red btn-circle waves-effect waves-circle waves-float"
                >
                  <i class="material-icons">delete</i>
                </button>
                {/* </Link> */}
              </>
              // <FormControlLabel
              //   label={value ? "Yes" : "No"}
              //   value={value ? "Yes" : "No"}
              //   control={
              //     <Switch color="primary" checked={value} value={value ? "Yes" : "No"} />
              //   }
              //   onChange={event => {
              //     updateValue(event.target.value === "Yes" ? false : true);
              //   }}
              // />
            );
          },
        },
      },
    ];
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
                      <h2>My Lookups</h2>
                      <p></p>
                      <Link to="/addedit-lookup">
                        <button
                          title="Add Lookups"
                          type="button"
                          class="btn bg-indigo btn-circle waves-effect waves-circle waves-float"
                        >
                          <i class="material-icons">add</i>
                        </button>
                      </Link>
                      <ul class="header-dropdown m-r--5"></ul>
                    </div>
                    <div className="body">
                      <div className="table-responsive">
                      <MuiThemeProvider theme={this.getMuiTheme()}>
                        <MUIDataTable 
                          title={" "}
                          data={this.state.stats}
                          columns={columns}
                          options={options}
                          
                        />
                        </MuiThemeProvider>
                      </div>
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
export default WorldTable;
