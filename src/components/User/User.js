import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Checkbox from '@material-ui/core/Checkbox';
import UserClient from '../../api/UserClient';
import './User.css';

function User() {
  const [logIn, setLogIn] = useState(true);
  const [logInUsername, setLogInUsername] = useState('');
  const [logInUserPassword, setLogInUserPassword] = useState('');
  const [regUserName, setRegUserName] = useState('');
  const [regUserPassword, setRegUserPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const history = useHistory();

  const checkPasswords = (regUserName, regUserPassword, repeatPassword) => {
    if (regUserPassword === repeatPassword) {
      onRegisterUser(regUserName, regUserPassword);
    } else {
      alert('Пароль и проверочный пароль не совпадают, попробуй ещё раз');
    }
  }

  const onRegisterUser = async (regUserName, regUserPassword) => {
    try {
      await UserClient.regUser(regUserName, regUserPassword);
    } catch (err) {
      console.log(err);
    }
  };

  const onLoginUser = async (logInUserName, logInUserPassword) => {
    try {
      const result = await UserClient.loginUser(logInUserName, logInUserPassword);
      localStorage.setItem('token', result.token);
      localStorage.setItem('user', result.login);
      history.push('/expense');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      Я уже зарегистрирован
      <Checkbox
        color="default"
        checked={logIn}
        onClick={() => setLogIn(!logIn)}
      /><br/>
      { logIn
        ? <form className="userForm">
          <input
            placeholder="Логин"
            type="text"
            className="userInput"
            value={logInUsername}
            onChange={event => setLogInUsername(event.target.value)}
          /><br/>
          <input
            placeholder="Пароль"
            type="password"
            className="userInput"
            value={logInUserPassword}
            onChange={event => setLogInUserPassword(event.target.value)}
          /><br/>
          <input
            type="button"
            className="userButton"
            value={'Войти'}
            onClick={() => onLoginUser(logInUsername, logInUserPassword)
            }
          />
        </form>
        : <form className="userForm">
          <input
            placeholder="Логин"
            type="text"
            className="userInput"
            value={regUserName}
            onChange={event => setRegUserName(event.target.value)}
          /><br/>
          <input
            placeholder="Пароль"
            type="password"
            className="userInput"
            value={regUserPassword}
            onChange={event => setRegUserPassword(event.target.value)}
          /><br/>
          <input
            placeholder="Пароль ещё раз"
            type="password"
            className="userInput"
            value={repeatPassword}
            onChange={event => setRepeatPassword(event.target.value)}
          /><br/>
          <input
            type="button"
            className="userButton"
            value={'Зарегистрироваться'}
            onClick={() => {
              checkPasswords(regUserName, regUserPassword, repeatPassword);
              setRegUserName('');
              setRegUserPassword('');
              setRepeatPassword('');
            }}
          />
        </form> }
    </div>
  );
}

export default User;
