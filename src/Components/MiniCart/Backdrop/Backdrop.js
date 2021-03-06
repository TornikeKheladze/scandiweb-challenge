import React, { Component } from "react";
import "./Backdrop.css";

class Backdrop extends Component {
  render() {
    return this.props.show ? (
      <div className="Backdrop" onClick={this.props.click}></div>
    ) : null;
  }
}

export default Backdrop;
