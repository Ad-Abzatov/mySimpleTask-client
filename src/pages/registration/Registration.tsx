import { Link, useNavigate } from "react-router-dom";
import { LOGIN_ROUTE } from "../utils/consts";
import { useState } from "react";
import axios from "axios";

const Registration = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(LOGIN_ROUTE)
  }

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:5000/api/user/registration', {login: login, password: password});
      if (response) {
        console.log('Пользлватель зарегистрирован', response.data)
        navigate(LOGIN_ROUTE);
      }
    } catch (error) {
      console.log('Ошибка:', error);
      throw error;
    }
  }

  return (
    <div className='Registration'>
      <div>
        <h4 className="headLabel">Регистрация</h4>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="registration">Логин</label>
          <input id="registration" type="text" value={login} onChange={(e) => setLogin(e.target.value)} required />
        </div>
        <div>
          <label htmlFor="password">Пароль</label>
          <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button className="userFormButton">Зарегистрироваться</button>
        <Link to={LOGIN_ROUTE}>Вход</Link>
      </form>
    </div>
  )
}

export default Registration
