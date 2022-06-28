import React, { Component } from "react";
import { Link } from "react-router-dom";
import Backdrop from "./Backdrop/Backdrop";
import "./MiniCart.css";

class MiniCart extends Component {
  render() {
    if (this.props.cartData.length === 0) {
      return (
        <>
          <Backdrop
            show={this.props.showMiniCart}
            click={this.props.onBackdropClick}
          />
          <div id="emptyBag">
            <h2 className="MiniCart" id="empty">
              Bag is Empty
            </h2>
          </div>
        </>
      );
    }

    return (
      <>
        <Backdrop
          show={this.props.showMiniCart}
          click={this.props.onBackdropClick}
        />
        <div className="MiniCart">
          <h3>My Bag: {this.props.cartData.length} items</h3>
          {this.props.cartData.map((item, index) => {
            return (
              <div className="item" key={index}>
                <div className="itemInfo">
                  {item.product.name}
                  {item.attributes ? (
                    <div className="Minicart-attributes">
                      {item.product.attributes.map((att, i) => {
                        return (
                          <div className="Minicart-atts" key={i}>
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
                <div className="rightSideofMinicart">
                  <div
                    className="addOrRemove"
                    onClick={(e) => this.props.addOrRemove(e, index)}
                  >
                    <button>+</button>
                    <p>{item.itemAmount}</p>
                    <button>-</button>
                  </div>
                  <img className="MiniCart-img" src={item.product.gallery[0]} />
                </div>
              </div>
            );
          })}

          <h3 className="totalMoney">
            <span> {this.props.total}</span>
            <span>{this.props.currentCurrency.label}</span>
            <span>{this.props.currentCurrency.symbol}</span>
          </h3>
          <div className="bag-checkout">
            <Link to={"/cart"}>
              <button onClick={this.props.onViewBagClick}>View Bag</button>
            </Link>
            <button className="check">Checkout</button>
          </div>
        </div>
      </>
    );
  }
}

export default MiniCart;
