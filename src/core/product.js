import React, {useEffect, useState} from "react";
import { listRelatedProduct, loadProduct } from "./apiCore";
import Card from "./Card";
import Layout from "./Layout";

const Product = (props) => {
    const [product, setProduct] = useState({});
    const [relatedProduct,setRelatedProduct] = useState([])
    const [error, setError] = useState(false);

    const productId = props.match.params.productId;

    const loadDetailProduct = Id => {
        loadProduct(Id).then(data => {
            if (data.error) {
                setError(data.error)
            } else {
                setProduct(data)
                listRelatedProduct(productId)
                    .then(response => {
                        if (response.error) {
                        setError(response.error)
                        } else {
                            setRelatedProduct(response)
                        }
                        
                })
               
            }
        })
    }

    useEffect(() => {
        loadDetailProduct(productId)
    }, [props])

    return (<Layout title={product && product.name}
        description={product && product.description && product.description.substring(0, 100)}
        className="container-fluid" 
        >
        <div className="row ">
            <div className="col-8">
            {
            product &&
            product.description &&
            (<Card product={product} showProductButton={false} />)
        }
            </div>
            <div className="col-4">
            <h3>Related Product</h3>
            {relatedProduct.map((p, index) => (
                        <Card key={index} product={p} />
                ))}
            </div>
       
        </div>
    </Layout>
        
        )
}

export default Product;