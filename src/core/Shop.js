import React, { useEffect, useState } from 'react';
import Layout from "./Layout"
import { getCategories, getFilterProduct } from './apiCore';
import CheckBox from './CheckBox';
import { price } from './fixedPrice';
import Radio from './Radio';
import Card from './Card';

const Shop = () => {
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(false);
    const [limit, setLimit] = useState(6);
    const [skip, setSkip] = useState(0);
    const [size, setSize] = useState(0)
    const [filterData, setFilterData] = useState([]);

    const [myFilters, setMyFilters] = useState({
        filters: { category: [], price: [] }
    })


    const init = () => {
        getCategories().then(data => {
            if (data.error) {
                setError(true)
            } else {
                setCategories(data)
            }
        })
    }
    

    const loadFilterResult = newFilters => {
        getFilterProduct(limit, skip, newFilters)
            .then(data => {
                if (data.error) {
                    setError(true);
                } else {
                    setFilterData(data.data);
                    setSize(data.size);
                    setSkip(0)
                }
            })
    }


    const loadMore = () => {
        let toSkip = limit + skip;

        getFilterProduct(limit, toSkip, myFilters.filters)
            .then(data => {
                if (data.error) {
                    setError(data.error);
                } else {
                    setFilterData([...filterData, ...data.data]);
                    setSize(data.size);
                    setSkip(toSkip);
                }
            })
    }

    const loadMoreButton = () => {
        return (size > 0 && size >= limit && (
            <button onClick={loadMore} className='btn btn-warning'>Load More</button>
        )
    )}
    useEffect(() => {
        init();
        loadFilterResult(limit,skip,myFilters.filters)
    }, [])


    const handleFilter = (filter, filterBy) => {
        const newFilters = { ...myFilters }
        newFilters.filters[filterBy] = filter;
        
        if (filterBy === 'price') {
            let priceValue = handlePrice(filter)
            newFilters.filters[filterBy] = priceValue;
        }
        
        loadFilterResult(myFilters.filters);
        setMyFilters(newFilters);

        
    }

    const handlePrice = value => {
        let data = price;
        let array = [];

        for (let key in data) {
            if (data[key]._id === parseInt(value)) {
                array = data[key].array
            }
        }

        return array;
    }
    
    return (<Layout title="Shop page" description="list and find product" className="container-fluid">
        <div className="row">
            <div className="col-4">
                <h4>Filter by category</h4>
                <ul>
                <CheckBox categories={categories} handleFilter={filter=> handleFilter(filter,"category")} />
                </ul>

                <h4>Filter by price</h4>
                <div>
                <Radio price={price}  handleFilter={filter=> handleFilter(filter,"price")}/>
                </div>
            </div>
            <div className="col-8">
                <h2 className='mb-4'>Products</h2>
                <div className="row">
                    {filterData.length > 0 ? filterData.map((product, index) => (
                        <div key={index} className= "col-4">
                        <Card  product={product} />
                        </div>
                    )) : <h2>No Product Found</h2> }
                    
                </div>
                    {loadMoreButton()}

            </div>
        </div>
    </Layout>)
}

export default Shop;