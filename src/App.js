import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import "./App.css";

import Navbar from "./components/Navbar/Navbar";
import Products from "./components/Products/Products";
import Cart from "./components/Cart/Cart";
import { Container } from "semantic-ui-react";

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <Container>
          <Switch>
            <Route exact path="/" component={Products} />
            <Route exact path="/cart" component={Cart} />
          </Switch>
        </Container>
      </div>
    </Router>
  );
}


export default App;
