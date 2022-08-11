import React, { useEffect, useState } from "react";
import { isAuthenticated } from '../auth';
import Layout from "../core/Layout";
import { createProduct,getCategories } from "./ApiAdmin";


const AddProduct = () => {
    const [values, setValues] = useState({
        name: "",
        description: "",
        price: "",
        quantity: "",
        categories: [],
        category: "",
        photo: "",
        loading: "",
        shipping: false,
        error: false,
        success: false,
        redirectToRef: false,
        createdProduct: "",
        formData: ""

    })

    const {
        name,
        description,
        price,
        quantity,
        categories,
        category,
        shipping,
        loading,
        error,
        redirectToRef,
        createdProduct,
        formData
    } = values



    const init = () => {
        getCategories()
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error })
                } else {
                    setValues({
                        ...values,
                        categories: data,
                        formData: new FormData()
                    })
                }
            })
    }
    useEffect(() => {
        init();
    }, [])

    const handleChange = name => event => {
        const value = name === "photo" ? event.target.files : event.target.value;
        setValues({ ...values, [name]: value });
        formData.set(name, value)
    }


    const { _user, token } = isAuthenticated();


    const clickSubmit = (event) => {
        event.preventDefault();
        setValues({ ...values, error: '', loading: true });
        createProduct(_user._id, token, formData)
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error })
                } else {
                    setValues({
                        name: "",
                        description: "",
                        price: "",
                        quantity: "",
                        category: "",
                        photo: "",
                        loading: false,
                        shipping: false,
                        error: false,
                        createdProduct: data.name
                    })
                }
                
            })
    }


    const newPostForm = () => {
        return <form className="mb-3" onSubmit={clickSubmit}>
            <div className="group-form">
                <h4>Post Photo</h4>
                <label className="btn btn-secondary">
                    <input
                        type="file"
                        onChange={handleChange("photo")}
                        accept="image/*"
                        name="photo"
                    />
                </label>
            </div>
            
            <div className="group-form">
                <label className="text-muted">Name</label>
                <input
                    type="text"
                    onChange={handleChange("name")}
                    value={name}
                    className="form-control" />
            </div>

            <div className="group-form">
                <label className="text-muted">Description</label>
                <textarea
                    type="text"
                    onChange={handleChange("description")}
                    value={description}
                    className="form-control" />
            </div>

            <div className="group-form">
                <label className="text-muted">Price</label>
                <input
                    type="text"
                    onChange={handleChange("price")}
                    value={price}
                    className="form-control" />
            </div>

            <div className="group-form">
                <label className="text-muted">Category</label>
                <select
                    className="form-control"
                    onChange={handleChange('category')}
                >
                    <option>Please Select </option>
                    {categories && categories.map((category, index) => (
                        <option key={index} value={category._id}>{category.name}</option>
                    ))}
                </select>
            </div>

            <div className="group-form">
                <label className="text-muted">Shipping</label>
                <select
                    className="form-control"
                    onChange={handleChange('shipping')}
                >
                    <option>Please Select</option>
                    <option value="0">No</option>
                    <option value="1">yes</option>
                </select>
            </div>

            <div className="group-form">
                <label className="text-muted">Quantity</label>
                <input
                    type="number"
                    onChange={handleChange("quantity")}
                    value={quantity}
                    className="form-control" />
            </div>
            <button className="btn btn-outline-primary mt-3">Create Product</button>
        </form>
    }



    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>{ error }</div>
    )

    const showSuccess = () => (
        <div className="alert alert-info" style={{ display: createdProduct ? '' : 'none' }} >
            <h2>{`${createdProduct}`} is created</h2>
        </div>
    )

    const showLoading = () => (
        loading && (<div className="alert alert-info"><h3>Loading...</h3></div>)       
    )
    return (
        <Layout title="Add product" description={`G'day ${_user.name},ready to create product?`} >
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {showError()}
                    {showSuccess()}
                    {showLoading()}
                    {newPostForm()}
                </div>
           </div>
        </Layout>
)
}


export default AddProduct;