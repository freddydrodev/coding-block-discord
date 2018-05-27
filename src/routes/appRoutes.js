import Profile from "../pages/Profile/Profile.js";
import Projects from "../pages/Projects/Projects.js";
import App from "../pages/App/App.js";
import PageNotFound from "../pages/PageNotFound/PageNotFound.js";

const routes = [
  {
    path: "/app",
    component: PageNotFound,
    exact: true
  },
  {
    path: "/app/:username/projects",
    components: Projects
  },
  {
    path: "/app/:username/:project",
    component: App
  },
  {
    path: "/app/:username",
    component: Profile,
    exact: true
  }
];

export default routes;
