import React from "react";
import ReactDOM from "react-dom";
// import jQuery from "jquery";

//import the css before to be able to change it
import "perfect-scrollbar/css/perfect-scrollbar.css"; //for scrollbar
import "bootstrap/dist/css/bootstrap.min.css"; //to implement the bootstrap design
import "bootstrap/dist/js/bootstrap.min.js"; //to initial bootstrap animation
import "animate.css/animate.min.css"; //for the bounce animation and more
import "./stylesheets/index.css"; //base design
import App from "./pages/App/App.js"; // system itself
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
