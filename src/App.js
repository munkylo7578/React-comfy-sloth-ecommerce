import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Navbar, Sidebar, Footer } from "./components";

import {
  Home,
  About,
  Cart,
  Checkout,
  Error,
  PrivateRoute,
  SingleProduct,
  Products,
} from "./pages";
import AuthWrapper from "./pages/AuthWrapper";
console.log(process.env.REACT_APP_AUTH_DOMAIN)
function App() {
  return (
    <AuthWrapper>
      <Router>
      <Navbar />
      <Sidebar />
      <Switch>
        <Route exact={true} path="/">
          <Home />
        </Route>
        <Route exact={true} path="/about">
          <About />
        </Route>
        <Route exact={true} path="/cart">
          <Cart />
        </Route>
        <Route exact={true} path="/products">
          <Products />
        </Route>
        <Route exact={true} path="/products/:id" children={<SingleProduct />} />
        <PrivateRoute exact path='/checkout'>
          <Checkout />
        </PrivateRoute>
        <Route path='*'>
          <Error /> 
        </Route>
      </Switch>
      <Footer />
    </Router>
    </AuthWrapper>
    
  );
}

export default App;
