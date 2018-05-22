import React, { Component } from "react";
import Sortable from "sortablejs";

import BlockCode from "../../../Boxes/BlockCode/BlockCode.js";
import CanvasDropper from "../../Canvas/CanvasDropper/CanvasDropper.js";

class Menu extends Component {
  componentDidMount() {
    const { group, dropperSortable } = this.props;
    const self = this;

    Sortable.create(this.ulRef, {
      sort: false,
      group: { name: group, pull: "clone", put: false },
      onEnd(event) {
        if (event.from !== event.to) {
          event.item.classList.add("bounceIn");
          [...document.querySelectorAll(".Canvas .blockCode-delete")].forEach(
            (el) => {
              el.addEventListener("click", self.delete, false);
            }
          );
        }
      },
      onClone(event) {
        dropperSortable();
        const canvas = document.querySelector(".Canvas");
        if (canvas.children.length) {
        } else {
          canvas.appendChild(CanvasDropper);
        }
      }
    });
  }

  delete = (e) => {
    const li = e.currentTarget.parentNode.parentNode;
    const ul = li.parentNode;
    if(ul){
      li.remove();
      if (ul.children.length <= 0) {
        ul.classList.remove("with-children");
      }
    }
  };

  render() {
    const { title, content, group } = this.props;
    const _id = title
      .toLowerCase()
      .split(" ")
      .join("-");
    return (
      <div className="Menu card border-0 rounded-0">
        <div
          className="card-header bg-transparent border-0 p-0"
          id={`heading-${_id}`}
        >
          <h5 className="mb-0">
            <button
              className="btn btn-block rounded-0 text-left collapsed"
              data-toggle="collapse"
              data-target={`#collapse-${_id}`}
              aria-expanded="false"
              aria-controls={`collapse-${_id}`}
            >
              {title || "No title"}
            </button>
          </h5>
        </div>
        <div
          id={`collapse-${_id}`}
          className="collapse"
          aria-labelledby={`heading-${_id}`}
          data-parent="#accordion"
        >
          <div className="card-body">
            <ul className="code-block-list" ref={(ul) => (this.ulRef = ul)}>
              {content &&
                content.map((el) => (
                  <BlockCode group={group} {...el} key={el.title} />
                ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Menu;
