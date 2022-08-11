import React, { useState } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from '../auth';
import Layout from "../core/Layout";
import {AdminCategory} from './ApiAdmin';
const AddCategory = () => {
    const [name, setname] = useState('');
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    
    const { _user, token } = isAuthenticated();
    
    
    const eventHandle = (e) => {
        setError(false);
        setname(e.target.value);
    }
    
    const clickSubmit = (e) => {
        e.preventDefault();
        setError('');
        setSuccess(false);
        console.log(token);
        AdminCategory(_user._id, token, {name})
            .then(data => {
                if (data.error) {
                    setError(true)
                } else {
                    setError('');
                    setSuccess(true)
            }
        })
    }


    const showError = () => {
        if (error)
            return <h3 className="text-danger">Category should be unique</h3>
    }

    const showSuccess = () => {
        if (success)
         return   <h3 className="text-success">{name} is created</h3>
    }

    const goBack = () => (
        <div className="mt-5">
            <Link to="/admin/dashboard" className="text-warning">
                Back to Dashboard
            </Link>
        </div>
    )

    const createCategoryForm = () => (
        <form onSubmit={clickSubmit}>
            <div className="group-form">
                <label className="text-muted">Name</label>
                <input
                    className="form-control"
                    onChange={eventHandle}
                    value={name}
                    autoFocus
                    required
                />
            </div>
            <button className="btn btn-outline-primary mt-3">Create Category</button>
       </form>
    )

    return (
            <Layout title="Add Category" description={`G'day ${_user.name},ready to create Category?`} >
                <div className="row">
                <div className="col-md-8 offset-md-2">
                    {showError()}
                    {showSuccess()}
                    {createCategoryForm()}
                    {goBack()}
                    </div>
               </div>
            </Layout>
    )
}


export default AddCategory;