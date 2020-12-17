// import React, { useState, useEffect } from 'react';
// import DataTable,{ createTheme } from 'react-data-table-component';
// import axios from 'axios';
// import Header from "../components/partials/Header";
// import Sidebar from "../components/partials/Sidebar";
// import { Link } from "react-router-dom";
// document.body.classList.remove('signup-page');
// document.body.classList.add('theme-red');
// const columns = [

//     {
//       name: 'First Name',
//       selector: 'first_name',
//       sortable: true
//     },
//     {
//       name: 'Last Name',
//       selector: 'last_name',
//       sortable: true
//     },
//     {
//         name: 'City',
//         selector: 'city',
//         sortable: true
//       },
//       {
//         name: 'State',
//         selector: 'state',
//         sortable: true
//       },
//       {
//         name: 'Address',
//         selector: 'address_one',
//         sortable: true
//       },
//       {
//         name: 'Address Two',
//         selector: 'address_two',
//         sortable: true
//       },
//       {
//         name: 'Address Two',
//         selector: 'address_two',
//         sortable: true
//       },
//       {
//         name: 'Address Three',
//         selector: 'address_three',
//         sortable: true
//       },
//       {
//         name: 'Email',
//         selector: 'email_one',
//         sortable: true
//       },
//       {
//         name: 'Email Two',
//         selector: 'email_two',
//         sortable: true
//       },
//       {
//         name: 'Email Three',
//         selector: 'email_three',
//         sortable: true
//       },
//       {
//         name: 'Phone',
//         selector: 'phone_one',
//         sortable: true
//       },
//       {
//         name: 'Created At',
//         selector: 'created_at',
//         sortable: true
//       },
//       {
//         name: 'Reviews',
//         selector: 'created_at',
//         sortable: true
//       }
//   ];

// const Lookups = () => {
//     const [users, setUsers] = useState({});
//   const [page, setPage] = useState(1);
//   const countPerPage = 1;
//   console.log(users.total)
//   const getUserList = () => {
//     axios.get(`http://157.245.250.121:4100/api/get_looups?page=${page}&perPage=${countPerPage}`).then(res => {
//       setUsers(res.data);
//     }).catch(err => {
//       setUsers({});
//     });
//   }
 
//   useEffect(() => {
//     getUserList();
//   }, [page]);

//     return (
//         <>
//         <div>
//           <div className="overlay" />
//           {/* Search Bar */}
//           <div className="search-bar">
//             <div className="search-icon">
//               <i className="material-icons">search</i>
//             </div>
//             <input type="text" placeholder="START TYPING..." />
//             <div className="close-search">
//               <i className="material-icons">close</i>
//             </div>
//           </div>
//           {/* #END# Search Bar */}
//           {/* Top Bar */}
//           <Header />
//           {/* #Top Bar */}
//           <section>
//             {/* Left Sidebar */}
//             <Sidebar />
//             {/* #END# Right Sidebar */}
//           </section>
//           <section className="content">
//             <div className="container-fluid">
//               <div className="block-header"></div>
//               {/* Widgets */}
//               <div className="row clearfix">
//                 <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
//                   <div className="card">
//                     <div className="header">
//                       <h2>My Lookups</h2>
//                       <p></p>
//                       <Link to="/addedit-lookup">
//                       <button title="Add Lookups" type="button" class="btn bg-indigo btn-circle waves-effect waves-circle waves-float">
//                                     <i class="material-icons">add</i>
//                                 </button>
//                                 </Link>
//                       <ul class="header-dropdown m-r--5">
                      
//                             </ul>
//                     </div>
//                     <div className="body">
//                       <div className="table-responsive">
//                       <DataTable
//                             title="My Lookups"
//                             columns={columns}
//                             data={users.data}
//                             highlightOnHover
//                             pagination
//                             paginationServer
//                             paginationTotalRows={users.total}
//                             paginationPerPage={countPerPage}
//                             paginationComponentOptions={{
//                             noRowsPerPage: true
//                             }}
//                             onChangePage={page => setPage(page)}
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               {/* #END# Widgets */}

//               <div className="row clearfix"></div>
//             </div>
//           </section>
//         </div>
//       </>
//     )
// }

// export default Lookups
