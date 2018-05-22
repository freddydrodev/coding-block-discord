import React, { Component } from "react";

import "./SiderLeft.css";
import Menu from "./Menu/Menu.js";
import PerfectScrollbar from "perfect-scrollbar";

class SiderLeft extends Component {
  componentDidMount() {
    this.ps = new PerfectScrollbar(this.sider, { suppressScrollX: true });
  }

  render() {
    const { menu, group, dropperSortable } = this.props;
    return (
      <div className="sider" ref={(sider) => (this.sider = sider)}>
        <div id="accordion">
          {menu &&
            menu.map((item, index) => (
              <Menu
                key={item.title || index}
                title={item.title}
                content={item.content}
                category={menu[index].title}
                group={group}
                dropperSortable={dropperSortable}
              />
            ))}
        </div>
      </div>
    );
  }
}

export default SiderLeft;
