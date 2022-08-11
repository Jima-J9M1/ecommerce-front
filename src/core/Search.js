import React, {useState, useEffect} from 'react';
import { getCategories,list} from './apiCore';
import Card from './Card';

const Search = () => {
    const [data, setData] = useState({
        categories: [],
        category: "",
        search: "",
        searched: false,
        searchedResult:[],
    })


    const { categories, category, searched, search, searchedResult } = data;

    const loadCategories = () => {
        getCategories().then(response => {
            if (response.error) {
                console.log(response.error)
            } else {
                setData({ ...data, categories: response })
            }
        })
    }
    
    useEffect(() => {
        loadCategories();
    }, [])
    

    const searchData = () => {
        if (search) {
            list({ search: search || undefined, category: category })
                .then(response => {
                    if (response.error) {
                        console.log(response.error);
                    } else {
                        setData({ ...data, searchedResult: response,searched:true })
                        console.log(response);
                }
            })
        }
    }

    const clickSearch = (e) => {
        e.preventDefault();
        searchData()

    }
    

   const handleChange = name => event => {
        setData({...data, [name]:event.target.value,searched:false})
    }
    const searchForm = () => (
        <form className=' mb-5' onSubmit={clickSearch}>
            <span className='input-group-text' >
                <div className='input-group input-group-lg'>
                    <div className='input-group-prepend'>
                        <select className='btn mr-2' onChange={handleChange('category')}>
                            <option value="All">Pick category</option>
                        {categories.map((c, i) => (
                            <option key={i} value={c._id}>{c.name}</option>
                        ))}
                    </select>
                    </div>
                    <input 
                        type="search"
                        onChange={handleChange('search')}
                        className='form-control'
                        placeholder='Search by name'
                    />
                </div>
                <div className='btn input-group-append' style={{border:"none"}}>
                    <button className='input-group-text'>Search</button>
                </div>
            </span>
        </form>
    )
    const searchedMessage = (searched, result) => {
        if (searched && result.length > 0) {
            return `Found ${result.length} products`;
        }
        if (searched && result.length < 1) {
            return `Found no products`;
       }
   }
    const productSearch = (result = []) => (
        <div>
            <div className='mt-4 mb-4'>
                <h2>
                {searchedMessage(searched, searchedResult)}
                </h2>
            </div>
            <div className='row'>
            
            {searchedResult.map((product, index) => (
            <div className='col-4'>
                <Card product={product} key={index} />
            </div>
        ))}
            
            </div>
        </div>
    )
    

    return (<div>
        <h2>{searchForm()}</h2>
        <div className='container-fluid mb-3'>
            {productSearch(searchedResult)}
            </div>
        
    </div>)
}

export default Search;