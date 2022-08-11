import React from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from '../auth';
import { Link } from "react-router-dom";


const Dashboard = () => {

    const { _user:{_id,name,email,role} }  = isAuthenticated();
    

    const userLink = () => (
        <div className="card mb-5">
            <h4 className="card-header">User link</h4>
            <ul className="list-group">
                <li className="list-group-item">
                    <Link to="/cart" className="nav-link">My Cart</Link>
                </li>
                <li className="list-group">
                    <Link to={`/profile/${_id}`} className="nav-link">Update Profile</Link>
                </li>
            </ul>
        </div>
    )
    const userInfo = () => (
        <div className="card mb-5 ">
                <h3 className="card-header">User Information</h3>
                <ul className="list-group">
                    <li className="list-group-item">{name}</li>
                    <li className="list-group-item">{email}</li>
                    <li className="list-group-item">{role === 1 ? "Admin" : "Registered User"}</li>
                </ul>
            </div>
    )

    const purchaseHistory = () => (
        <div className="card mb-5">
        <h3 className="card-header">Purchase history</h3>
        <ul className="list-group">
            <li className="list-group-item">Purchase history</li>
        </ul>
    </div>
    )
    return (<div>
        <Layout title="DASHBOARD" description={`G'day ${name}` }className="container-fluid" >
            <div className="row">
                <div className="col-3">
                    {userLink()}
                </div>
                <div className="col-9">
                    {userInfo()}
                    {purchaseHistory()}
                </div>
            </div>
        </Layout>
    </div>)
   
}

export default Dashboard;