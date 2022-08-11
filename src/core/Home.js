import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import { getProducts } from './apiCore'
import Card from './Card'
import Search from "./Search";

const Home = () => {
    const [getProductBySell, setProductBySell] = useState([]);
    const [getProductByArrival, setProductByArrival] = useState([]);
    const [error, setError] = useState('');

    const productBySell = ()=> {
        getProducts('sold')
            .then(data => {
                if (data.error) {
                setError(true)
                } else {
                    setProductBySell(data)
                }
        })
    }

    const productByArrival = ()=> {
        getProducts('name')
            .then(data => {
                if (data.error) {
                setError(true)
                } else {
                    setProductByArrival(data)
                }
        })
    }


    useEffect(() => {
        productByArrival()
        productBySell()
    },[])

    return (
        <Layout title="HOME" description="ECOMMERCE APP WITH NODE AND EXPRESS" className="container-fluid">
            <Search />
            <h2>New Products</h2>
            <div className="row">
                {getProductBySell.map((product, index) => (
                   <div   key={index} className='col-4 mb-3 productCard'>
                     <Card product={product} />
                    </div>
                ))}
             </div>
            <hr />
            <br />
            
            <h2>Best Sellers</h2>
            <div className="row">
                {getProductByArrival.map((product, index) => (
                   <div  key={index} className='col-4 mb-3 productCard'>
                        <Card  product={product} />
                    </div>
                ))}
             </div>
        </Layout>
    )
}
export default Home;