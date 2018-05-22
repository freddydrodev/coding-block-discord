import React, { Component } from "react";
import $ from "jquery";
import PerfectScrollbar from "perfect-scrollbar";

import CanvasDropper from "./CanvasDropper/CanvasDropper.js";
import "./Canvas.css";

class Canvas extends Component {
  state = {
    count: 0
  };

  componentDidMount() {
    $(function() {
      $('[data-toggle="tooltip"]').tooltip();
    });

    this.ps = new PerfectScrollbar(this.cvs, {});
  }

  add = () => {
    let count = this.state.count;
    count++;
    this.ps.update();
    this.setState({ count });
  };

  tutorial = () => {};

  clear = () => {
    this.setState({ count: 0 });
  };

  render() {
    const list = [];
    for (var i = 0; i < this.state.count; i++) {
      list.push(<CanvasDropper key={i} />);
    }

    return (
      <div
        ref={(cvs) => (this.cvs = cvs)}
        className="Canvas dropper row m-0 d-flex flex-row flex-nowrap p-3"
      >
        <div className={`Canvas-btns fixed-bottom p-4`}>
          <button
            className={`btn btn-warning rounded-circle`}
            data-toggle="tooltip"
            data-placement="top"
            title="Quick Tutorial"
            onClick={this.tutorial}
          >
            <span className="flaticon-light-bulb" />
          </button>
          <button
            data-toggle="tooltip"
            data-placement="top"
            title="Clear Canvas"
            className={`btn btn-danger rounded-circle`}
            onClick={this.clear}
          >
            <span className="flaticon-interface-1" />
          </button>
          <button
            data-toggle="tooltip"
            data-placement="top"
            title={"Run Code"}
            className={`btn btn-success rounded-circle`}
            onClick={this.props.run}
          >
            <span className="flaticon-arrows-2" />
          </button>
          <button
            data-toggle="tooltip"
            data-placement="top"
            title="Add Container"
            className={`btn btn-primary rounded-circle`}
            onClick={this.add}
          >
            <span className="flaticon-plus" />
          </button>
        </div>
        {list}
      </div>
    );
  }
}

export default Canvas;
