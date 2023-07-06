import "./App.css";
import { useEffect, useState } from "react";
import Header from "./component/layout/Header/Header.js";
import {BrowserRouter as Router,Route, Routes} from "react-router-dom";
import Webfont from "webfontloader";
import React from "react";
import Footer from "./component/layout/Footer/Footer.js";
import Home from "./component/Home/Home.js"
import ProductDetails from "./component/Product/ProductDetails"
import Products from "./component/Product/Products.js"
import Search  from "./component/Product/Search.js"
import LoginSignup from "./component/Users/LoginSignup";
import store from "./store";
import { loadUser } from "./actions/userAction";
import UserOptions from "./component/layout/Header/UserOptions";
import { useSelector } from "react-redux";
import Profile from "./component/Users/Profile";
import ProtectedRoute from "./component/Route/ProtectedRoute.js";
import Cart from "./component/Cart/Cart";
import  Shipping  from "./component/Cart/Shipping";
import ConfirmOrder from "./component/Cart/confirmOrder";
import axios from "axios";
import Payment from "./component/Cart/Payment.js";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

function App(){
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }

  React.useEffect(()=>{
    Webfont.load({
      google : {
        families : ["Roboto","Droid Sans" ,"Chilanka"]
      }
    })
    store.dispatch(loadUser());

    getStripeApiKey();

  },[])
  
  return(
    <Router>
      <Header/>
          {isAuthenticated && <UserOptions user={user} />}

        {stripeApiKey && (
        <Elements stripe={loadStripe(stripeApiKey)}>
          <Routes>
          <Route exact path="/process/payment" Component={Payment} />
          </Routes>
        </Elements>
        )}

      <Routes>
        <Route exact path = "/" Component={ Home }/>
        <Route exact path = "/products/:id" Component={ProductDetails}/>
        <Route exact path = "/allproducts" Component={Products}/>
        <Route exact path = "/search" Component={Search}/>
        <Route exact path = "/product/:keyword" Component={Products}/>
        <Route exact path = "/login" Component={LoginSignup}/>
        <Route exact path="/account" Component={ Profile } />
        <Route exact path="/cart" Component={Cart} />
        <Route exact path="/shipping" Component={Shipping} />
        <Route exact path="/order/confirm" Component={ConfirmOrder} />
       </Routes>
    
      <Footer/>
    </Router>
  );
}

export default App;
