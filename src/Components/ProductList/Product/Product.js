import React, { Component } from "react";
import "./Product.css";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

class Product extends Component {
  state = { showCartButton: false };
  render() {
    let cur = null;
    if (this.props.data) {
      cur = this.props.data.prices.find((x) => {
        return x.currency.label === this.props.currentCurrency.label;
      });
    }
    let inStock = { opacity: "1" };
    if (!this.props.data.inStock) {
      inStock = { opacity: 0.5 };
    }
    return (
      <div
        className="Product"
        onClick={this.props.productClicked}
        style={inStock}
        onMouseEnter={() => this.setState({ showCartButton: true })}
        onMouseLeave={() => this.setState({ showCartButton: false })}
      >
        {this.state.showCartButton && this.props.data.inStock ? (
          <button
            className="shoppingCart"
            onClick={this.props.shoppingCartClick}
          >
            <FaShoppingCart />
          </button>
        ) : null}

        <Link to="/PDP">
          <img src={this.props.data.gallery[0]} />
          {!this.props.data.inStock ? (
            <p className="outOfStock">Out Of Stock</p>
          ) : null}
        </Link>
        <div className="Product-name-price">
          <Link to="/PDP">
            <span>{this.props.data.name}</span>
            {cur ? (
              <strong>
                {cur.amount}
                {cur.currency.label}
                {cur.currency.symbol}
              </strong>
            ) : null}
          </Link>
        </div>
      </div>
    );
  }
}

export default Product;
