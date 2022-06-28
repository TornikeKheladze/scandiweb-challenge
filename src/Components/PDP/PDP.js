import React, { Component } from "react";
import "./PDP.css";

class PDP extends Component {
  state = {
    photo: null,
  };

  onPhotoClick = (url) => {
    this.setState({ photo: url });
  };

  render() {
    let cur = null;
    if (this.props.pagedata) {
      cur = this.props.pagedata.data.product.prices.find((x) => {
        return x.currency.label === this.props.currentCurrency.label;
      });
    }

    let info = null;
    let description = null;
    let attrib = null;
    if (this.props.pagedata) {
      description = this.props.pagedata.data.product.description.split(">");
      if (description.length !== 1) {
        description = description[1].split("<")[0];
      } else {
        description = description[0];
      }
      const boxShadow = {
        boxShadow: " 0px 0px 0px 3px rgba(2,112,2,1)",
        WebkitBoxBhadow: "0px 0px 0px 3px rgba(2,112,2,1)",
        MozBoxShadow: "0px 0px 0px 3px rgba(2,112,2,1)",
      };
      info = (
        <div className="info">
          <h1>{this.props.pagedata.data.product.name}</h1>
          {this.props.pagedata.data.product.attributes.map((x, i) => (
            <div key={i}>
              <h3>{x.name}:</h3>
              <div className="attributes">
                {x.items.map((item, index) => {
                  if (this.props.chosenAttributes) {
                    if (
                      this.props.chosenAttributes[
                        this.props.pagedata.data.product.id
                      ][x.id]
                    ) {
                      if (
                        item.displayValue ===
                        this.props.chosenAttributes[
                          this.props.pagedata.data.product.id
                        ][x.id].displayValue
                      ) {
                        attrib = boxShadow;
                      } else {
                        attrib = null;
                      }
                    }
                  }
                  return (
                    <button
                      // {!this.props.pagedata.data.product.inStock? disabled:null}
                      disabled={!this.props.pagedata.data.product.inStock}
                      key={index}
                      onClick={() =>
                        this.props.attributeClick(
                          item,
                          x,
                          this.props.pagedata.data.product
                        )
                      }
                      style={
                        x.id === "Color"
                          ? {
                              backgroundColor: `${item.displayValue}`,
                              color: `${item.displayValue}`,
                              width: "30px",
                              height: "20px",
                              fontSize: "0",
                              ...attrib,
                            }
                          : { ...attrib }
                      }
                    >
                      {item.displayValue}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
          <h3>
            PRICE:
            <p>
              <span>{cur.amount}</span>
              <span>{cur.currency.label}</span>
              <span>{cur.currency.symbol}</span>
            </p>
          </h3>
          <p>{description}</p>
          <button
            disabled={!this.props.pagedata.data.product.inStock}
            className="PDP-addToCart"
            onClick={this.props.addToCart}
          >
            ADD TO CART
          </button>
        </div>
      );
    }

    let page = null;
    if (this.props.pagedata) {
      page = (
        <div className="PDP">
          <div className="photos">
            {this.props.pagedata.data.product.gallery.length !== 1
              ? this.props.pagedata.data.product.gallery.map((x) => (
                  <img src={x} key={x} onClick={() => this.onPhotoClick(x)} />
                ))
              : null}
          </div>
          {this.state.photo ? (
            <img src={this.state.photo} className="displayed" />
          ) : (
            <img
              src={this.props.pagedata.data.product.gallery[0]}
              className="displayed"
            />
          )}
          {info}
        </div>
      );
    }
    return <>{page}</>;
  }
}

export default PDP;
