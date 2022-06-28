import React, { Component } from "react";
import Product from "./Product/Product";
import "./ProductListPage.css";

class ProductListPage extends Component {
  render() {
    return (
      <div className="ProductListPage">
        {this.props.category.products
          ? this.props.category.products.map((x) => {
              return (
                <Product
                  shoppingCartClick={() => this.props.shoppingCartClick(x)}
                  productClicked={() => this.props.productClicked(x.id)}
                  key={x.id}
                  data={x}
                  currentCurrency={this.props.currentCurrency}
                />
              );
            })
          : null}
      </div>
    );
  }
}

export default ProductListPage;
