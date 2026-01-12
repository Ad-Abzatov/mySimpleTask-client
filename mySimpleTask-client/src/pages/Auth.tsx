import { Link, useNavigate } from "react-router-dom"
import { HOME_ROUTE, REGISTRATION_ROUTE } from "../utils/consts"
import '../styles.css'
import React, { useState } from "react";
import axios from "axios";

const Auth = () => {
  const navigate = useNavigate();

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');

    try {
      const userData = {login, password};
      const response = await axios.post('http://localhost:5000/api/user/login', userData);
      if (response.data && response.data.token) {
        localStorage.setItem('Bearer', response.data.token);
        navigate(HOME_ROUTE);
      }
    } catch (error) {
      console.log('Ошибка:', error);
      throw error;
    }
  }

  return (
    <div className='Login'>
      <div>
        <h4 className="headLabel">Войти</h4>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="login">Логин</label>
          <input id="login" type="text"  value={login} onChange={(e) => setLogin(e.target.value)} required />
        </div>
        <div>
          <label htmlFor="password">Пароль</label>
          <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button className="userFormButton">Войти</button>
        <Link to={REGISTRATION_ROUTE}>Регистрация</Link>
      </form>
    </div>
  )
}

export default Auth
