import React, { Component } from "react";

import "./SiderPreview.css";

class SiderPreview extends Component {
  state = {
    code: ""
  };

  render() {
    const { error, output } = this.props;

    return (
      <div className="preview text-center">
        <h1>Preview</h1>
        <div id="serialize_output2">{error.toString() || output.join(" ")}</div>
        <button
          onClick={this.props.run}
          className="btn btn-success fixed-bottom right px-4 m-1"
        >
          Run
        </button>
        {/* <button onClick={this.check} className="btn btn-info fixed-bottom right px-4 m-1 check-btn">
          Check
        </button> */}
      </div>
    );
  }
}

export default SiderPreview;
