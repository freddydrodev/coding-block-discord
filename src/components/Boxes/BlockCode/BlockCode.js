import React, { Component } from "react";

import "./BlockCode.css";

class BlockCode extends Component {

  render() {
    const {
      icon,
      title,
      action,
      formControlChange,
      container,
      input
    } = this.props;

    let containers = null;
    let inputs = null;

    if (container) {
      if (Array.isArray(container)) {
        containers = container.map((el, index) => {
          const _label = el.label ? el.label : false;

          return (
            <div
              key={_label || index}
              className={`blockCode-children`}
              data-draggable={el.item}
            >
              {_label && (
                <span className="blockCode-container-label">{_label}</span>
              )}
            </div>
          );
        });
      } else {
        containers = <div className={`blockCode-children`} />;
      }
    }

    if (input) {
      if (Array.isArray(input)) {
        inputs = input.map((el, index) => {
          const { type, data } = el;
          if (type) {
            if (type === "select") {
              return (
                <select
                  className={`form-control`}
                  key={`${action}-${index}`}
                  onChange={formControlChange}
                >
                  {Array.isArray(data) &&
                    data.map((opt) => {
                      return (
                        <option key={opt.value} value={opt.value}>
                          {opt.name}
                        </option>
                      );
                    })}
                </select>
              );
            } else {
              return (
                <input
                  key={`${action}-${index}`}
                  type={type}
                  className={`form-control`}
                  placeholder="enter the value here"
                />
              );
            }
          }

          return (
            <input
              key={`${action}-${index}`}
              className={`form-control`}
              placeholder="enter the value here"
            />
          );
        });
      } else {
        inputs = (
          <input
            className={`form-control`}
            placeholder="enter the value here"
          />
        );
      }
    }

    return (
      <li
        className={`blockCode`}
        data-action={action}
        data-container={container}
        ref={(li) => (this.li = li)}
      >
        <div className={`d-flex blockCode-header justify-content-between`}>
          {icon && (
            <div className={`blockCode-icon`}>
              <span className={`flaticon-code-signs`} />
            </div>
          )}
          <p className={`blockBlock-title text-capitalize`}>{title}</p>
          <button
            className={`btn rounded-0 bg-transparent text-white blockCode-delete`}
          >
            <span className={`flaticon-close`} />
          </button>
        </div>
        {inputs && <div className={`blockCode-data`}>{inputs}</div>}
        {containers}
      </li>
    );
  }
}

export default BlockCode;
