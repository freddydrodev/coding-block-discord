import Registration from "../pages/Registration/Registration.js";
import Login from "../pages/Login/Login.js";
import PasswordForget from "../pages/PasswordForget/PasswordForget.js";

const routes = [
  {
    path: "/registration",
    component: Registration
  },
  {
    path: "/passwordForget",
    component: PasswordForget
  },
  {
    path: "/",
    component: Login
  }
];

export default routes;