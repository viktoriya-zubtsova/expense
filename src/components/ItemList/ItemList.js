import React from 'react';
import Item from '../Item/Item';
import './ItemList.css';

function ItemList({ items, onClickEdit, onDeleteClick }) {
  return (
    <ol className="list">
      {items.map((item, index) => (
        <li key={item._id}>
          <Item
            index={index + 1}
            item={item}
            onClickEdit={onClickEdit}
            onDeleteClick={() => onDeleteClick(item)}
          />
        </li>
      ))}
    </ol>
  );
}

export default ItemList;
