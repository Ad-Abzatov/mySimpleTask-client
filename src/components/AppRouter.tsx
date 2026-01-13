import { Navigate, Route, Routes } from "react-router-dom"
import { HOME_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE } from "../utils/consts";
import Posts from "../pages/Posts";
import Auth from "../pages/Auth";
import Registration from "../pages/Registration";

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
