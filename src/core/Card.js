import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import ShowImage from './ShowImage';
import moment from 'moment';
import {addItem, updateItems, removeItems} from './cartHelpers';

const Card = ({
    product,
    showProductButton = true,
    showAddCartButton = true,
    updateCart = false,
    showRemoveProductButton = false,
    setRun = f => f,
    run = undefined }) => {
    const [redirect, setRedirect] = useState(false);
    const [count, setCount] = useState(product.count);


    const productButton = () => (
           showProductButton && (<Link to={`/product/${product._id}`} >
           <button className='btn btn-outline-primary mr-3 mb-2'>
               View product
           </button>
       </Link>)
    )

    const addToCart = () => {
        addItem(product, () => {
            setRedirect(true)
        })
    }

    const shouldRedirect = redirect => {
        if (redirect) {
            return <Redirect to="/cart" />
        }
    }
    const addToCartButton = showAddCartButton => (
        showAddCartButton && (
            <button onClick={addToCart} className='btn btn-outline-warning mb-2'>Add to cart</button>
        )
    )

    const removeButton = showRemoveProductButton => (
        showRemoveProductButton && (
            <button onClick={() => {
                removeItems(product._id)
                setRun(!run)
            }} className='btn btn-outline-danger mb-2'>Remove Product</button>
            
        )
    )
    
     
    const handleChange = productId => event => {
        setRun(!run)
        setCount(event.target.value < 1 ? 1 : event.target.value);
        if (event.target.value >= 1) {
            updateItems(productId, event.target.value)
        }
    }

    const showUpdateCart = updateCart => (
        updateCart &&
        (
            <div>
                <div className='input-group mb-3'>
                    <div className='input-group-prepend'>
                        <span className='input-group-text'>
                            Adjust Quantity
                        </span>
                    </div>
                    <input
                        type='number'
                        className='form-control'
                        value={count}
                        onChange={handleChange(product._id)}
                    />
            </div>

            </div>)
    )
    const showStock = () => (
        product.quantity > 0 ?( <span className='badge badge-primary badge-pill mb-2'>In Stock</span>
        ):
          (  <span className='badge badge-primary badge-pill  mb-2'>Out of Stock</span>)
    )
       return ( <div className='card'>
            <div className="card-header name">{product.name}</div>
           <div className='card-body'>
               {shouldRedirect(redirect)}
                <ShowImage item={product} url="product" />
                <p className='lead mt-2'>{product.description.substring(0,50)}</p>
               <p className='black-10'>${product.price}</p>
               <p className='black-8'>category: {product.category && product.category.name}</p>
               {/* <p className='black-9'>Add on {moment(product.category.createdAt).fromNow()}</p> */}
               {showStock()}
               <br />
                {productButton()}
               {addToCartButton(showAddCartButton)}
               {removeButton(showRemoveProductButton)}
               {showUpdateCart(updateCart)}
            </div>
        </div>)
    
}

export default Card;