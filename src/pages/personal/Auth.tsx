import { Link, useNavigate } from "react-router-dom"
import { HOME_ROUTE, REGISTRATION_ROUTE } from "../../utils/consts"
import React, { useState } from "react";
import axios from "axios";
import "./Personal.css";
import toast from "react-hot-toast";

const Auth = () => {
  const navigate = useNavigate();

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setAuthError('');
    setLoading(true);

    try {
      const userData = {login, password};
      const response = await axios.post('http://localhost:5000/api/user/login', userData);
      if (response.data && response.data.token) {
        localStorage.setItem('Bearer', response.data.token);
        navigate(HOME_ROUTE);
        return;
      }

      setAuthError('Ошибка авторизации');
      toast.error(authError);

    } catch (error: any) {
      console.log('Ошибка:', error.response.data);
      setAuthError(error.response.data.message);
      alert(authError);
      console.log(authError);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='Login'>
      <div>
        <h4 className="headLabel">Вход</h4>
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
        <button className="userFormButton">{loading ? 'Вход...' : 'Войти'}</button>
        <Link to={REGISTRATION_ROUTE}>Регистрация</Link>
      </form>
    </div>
  )
}

export default Auth
