import React, { useState, useEffect } from 'react';
import { getProducts, getBraintreeClientToken, processPayment, createOrder } from './apiCore';
import { emptyCart } from './cartHelpers';
import Card from './Card';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
// import "braintree-web"; // not using this package
import DropIn from 'braintree-web-drop-in-react';

const CheckOut = ({ product, setRun = f => f, run = undefined }) => {
    const [data, setData] = useState({
        loading: false,
        success: false,
        clientToken: null,
        error: '',
        instance: {},
        address: ''
    });

    const userId = isAuthenticated() && isAuthenticated()._user._id;
    const token = isAuthenticated() && isAuthenticated().token;

    const getToken = (userId, token) => {
        getBraintreeClientToken(userId, token).then(data => {
            if (data.error) {
                console.log(data.error);
                setData({ ...data, error: data.error });
            } else {
                console.log(data);
                setData({ clientToken: data.clientToken });
            }
        });
    };

    useEffect(() => {
        getToken(userId, token);
    }, []);

    const handleAddress = event => {
        setData({ ...data, address: event.target.value });
    };

    const getTotal = () => {
        return product.reduce((currentValue, nextValue) => {
            return currentValue + nextValue.count * nextValue.price;
        }, 0);
    };

    const showCheckout = () => {
        return isAuthenticated() ? (
            <div>{showDropIn()}</div>
        ) : (
            <Link to="/signin">
                <button className="btn btn-primary">Sign in to checkout</button>
            </Link>
        );
    };

    const deliveryAddress = data.address;
    const buy = () => {
        setData({ loading: true });

        let nonce;
        let getNonce = data.instance.requestPaymentMethod()
            .then(data => {
                nonce = data.nonce
                
                const paymentData = {
                    paymentMethodNonce: nonce,
                    amount: getTotal(product)
                };

                processPayment(userId, token, paymentData).then(response => {
                    if (response.error) {
                        console.log(response.error)
                    } else {
                        setData({...data,success:response.success})
                        // console.log(response)

                        const createOrderData = {
                            products: product,
                            transaction: response.transaction_id,
                            amount: response.transaction.amount,
                            Address:deliveryAddress
                       }

                        createOrder(userId, token, createOrderData)
                            .then(response => {
                                emptyCart(() => {
                                    console.log("Payment succesful empty cart");
                                    setData({
                                        loading: false,
                                        success: true
                                    });
                                    
                                })
                            })
                            .catch(err => console.log(err));
                    }
                })
            })
        .catch(err => setData({...data,error:err.message}))
    }
    // const buy = () => {
    //     setData({ loading: true });
    //     // send the nonce to your server
    //     // nonce = data.instance.requestPaymentMethod()
    //     let nonce;
    //     let getNonce = data.instance
    //         .requestPaymentMethod()
    //         .then(data => {
    //             // console.log(data);
    //             nonce = data.nonce;
    //             // once you have nonce (card type, card number) send nonce as 'paymentMethodNonce'
    //             // and also total to be charged
    //             // console.log(
    //             //     "send nonce and total to process: ",
    //             //     nonce,
    //             //     getTotal(products)
    //             // );
    //             const paymentData = {
    //                 paymentMethodNonce: nonce,
    //                 amount: getTotal(products)
    //             };

    //             processPayment(userId, token, paymentData)
    //                 .then(response => {
    //                     console.log(response);
    //                     // empty cart
    //                     // create order

    //                     const createOrderData = {
    //                         products: products,
    //                         transaction_id: response.transaction.id,
    //                         amount: response.transaction.amount,
    //                         address: deliveryAddress
    //                     };

    //                     createOrder(userId, token, createOrderData)
    //                         .then(response => {
    //                             emptyCart(() => {
    //                                 setRun(!run); // run useEffect in parent Cart
    //                                 console.log('payment success and empty cart');
    //                                 setData({
    //                                     loading: false,
    //                                     success: true
    //                                 });
    //                             });
    //                         })
    //                         .catch(error => {
    //                             console.log(error);
    //                             setData({ loading: false });
    //                         });
    //                 })
    //                 .catch(error => {
    //                     console.log(error);
    //                     setData({ loading: false });
    //                 });
    //         })
    //         .catch(error => {
    //             // console.log("dropin error: ", error);
    //             setData({ ...data, error: error.message });
    //         });
    // };

    const showDropIn = () => (
        <div onBlur={() => setData({ ...data, error: '' })}>
            {data.clientToken !== null && product.length > 0 ? (
                <div>
                    <div className="gorm-group mb-3">
                        <label className="text-muted">Delivery address:</label>
                        <textarea
                            onChange={handleAddress}
                            className="form-control"
                            value={data.address}
                            placeholder="Type your delivery address here..."
                        />
                    </div>

                    <DropIn
                        options={{
                            authorization: data.clientToken,
                            paypal: {
                                flow: 'vault'
                            }
                        }}
                        onInstance={instance => (data.instance = instance)}
                    />
                    <button onClick={buy} className="btn btn-success btn-block">
                        Pay
                    </button>
                </div>
            ) : null}
        </div>
    );

    const showError = error => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    const showSuccess = success => (
        <div className="alert alert-info" style={{ display: success ? '' : 'none' }}>
            Thanks! Your payment was successful!
        </div>
    );

    const showLoading = loading => loading && <h2 className="text-danger">Loading...</h2>;

    return (
        <div>
            <h2>Total: ${getTotal()}</h2>
            {showLoading(data.loading)}
            {showSuccess(data.success)}
            {showError(data.error)}
            {showCheckout()}
        </div>
    );
};

export default CheckOut;







// import React,{useState,useEffect} from "react";
// import { Link } from "react-router-dom";
// import {isAuthenticated} from '../auth'
// import { getBraintreeClientToken } from "./apiCore";
// // import DropIn from 'braintree-react'
// import DropIn from 'braintree-web-drop-in-react'



// const CheckOut = ({ product }) => {
    
//     const [data, setData] = useState({
//         clientToken: "",
//         error: '',
//         instance: {},
//         address: '',
//         success:false
//     })


//     const userId = isAuthenticated() && isAuthenticated()._user._id;
//     const token = isAuthenticated() && isAuthenticated().token;

//     const getToken = () => {
//         getBraintreeClientToken(userId, token)
//             .then(response => {
//                 if (response.error) {
//                     setData({
//                     ...data, error:response.error
//                 })
//                 } else {
//                     setData({
//                         ...data, clientToken:response
//                     })
//             }
//         })
//     }


//     useEffect(() => {
//         getToken(); 
//     }, [])
    


//     const getTotal = () => {
//         return product.reduce((currentValue, nextValue) => {
//             return currentValue + nextValue.count * nextValue.price;
//         },0)
//     }

//     const showDrop = () => (
//         <div>
//             {data.clientToken !== null && product.length > 0 ? (
//                 <div>
//                     <DropIn
//                         options={{
//                             authorization: data.clientToken
//                             }}
//                         onInstance={instance => (data.instance = instance)}
//                     />
//                     <button className="btn btn-success">Checkout</button>
//                 </div>

//             ): null}
//         </div>
//     )

//     const showCheck = () => {
//         return isAuthenticated() ? (
//             <div>{showDrop()}</div>
//         ) : (
//             <Link to='/signin'>
//                 <button className="btn btn-primary">Signin to checkout</button>
//             </Link>
//         )
//     }

   
//     return <div>
//         <h2>Total: ${getTotal()}</h2>
//         {showCheck()}
//     </div>
// }

// export default CheckOut;