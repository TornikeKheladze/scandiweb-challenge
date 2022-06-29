import React, { Component } from "react";
import { getCurrencies, getProductsByCategory, getSingleProduct } from "./API";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Nav from "./Components/Navigation/Nav";
import ProductListPage from "./Components/ProductList/ProductListPage";
import PDP from "./Components/PDP/PDP";
import Cart from "./Components/Cart/Cart";
import MiniCart from "./Components/MiniCart/MiniCart";
import "./App.css";
class App extends Component {
  state = {
    currentCategoryName: "all",
    currentCat: {},
    currencies: [],
    currentCurrency: null,
    pdp: null,
    chosenAttributes: null,
    cart: [],
    showMiniCart: false,
    totalCount: 0,
  };
  componentDidMount() {
    getProductsByCategory(this.state.currentCategoryName)
      .then((res) => res.json())
      .then(({ data }) => this.setState({ currentCat: data.category }));
    getCurrencies
      .then((res) => res.json())
      .then(({ data }) =>
        this.setState({
          currencies: data.currencies,
          currentCurrency: data.currencies[0],
        })
      );
  }

  onCategoryClick = (category) => {
    this.setState({ currentCategoryName: category });
    getProductsByCategory(category)
      .then((res) => res.json())
      .then(({ data }) => this.setState({ currentCat: data.category }));
  };
  onCurrenciClick = (e) => {
    const cu = this.state.currencies.find((x) => x.label === e.target.value);
    this.setState({ currentCurrency: cu });
  };
  onProductClick = (product) => {
    getSingleProduct(product)
      .then((res) => res.json())
      .then((res) => this.setState({ pdp: { ...res } }));
    this.setState({ chosenAttributes: null });
  };
  onAddCartClick = ({ data }, attributes) => {
    const productId = data.product.id;
    if (this.state.chosenAttributes) {
      if (
        data.product.attributes.length ===
        Object.values(this.state.chosenAttributes[productId]).length
      ) {
        this.setState({
          chosenAttributes: null,
          cart: [
            ...this.state.cart,
            { product: data.product, attributes, itemAmount: 1 },
          ],
        });
      } else {
        alert("Please select attributes");
      }
    } else if (data.product.attributes.length === 0) {
      this.setState({
        cart: [
          ...this.state.cart,
          { product: data.product, attributes, itemAmount: 1 },
        ],
      });
    } else {
      alert("Please select attributes");
    }
  };

  onAttributeClick = (item, id, product) => {
    const productId = product.id;
    this.setState((prevState) => {
      let previous = null;
      if (prevState.chosenAttributes) {
        previous = { ...prevState.chosenAttributes[productId] };
      }
      return {
        chosenAttributes: {
          [productId]: {
            ...previous,
            [id.id]: item,
          },
        },
      };
    });
  };
  onMiniCartCLicked = (e) => {
    this.setState({ showMiniCart: !this.state.showMiniCart });
  };
  onBackdropClick = () => {
    this.setState({ showMiniCart: false });
  };
  onViewBagClick = () => {
    this.setState({ showMiniCart: false });
  };

  addOrRemove = (e, index) => {
    const cart = this.state.cart;
    if (e.target.innerText === "+") {
      cart[index].itemAmount = this.state.cart[index].itemAmount + 1;
      cart.splice(index, 1, cart[index]);
      this.setState({ cart: cart });
    } else if (e.target.innerText === "-") {
      cart[index].itemAmount = this.state.cart[index].itemAmount - 1;
      cart.splice(index, 1, cart[index]);
      this.setState({ cart: cart });
      if (this.state.cart[index].itemAmount === 0) {
        cart.splice(index, 1);
        this.setState({ cart: cart });
      }
    }
  };
  onShoppingCartClick = (item) => {
    this.setState({
      cart: [
        ...this.state.cart,
        { product: item, attributes: null, itemAmount: 1 },
      ],
    });
  };
  total = () => {
    let total = 0;
    this.state.cart.forEach((x) => {
      let cur = x.product.prices.find((x) => {
        return x.currency.label === this.state.currentCurrency.label;
      });
      total += cur.amount * x.itemAmount;
    });
    return total.toFixed(2);
  };
  amount = () => {
    let amount = 0;
    this.state.cart.forEach((x) => {
      amount += x.itemAmount;
    });
    return amount;
  };

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Nav
            category={this.state.currentCategoryName}
            categoryClick={this.onCategoryClick}
            currenciesClicked={this.onCurrenciClick}
            currencies={this.state.currencies}
            onMiniCartCLicked={this.onMiniCartCLicked}
            amount={this.amount()}
          />
          {this.state.showMiniCart ? (
            <MiniCart
              onViewBagClick={this.onViewBagClick}
              cartData={this.state.cart}
              showMiniCart={this.state.showMiniCart}
              onBackdropClick={this.onBackdropClick}
              addOrRemove={this.addOrRemove}
              currentCurrency={this.state.currentCurrency}
              total={this.total()}
            />
          ) : null}
          <Routes>
            <Route
              path="/"
              element={
                <ProductListPage
                  shoppingCartClick={this.onShoppingCartClick}
                  productClicked={this.onProductClick}
                  name={this.state.currentCategoryName}
                  category={this.state.currentCat}
                  currentCurrency={this.state.currentCurrency}
                  onMiniCartCLicked={this.onMiniCartCLicked}
                  cart={this.state.cart}
                />
              }
            />
            <Route
              path="/PDP"
              element={
                <PDP
                  pagedata={this.state.pdp}
                  addToCart={() =>
                    this.onAddCartClick(
                      this.state.pdp,
                      this.state.chosenAttributes
                    )
                  }
                  currentCurrency={this.state.currentCurrency}
                  attributeClick={this.onAttributeClick}
                  chosenAttributes={this.state.chosenAttributes}
                />
              }
            />
            <Route
              path="/cart"
              element={
                <Cart
                  amount={this.amount()}
                  onViewBagClick={this.onViewBagClick}
                  cartData={this.state.cart}
                  showMiniCart={this.state.showMiniCart}
                  onBackdropClick={this.onBackdropClick}
                  addOrRemove={this.addOrRemove}
                  currentCurrency={this.state.currentCurrency}
                  total={this.total()}
                />
              }
            />
          </Routes>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
