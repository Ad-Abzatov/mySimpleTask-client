import { useNavigate } from "react-router-dom";
import { LOGIN_ROUTE } from "../utils/consts";
import { jwtDecode } from "jwt-decode";

interface LoginField {
  login: string
}

const getLoginId = () => {
  let decodedToken;
  const token = localStorage.getItem('Bearer');
  if (typeof token === 'string') {
    decodedToken = jwtDecode(token);
  }
  const {login} = decodedToken as LoginField
  return login
}

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('Bearer');
    navigate(LOGIN_ROUTE);
    console.log('Вы вышли');
  };

  return (
    <div className="LogoutButton">
      <div className="HelloUser">
        Привет, {getLoginId()}
      </div>
      <div className="ButtonBlock">
        <button className="ButtonOut" onClick={handleLogout}>
          Выйти
        </button>
      </div>
    </div>
  )
}

export default LogoutButton
