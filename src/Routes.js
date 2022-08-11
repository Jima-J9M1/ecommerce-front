import React from "react";
import { BrowserRouter, Route,Switch } from 'react-router-dom';
import PrivateRoute from "./auth/PrivateRouter";
import Home from "./core/Home";
import Dashboard from "./users/UserDashboard";
import AdminDashboard from "./users/AdminDashboard";
import Signin from "./users/Signin";
import Signup from "./users/Signup";
import AdminRoute from "./auth/AdminRouter";
import AddCategory from "./admin/AddCategory";
import AddProduct from "./admin/AddProduct";
import updateProduct from "./admin/updateProduct";
import Shop from './core/Shop';
import Product from "./core/product";
import Cart from './core/Cart'
import Profile from './users/Profile'
import Manage from './admin/Manage'
import Order from './admin/Order'


const Routes = () => {
    return (
        <BrowserRouter>
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/shop"  exact component={Shop}/>    
            <Route path="/signup"  exact component={Signup}/>
            <Route path="/signin" exact component={Signin} />
            <Route path="/cart" exact component={Cart} />  
            <AdminRoute path='/admin/orders' exact component={Order} />     
            <AdminRoute path='/product/manage' exact component={Manage} />    
            <PrivateRoute path="/user/dashboard" exact component={Dashboard} />
            <AdminRoute path='/admin/dashboard' exact component={AdminDashboard} />
            <AdminRoute path='/category/create' exact component={AddCategory} />
            <AdminRoute path='/product/create' exact component={AddProduct} />    
            <AdminRoute path='/admin/product/update/:productId' exact component={updateProduct} />   
            <Route path="/product/:productId" exact component={Product} />   
            <PrivateRoute path="/profile/:userId" exact component={Profile} />
                
                
              
                
        </Switch>
    </BrowserRouter>)
    
}

export default Routes;