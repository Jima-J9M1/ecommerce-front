import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "./Card";
import { getCart } from "./cartHelpers";
import CheckOut from "./CheckOut";
import Layout from "./Layout";



const Cart = () => {
    const [items, setItem] = useState([]);
    const [run, setRun] = useState(false)


    useEffect(() => {
        setItem(getCart()); 
    }, [run]) 

    


    const showItem = items => (
        <div>
            <h2>Your cart has {items.length} items</h2>
            <hr/>
            {items.map((p, i) => (
                <Card key={i}
                    product={p}
                    showAddCartButton={false}
                    updateCart={true}
                    showRemoveProductButton={true}
                    setRun={setRun}
                    run={run} />
            ))}
        </div>
    )




    const noMessage = () => (
        <h2>
            your cart is empty.<br />
            <Link to='/'> GO Shopping</Link>
        </h2>
    )




    return (<Layout title="cart" description="Store the item in cart" className="container-fluid">
        <div className="row">
            <div className="col-6">
            {items.length > 0 ? showItem(items) : noMessage()}
            </div>
            <div className="col-6">
                <h3>Cart Summary</h3>
                <CheckOut product={items} />
            </div>
       </div>
         
    </Layout>)
}


export default Cart;