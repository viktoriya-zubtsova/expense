import React from 'react';
import './InputItem.css';

function InputItem({ onButtonClick, firstValue, secondValue, setFirstValue, setSecondValue}) {
  return (
    <div>
      <form className="inputForm">
        <p>Куда было потрачено:<br/>
          <input
            id="firstInput"
            type="text"
            placeholder="Куда было потрачено"
            value={firstValue}
            onChange={event => setFirstValue(event.target.value)}
          />
        </p>
        <p>Сколько было потрачено:<br/>
          <input
            id="secondInput"
            type="number"
            placeholder="Сколько было потрачено"
            value={secondValue}
            onChange={event => setSecondValue(event.target.value)}
          />
        </p>
        <input
          className="button"
          type="button"
          value="Добавить"
          onClick={() => onButtonClick(firstValue, secondValue)}
        />
      </form>
    </div>
  );
}

export default InputItem;
