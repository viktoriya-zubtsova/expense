import React, { useState, useEffect} from 'react';
import Expense from '../Expense/Expense';
import InputItem from '../InputItem/InputItem';
import ItemList from '../ItemList/ItemList';
import User from '../User/User';
import ItemsClient from '../../api/ItemsClient';
import UserClient from '../../api/UserClient';
import './App.css';

function App() {
  const [items, setItems] = useState([]);
  const [firstValue, setFirstValue] = useState('');
  const [secondValue, setSecondValue] = useState('');
  const [user, setUser] = useState('');
  const token = localStorage.getItem('token') || '';

  useEffect(() => {
    init();
  }, []);

  const init = async (token) => {
    try {
      const response = await ItemsClient.getItems(token);
      setItems(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const onButtonClick = async (firstValue, secondValue, token) => {
    try {
      const result = await ItemsClient.postItem(firstValue, secondValue, token);
      setItems([...items, result]);
      setFirstValue('');
      setSecondValue('');
    } catch (err) {
      console.log(err);
    }
  };

  const onClickEdit = async (item, editedTextValue, editedSumValue, token) => {
    try {
      const result = await ItemsClient.patchItem(item, editedTextValue, editedSumValue, token);
      const newItems = [...items];
      const editedItem = newItems.find(item => item._id === result._id);
      editedItem.text = result.body.text;
      editedItem.sum = +result.body.sum;
      setItems(newItems);
    } catch (err) {
      console.log(err);
    }
  };

  const onDeleteClick = async (item, token) => {
    try {
      const result = await ItemsClient.deleteItem(item, token);
      const newItems = items.filter(item => item._id !== result._id);
      setItems(newItems);
    } catch (err) {
      console.log(err);
    }
  };

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
      setUser(result.login);
      localStorage.setItem('token', result.token);
      localStorage.setItem('user', result.login);
      // go to main screen
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="wrap">
      { user
      ? <p className="userLogin">Выполнен вход под логином {user}.</p>
      :<User
          onRegisterUser={onRegisterUser}
          onLoginUser={onLoginUser}
        /> }
      <h1 className="title">Учёт моих расходов</h1>
      <InputItem
        onButtonClick={onButtonClick}
        firstValue={firstValue}
        secondValue={secondValue}
        setFirstValue={setFirstValue}
        setSecondValue={setSecondValue}
      />
      <p className="total">Итого: {items.reduce((acc, item) => acc + item.sum, 0)} р.</p>
      <ItemList
        items={items}
        onClickEdit={onClickEdit}
        onDeleteClick={onDeleteClick}
      />
    </div>
  );
}

export default App;
