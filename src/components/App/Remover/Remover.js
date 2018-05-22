import React, { Component } from "react";
import Sortable from "sortablejs";

import "./Remover.css";

class Remover extends Component {
  componentDidMount() {
    Sortable.create(this.ulRef, {
      group: { name: this.props.group },
      onAdd(event) {
        event.item.remove();
      }
    });
  }
  render() {
    return (
      <ul
        ref={(ul) => (this.ulRef = ul)}
        className="Remover fixed-bottom btn btn-danger flaticon-garbage btn-icon delete border-0"
      />
    );
  }
}

export default Remover;
