import AppWrapper from "../containers/AppWrapper/AppWrapper";
import LogWrapper from "../containers/LogWrapper/LogWrapper.js";
import PageWrapper from "../containers/PageWrapper/PageWrapper.js";

const routes = [
  {
    path: "/app",
    component: AppWrapper
  },
  {
    path: "/about",
    component: PageWrapper
  },
  {
    path: "*",
    component: LogWrapper
  }
];

export default routes;
