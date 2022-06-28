import React, { Component } from "react";
import "./Cart.css";

class Cart extends Component {
  render() {
    return (
      <>
        <div className="Cart">
          <h3>Cart</h3>
          {this.props.cartData.map((item, index) => {
            return (
              <div className="Cart-item" key={index}>
                <div className="Cart-itemInfo">
                  <h2> {item.product.name}</h2>
                  {item.attributes ? (
                    <div className="Cart-attributes">
                      {item.product.attributes.map((att, i) => {
                        return (
                          <div className="Cart-atts" key={i}>
                            <p>{att.id}:</p>
                            <div>
                              {att.items.map((it) => {
                                if (
                                  it.displayValue ===
                                  item.attributes[item.product.id][att.id]
                                    .displayValue
                                ) {
                                  if (att.id === "Color") {
                                    return (
                                      <span
                                        style={{
                                          backgroundColor: it.value,
                                          fontSize: 0,
                                          width: "30px",
                                          height: "20px",
                                          boxShadow: " 0px 0px 0px 3px green",
                                          WebkitBoxBhadow:
                                            "0px 0px 0px 3px green",
                                          MozBoxShadow: "0px 0px 0px 3px green",
                                        }}
                                        key={it.id}
                                      ></span>
                                    );
                                  } else {
                                    return (
                                      <span
                                        style={{
                                          backgroundColor: "black",
                                          color: "white",
                                        }}
                                        key={it.id}
                                      >
                                        {it.displayValue}
                                      </span>
                                    );
                                  }
                                }
                                if (att.id === "Color") {
                                  return (
                                    <span
                                      key={it.id}
                                      style={{
                                        backgroundColor: it.value,

                                        width: "30px",
                                        height: "20px",
                                      }}
                                    ></span>
                                  );
                                } else {
                                  return (
                                    <span key={it.id}>{it.displayValue}</span>
                                  );
                                }
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : null}
                </div>
                <div className="Cart-rightSideofCart">
                  <div
                    className="Cart-addOrRemove"
                    onClick={(e) => this.props.addOrRemove(e, index)}
                  >
                    <button>+</button>
                    <p>{item.itemAmount}</p>
                    <button>-</button>
                  </div>
                  <img className="Cart-img" src={item.product.gallery[0]} />
                </div>
              </div>
            );
          })}
          <div className="Cart-taxTotal">
            <h3>
              Tax 21%:{(this.props.total * 0.21).toFixed(2)}
              {this.props.currentCurrency.symbol}
            </h3>
            <h3>Quantity: {this.props.amount}</h3>
            <h3 className="Cart-totalMoney">
              <span> {this.props.total}</span>

              <span>{this.props.currentCurrency.symbol}</span>
            </h3>
            <button className="Cart-check">Checkout</button>
          </div>
        </div>
      </>
    );
  }
}

export default Cart;
