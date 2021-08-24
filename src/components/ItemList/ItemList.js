import React from 'react';
import Item from '../Item/Item';
import styles from './ItemList.module.css';

function ItemList({ items, onClickEdit, onDeleteClick }) {

  return (
    <ol className={styles.list}>
      {items.map((item, index) => (
        <li key={item._id}>
          <Item
            index={index + 1}
            item={item}
            onClickEdit={onClickEdit}
            onDeleteClick={onDeleteClick}
          />
        </li>
      ))}
    </ol>
  );
}

export default ItemList;
