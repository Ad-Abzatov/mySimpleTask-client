import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import "./styles/global.css"

const App = () => {

  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  )
}

export default App;
