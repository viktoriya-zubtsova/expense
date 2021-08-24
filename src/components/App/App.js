import React, { useState, useEffect} from 'react';
import InputItem from '../InputItem/InputItem';
import ItemList from '../ItemList/ItemList';
import styles from './App.module.css';

function App() {
  const [items, setItems] = useState([]);
  const [firstValue, setFirstValue] = useState('');
  const [secondValue, setSecondValue] = useState(0);

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    try {
      const response = await fetch('http://localhost:8000/items', {
        method: 'GET'
      });
      let result = await response.json();
      setItems(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  const onButtonClick = async () => {
    try {
      const response = await fetch('http://localhost:8000/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify({
          text: firstValue,
          sum: secondValue,
          date: new Date().toLocaleString('ru', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric'
          })
        })
      });
      const result = await response.json();
      setItems([...items, result]);
      setFirstValue('');
      setSecondValue('');
    } catch (err) {
      console.log(err);
    }
  };

  const onClickEdit = async ( item, editedTextValue, editedSumValue ) => {
    try {
      await fetch(`http://localhost:8000/items/${item._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify({
          text: editedTextValue,
          sum: editedSumValue,
          date: item.date
        })
      });

      const response = await fetch('http://localhost:8000/items', {
        method: 'GET'
      });
      let result = await response.json();
      setItems(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  const onDeleteClick = async (item) => {
    try {
      await fetch(`http://localhost:8000/items/${item._id}`, {
        method: 'DELETE'
      });
      const response = await fetch('http://localhost:8000/items', {
        method: 'GET'
      });
      let result = await response.json();
      setItems(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.wrap}>
      <h1 className={styles.title}>Учёт моих расходов</h1>
      <InputItem
        onButtonClick={onButtonClick}
        firstValue={firstValue}
        secondValue={secondValue}
        setFirstValue={setFirstValue}
        setSecondValue={setSecondValue}
      />
      <p className={styles.total}>Итого: {items.reduce((acc, item) => acc + item.sum, 0)} р.</p>
      <ItemList
        items={items}
        onClickEdit={onClickEdit}
        onDeleteClick={onDeleteClick}
      />
    </div>
  );
}

export default App;