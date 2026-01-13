import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import AuthButton from "./components/LogoutButton";

const App = () => {

  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  )
}

export default App;
