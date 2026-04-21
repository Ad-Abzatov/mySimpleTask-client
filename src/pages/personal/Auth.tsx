import { Link, useNavigate } from "react-router-dom"
import { HOME_ROUTE, REGISTRATION_ROUTE } from "../../utils/consts"
import React, { useState } from "react";
import axios from "axios";
import "./Personal.css";
import toast from "react-hot-toast";

interface AxiosErrorResponse {
  response?: {
    status: number;
    data?: { message: string };
  };
  message: string;
}

const Auth = () => {
  const navigate = useNavigate();

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState('');
  const [inputError, setInputError] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setAuthError('');

    try {
      const userData = {login, password};
      const response = await axios.post('http://localhost:5000/api/user/login', userData);
      if (response.data && response.data.token) {
        localStorage.setItem('Bearer', response.data.token);
        navigate(HOME_ROUTE);
        return;
      }

      alert('Ошибка авторизации');

    } catch (error: unknown) {
      const axiosError = error as AxiosErrorResponse;
      const errorMsg = axiosError.response?.data?.message || 'Ошибка';
      setAuthError(errorMsg);
      console.log('Ошибка:', axiosError.response?.data);
      // alert(errorMsg);
      console.log(errorMsg);
      setInputError('Error');
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
          <input className={`${inputError}`} id="login" type="text"  value={login} onChange={(e) => setLogin(e.target.value)} required />
        </div>
        <div>
          <label htmlFor="password">Пароль</label>
          <input className={`${inputError}`} id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <span style={{color:'red'}}>{authError}</span>
        </div>
        <button className="userFormButton">{loading ? 'Вход...' : 'Войти'}</button>
        <Link to={REGISTRATION_ROUTE}>Регистрация</Link>
      </form>
    </div>
  )
}

export default Auth
