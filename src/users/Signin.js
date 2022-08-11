import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { signIn,authenticate, isAuthenticated } from "../auth"
import Layout from "../core/Layout";


const Signin = () => {
    const [values, setValues] = useState({
        email: "daniel@gmail.com",
        password: "ddddd1",
        error: "",
        loading: false,
        redirectToReference:false
})
    
    
    const { email, password, error, loading, redirectToReference } = values;
    const { _user } = isAuthenticated();

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: false, loading: true });
        
        signIn({ email, password })
            .then((data) => {
                if (data.error) {
                    setValues({...values, error:data.error, loading:false})
                } else {
                    authenticate(
                        data,
                        () => {
                        setValues({
                            ...values,
                            redirectToReference:true
                        })
                    })
                  
                }
        })
        
    }

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    )
    
    const showLoading = () => (
        loading && (<div className="alert alert-info"><h2>Loading...</h2></div>)
    )


    const redirect = () => {
        if (redirectToReference) {
            if (_user && _user.role === 1) {
                return <Redirect to="/admin/dashboard" />
            } else {
                return <Redirect to="/user/dashboard" />
            }
        }
        if (isAuthenticated()) {
            return <Redirect to="/" />
        }
    }
    const eventHandler = name => event => {
        setValues({...values,error:false,[name]:event.target.value})
    }
    const signInForm = () => (
        <form>
            <div className="group-form">
                <label className="text-muted">Email</label>
                <input type="email" className="form-control"
                    onChange={eventHandler('email')}
                    value={email} />
            </div>
            <div className="group-form">
                <label className="text-muted">Password</label>
                <input type="password" className="form-control"
                    onChange={eventHandler('password')}
                    value={password} />
            </div>
            <button onClick={clickSubmit} className="btn btn-primary mt-3">Signin</button>
        </form>
    )

    return (<div>
         <Layout
            title="SIGNIN"
            description="SIGNIN TO ECOMMERCE APP"
            className="container col-md-8 offset-md-2"
        >
            {showError()}
            {showLoading()}
            {signInForm()}
            {redirect()}
        </Layout>
        
    </div>)
}

export default Signin;