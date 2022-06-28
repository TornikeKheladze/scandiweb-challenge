import React, { Component } from "react";
import { getCategories } from "../../API";
import "./Nav.css";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";

class Nav extends Component {
  state = { categories: [] };
  componentDidMount() {
    getCategories
      .then((res) => res.json())
      .then(({ data }) => this.setState({ categories: data.categories }));
  }

  render() {
    let navBtnStyle = null;
    return (
      <div className="Nav">
        <nav>
          <div className="Nav-catButtons">
            {this.state.categories.map((cat) => {
              if (cat.name === this.props.category) {
                navBtnStyle = { borderBottom: "2px solid #5ece7b" };
              } else {
                navBtnStyle = null;
              }
              return (
                <button
                  style={navBtnStyle}
                  className="Nav-category"
                  key={cat.name}
                  onClick={() => this.props.categoryClick(cat.name)}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>
          <Link to="/">
            <svg src="arrow.png"></svg>
          </Link>
          <div>
            <div style={{ display: "inline-block" }}>
              <select
                onChange={this.props.currenciesClicked}
                name="currencies"
                id="currencies"
              >
                {this.props.currencies.map((x) => (
                  <option value={x.label} key={x.label}>
                    {x.symbol}
                    {x.label}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={this.props.onMiniCartCLicked}
              className="MiniCart-btn"
            >
              <span className="totalAmount">{this.props.amount}</span>
              <FaShoppingCart />
            </button>
          </div>
        </nav>
      </div>
    );
  }
}

export default Nav;
