import React from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from '../auth';
import { Link } from "react-router-dom";


const AdminDashboard = () => {

    const { _user:{_id,name,email,role} }  = isAuthenticated();
    

    const adminLink = () => (
        <div className="card mb-5">
            <h4 className="card-header">Admin link</h4>
            <ul className="list-group">
                <li className="list-group-item">
                    <Link to="/category/create" className="nav-link">Create Category</Link>
                </li>
                <li className="list-group-item">
                    <Link to="/product/create" className="nav-link">Create Product</Link>
                </li>
                <li className="list-group-item">
                    <Link to="/product/manage" className="nav-link">Manage Product</Link>
                </li>
                <li className="list-group-item">
                    <Link to='/admin/orders' className="nav-link">List Order</Link>
                </li>
            </ul>
        </div>
    )
    const adminInfo = () => (
        <div className="card mb-5 ">
                <h3 className="card-header">User Information</h3>
                <ul className="list-group">
                    <li className="list-group-item">{name}</li>
                    <li className="list-group-item">{email}</li>
                    <li className="list-group-item">{role === 1 ? "Admin" : "Registered User"}</li>
                </ul>
            </div>
    )

    return (<div>
        <Layout title="DASHBOARD" description={`G'day ${name}` }className="container-fluid" >
            <div className="row">
                <div className="col-3">
                    {adminLink()}
                </div>
                <div className="col-9">
                    {adminInfo()}
                </div>
            </div>
        </Layout>
    </div>)
   
}

export default AdminDashboard;