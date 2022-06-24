import "./App.css";
import React, { Component } from "react";
import { getCurrencies, getProductsByCategory, getCategories } from "./API";
import { BrowserRouter } from "react-router-dom";
class App extends Component {
  componentDidMount() {
    // getCurrencies
    //   .then((res) => res.json())
    //   .then((res) => {
    //     console.log(res);
    //   });
    // getCategories()
    //   .then((x) => x.json())
    //   .then((x) => console.log(x));

    getProductsByCategory("all")
      .then((x) => x.json())
      .then((x) => console.log(x));
  }
  render() {
    return (
      <BrowserRouter>
        <div className="App"></div>
      </BrowserRouter>
    );
  }
}

export default App;
