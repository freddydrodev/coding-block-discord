/* eslint no-eval: 0 */
import React, { Component } from "react";
import { Button } from "antd";
import Discord from "discord.js";
import Sortable from "sortablejs";

import "./App.css";
import SiderLeft from "../../components/App/SiderLeft/SiderLeft.js";
import Canvas from "../../components/App/Canvas/Canvas.js";
import dictionary from "../../dictionary.js";

//menu structure, this could be directly inserted in you database
import menuDB from "../../menu.json";
import { token } from "../../config.json";

const client = new Discord.Client(); //create a discord client
client.login(token); //login with my ID

client.on("ready", () => {
  console.log("ready!");
});

class App extends Component {
  componentDidMount() {
    const keys = Object.keys(menuDB);
    const menu = [];

    keys.forEach((key) => {
      menu.push(menuDB[key]);
    });
    this.setState({ menu });
  }
  state = {
    //token, clientID, botname will be store in a constant
    serie: [], //serie to initiate actions
    group: "code-block-event", //required
    menu: [], //fetch from firebase,
    output: [], //the string value stored in an array
    error: "" // in case of error
  };

  //make the canvas ul sortable
  dropperSortable = () => {
    const { group } = this.state;
    const canvasDropperItems = document.querySelectorAll(
      ".Canvas-dropper-item"
    );

    //make the canvas dropper sortable
    [...canvasDropperItems].forEach((ul) => {
      const self = this;

      //apply in each item
      Sortable.create(ul, {
        group: { name: group },
        onClone(event) {
          self.dropperSortable();
          event.item.classList.remove("bounceIn");
        },
        onSort(event) {
          self.activeNestableElements();
          if (event.to.classList.contains("Canvas-dropper-item")) {
            if (event.from.classList.contains("Canvas-dropper-item")) {
              if (self.hasChild(event.from)) {
              }
            }
            if (self.hasChild(event.to)) {
            }
          }
          event.item.classList.add("bounceIn");
        }
      });
    });
  };

  hasChild = (el) => {
    if (el.children.length > 0) {
      el.classList.add("with-children");
      return true;
    } else {
      el.classList.remove("with-children");
      return false;
    }
  };

  activeNestableElements = () => {
    const self = this;
    const nestable = document.querySelectorAll(".Canvas .blockCode-children");

    //make container nestable
    [...nestable].forEach((el) => {
      Sortable.create(el, {
        group: { name: this.state.group },
        onSort() {
          self.activeNestableElements();
        },
        onClone(event) {
          event.item.classList.add("bounceIn");
        }
      });
    });
  };

  run = (e) => {
    //serialize when run button is clicked
    this.serializer();
  };

  serializer = () => {
    const canvas = document.querySelector(".Canvas");
    const cols = canvas.children;
    const lisArrays = [...cols].map((col) => {
      const ul = [...col.children][0]; //a col contain 1 ul
      return [...ul.children]; //return the lis
    });

    const lis = lisArrays.reduce((a, b) => {
      a = [...a, ...b];
      return a;
    });

    //parse the node to an understandable format
    const serie = this._parser(lis);
    //convert the serie to an array of strings
    const output = this._runParser(serie);
    // console.log(lis);
    // console.log(serie);
    // console.log(output);

    //set the state
    this.setState({ serie, output }, () => {
      // then check if no error on execution
      try {
        console.log(this.state.output.join(" "));

        eval(this.state.output.join(" "));
        this.setState({ error: "" });
      } catch (e) {
        console.log(e);
        this.setState({ error: e });
      }
    });
  };

  _parser = (lis) => {
    let output = [];

    //check if the lis exist
    if (lis) {
      //loop throught the HTML ulsList
      output = [...lis]
        .map((li) => {
          //if the element is a blockCode then we go on
          if (li.classList.contains("blockCode")) {
            //het the action rliated to this blockCode
            const { action } = li.dataset;
            //to store the values
            let values = [];
            //loop through the children and find out the blockCode-children
            //liement this is only possible for container liement
            const containers = [...li.children]
              .map((child) => {
                //return the element only if it is a nestable element
                if (child.classList.contains("blockCode-children")) {
                  return child;
                }
                //if the element is a form control then we push the value
                //in the values array
                else if (child.classList.contains("blockCode-data")) {
                  values.push(
                    [...child.querySelectorAll(".form-control")].map((ctrl) => {
                      return ctrl.value;
                    })
                  );
                  values = values.filter((val) => val.length > 0 && val);
                }
              })
              //we remove undefined fields
              .filter((res) => res && res);

            //if this element has some containers
            //it can has some nested children tehn we need to apply
            //the parser to them too
            if (containers.length > 0) {
              //check if this element has a value
              const _return =
                values.length > 0 ? { action, values } : { action };
              //return the data for this element
              return {
                ..._return,
                children: [...containers].map((el) => {
                  const { children } = el;
                  if (children.length > 0) {
                    return { children: this._parser(children) };
                  }
                })
              };
            }
            //return the correct data
            return values.length > 0 ? { action, values } : { action };
          }
        })
        //remove undefined field from the return array
        //we just keep the blockCode element
        .filter((el) => el && el);
    }
    return output;
  };

  _runParser = (node, parentData) => {
    let func = null;

    //loop through the array and get the data
    func = node.map((child) => {
      if (child) {
        //get the necessary data
        const { action, children, values } = child;

        //apply event base on action
        switch (action) {
          case "ifStatement":
            return dictionary.ifStatement(this._runParser(children));
            break;
          case "string":
            return dictionary.string(values[0][0]);
            break;
          case "number":
            return dictionary.number(values[0][0]);
            break;
          case "equalOperator":
            return dictionary.equalOperator(this._runParser(children));
            break;
          case "onMsg":
            return dictionary.onMsg(this._runParser(children));
            break;
          case "sendMsg":
            return dictionary.sendMsg(values[0][0]);
            break;
          case "msgChildren":
            return dictionary.msgChildren(values[0][0]);
            break;
          case "consoleStatement":
            return dictionary.consoleStatement(values[0][0], values[0][1]);
            break;
          default:
            return children && this._runParser(children);
            break;
        }
      }
    });
    return func;
  };

  render() {
    const { group, menu, output, error, serie } = this.state;
    return (
      <div className="App">
        <div className="d-flex">
          <SiderLeft
            menu={menu}
            group={group}
            dropperSortable={this.dropperSortable}
          />
          <Canvas
            group={group}
            serie={serie}
            run={this.run}
            output={output}
            error={error}
          />
          {/* <SiderPreview
            group={group}
            run={this.run}
            output={output}
            error={error}
          /> */}
          {/* <Remover group={group} /> */}
        </div>
      </div>
    );
  }
}

export default App;
