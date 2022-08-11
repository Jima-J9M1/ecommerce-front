import React, { useState } from "react";
import Layout from "../core/Layout";
import { Link } from "react-router-dom";
import { signUp } from "../auth";
const Signup = () => {

    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        error:"",
        success: false
    })

    const { name, email, password,error,success } = values;

    const eventHandler = name => event => {
        setValues({...values,error:false,[name]:event.target.value})
    }

    const clickSubmit = (event) => {
        event.preventDefault();
        setValues({...values,error:false})
        signUp({ name, email, password })
            .then(data => {
                if (data.error) {
                    setValues({
                    ...values,error:data.error,success:false
                })
                } else {
                    console.log(data)
                    setValues({
                        ...values,
                        name: "",
                        email: "",
                        password: "",
                        error: "",
                        success:true
                    })
            }
        })
    }

    const showSuccess = () => (
        <div className="alert alert-info" style={{ display: success ? "" : "none" }}>
        New account is created. please <Link to='/signin'>Signin</Link>    
        </div>
    )

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? "" : "none" }}>
            {error}
        </div>
    )
    const singUpForm = () => (
        <form>
            <div className="group-form" >
                <lable className="text-muted">Name</lable>
                <input type="text" className="form-control"
                    value={name} onChange={eventHandler("name")} />
            </div>

            <div className="group-form" >
                <lable className="text-muted">Email</lable>
                <input type="email" className="form-control"
                    value={email} onChange={eventHandler("email")} />
            </div>
            
            <div className="group-form" >
                <lable className="text-muted">Password</lable>
                <input type="password" className="form-control"
                    value={password} onChange={eventHandler("password")} />
            </div>

            <button onClick={clickSubmit} className="btn btn-primary mt-3">Signup</button>
        </form>
    )


    return (<div>
        <Layout
            title="SIGNUP" 
            description="SIGNUP TO ECOMMERCE APP"
            className="container col-md-8 offset-md-2"
        >
             {showError() }
             {showSuccess() }
            {singUpForm()}
        </Layout>
    </div>)
}

export default Signup;