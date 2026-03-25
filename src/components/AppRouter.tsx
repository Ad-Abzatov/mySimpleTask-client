import { Navigate, Route, Routes } from "react-router-dom"
import { HOME_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE } from "../utils/consts";
import Posts from "../pages/posts/Posts";
import Auth from "../pages/personal/Auth";
import Registration from "../pages/personal/Registration";

const AppRouter = () => {
  return (
    <Routes>
      <Route path={LOGIN_ROUTE} element={<Auth />} />
      <Route path={REGISTRATION_ROUTE} element={<Registration />} />
      <Route path={HOME_ROUTE} element={<Posts />} />
      <Route path='*' element={<Auth />} />
      {/* <Navigate to={HOME_ROUTE} /> */}
    </Routes>
  )
}

export default AppRouter
