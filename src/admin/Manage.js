import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { getProducts, updateProduct, deleteProduct } from "../admin/ApiAdmin";
import { isAuthenticated } from '../auth'
import Layout from "../core/Layout";

const Manage = () => {
    const [product,setProduct] = useState([])

    const { _user, token } = isAuthenticated()
    
    const loadProduct = () => {
        getProducts().then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                setProduct(data)
            }
        })
    }


    const destory = (productId) => {
        deleteProduct(productId, _user._id, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                loadProduct()
            }
        })
    }

    useEffect(() => {
        loadProduct()
    },[])
    return (
        <Layout
            title="Manage Product"
            description="Update and Delete product"
            className="container-fluid"
        >
            <div className="row">
                <div className="col-12">
                    <h2 className="text-center">Total {product.length} Product</h2>
                    <hr/>
                    <u className="list-group">
                        {product.map((p, i) => {
                            return <li key={i} className="list-group-item d-flex justify-content-between align-items-center">
                                <strong>{p.name}</strong>
                                <Link to={`/admin/product/update/${p._id}`} >
                                    <span className="badge badge-warning badge-pill">Update</span>
                                </Link>
                                <span onClick={() => destory(p._id)} style={{ cursor: "pointer"}} className="badge badge-danger badge-pill">Delete</span>
                            </li>
                        })}
                    </u>
                </div>
            </div>
        </Layout>)
}

export default Manage;