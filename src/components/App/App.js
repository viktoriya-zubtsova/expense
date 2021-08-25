import React, { useState, useEffect} from 'react';
import InputItem from '../InputItem/InputItem';
import ItemList from '../ItemList/ItemList';
import ItemsClient from '../../api/ItemsClient';
import './App.css';

function App() {
  const [items, setItems] = useState([]);
  const [firstValue, setFirstValue] = useState('');
  const [secondValue, setSecondValue] = useState('');

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    try {
      const response = await ItemsClient.getItems();
      setItems(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const onButtonClick = async () => {
    try {
      const result = await ItemsClient.postItem(firstValue, secondValue);
      setItems([...items, result]);
      setFirstValue('');
      setSecondValue('');
    } catch (err) {
      console.log(err);
    }
  };

  const onClickEdit = async ( item, editedTextValue, editedSumValue ) => {
    try {
      const result = await ItemsClient.patchItem(item, editedTextValue, editedSumValue);
      const newItems = [...items];
      const editedItem = newItems.find(item => item._id === result._id);
      editedItem.text = result.body.text;
      editedItem.sum = +result.body.sum;
      setItems(newItems);
    } catch (err) {
      console.log(err);
    }
  };

  const onDeleteClick = async (item) => {
    try {
      const result = await ItemsClient.deleteItem(item);
      const newItems = items.filter(item => item._id !== result._id);
      setItems(newItems);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="wrap">
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
