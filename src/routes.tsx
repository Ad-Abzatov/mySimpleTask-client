import Auth from "./pages/personal/Auth";
import Registration from "./pages/personal/Registration";
import Posts from "./pages/posts/Posts";
import { HOME_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE } from "./utils/consts";

export const routes = [
  {
    path: LOGIN_ROUTE,
    Component: Auth,
  },
  {
    path: REGISTRATION_ROUTE,
    Component: Registration,
  },
  {
    path: HOME_ROUTE,
    Component: Posts,
  }
]