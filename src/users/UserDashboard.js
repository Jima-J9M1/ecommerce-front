import React, { useEffect, useState } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from '../auth';
import { Link } from "react-router-dom";
import { getPurchaseHistory } from "./ApiUser";
import moment from 'moment'


const Dashboard = () => {
    const [history, setHistory] = useState([])
    
    const { _user:{_id,name,email,role}, token }  = isAuthenticated();
    
    
    const init = (userId, token) => {
        getPurchaseHistory(userId, token)
            .then(data => {
                if (data.error) {
                    console.log(data.error)
                } else {
                    setHistory(data)
                }
        })
    }

    useEffect(() => {
        init(_id, token)
    },[])

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
                {
                    history.map((H, i) => (
                        <li key={i} className="list-group-item">
                            <h3>Product :  {H.products.map((p, i) => (
                                <h4 key={i}>{p.name}</h4> 
                                
                                ))}</h3>
                            <h3>Amount :  {H.amount}</h3>
                            <h3>Purchased :  {moment(H.createdAt).fromNow()}</h3>
                        </li>
                    ))
                }
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