import React, { useEffect, useState } from "react";
import {Redirect} from 'react-router-dom'
import Layout from "../core/Layout";
import { isAuthenticated } from '../auth';
import { read, update, updateUser } from "./ApiUser";


const Profile = ({match}) => {
     
    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        error: false,
        success:false
    })

    const { name, email, password, error, success } = values;
    const token = isAuthenticated().token;  



    const init = (userId) => {
        read(userId,token).then(response => {
            if (response.error) {
               console.log(response.error)
            } else {
                setValues({ ...values, name: response.name, email: response.email, error: false, success:false});
           }
       }) 
    }

    useEffect(() => {
        init(match.params.userId); 
    },[])

    const handleChange = name => event => {
        setValues({...values,error:false,[name]:event.target.value})
    }

    const clickSubmit = (e) => {
        e.preventDefault()
        update(match.params.userId, token,{name,email,password}).then(data => {
            if (data.err) {
                setValues({...values,error:true})
            } else {
                updateUser(data, (err,res) => {
                    setValues({...values,name:data.name,email:data.email,success:true})
                })
            }
        })
    }

    const redirectToCart = (success) => {
        if (success) {
            return <Redirect to="/cart" />
        }
    }
    const profile = (name,email,password) => {
        return <form className="mb-3" onSubmit={clickSubmit}>
                <div className="group-form">
                    <label className="text-muted">Name</label>
                    <input
                        type="text"
                        onChange={handleChange("name")}
                        value={name}
                        className="form-control" />
                </div>
    
                <div className="group-form">
                    <label className="text-muted">E-mail</label>
                    <input
                        type="text"
                        onChange={handleChange("email")}
                        value={email}
                        className="form-control" />
                </div>
    
                <div className="group-form">
                    <label className="text-muted">Password</label>
                    <input
                        type="text"
                        onChange={handleChange("password")}
                        value={password}
                        className="form-control" />
                </div>
                <button className="btn btn-primary mt-3">Submit</button>
            </form>
}
    return (
        <Layout title={`G'day ${values.name} `} description="User Profile" className="container">
            {profile(name, email, password)}
            {redirectToCart(success)}
    </Layout>)
}

export default Profile;