import React, { useState } from 'react';
import DeleteIcon from '@material-ui/icons/DeleteOutline';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import './Item.css';

function Item({ item, index, onClickEdit, onDeleteClick}) {
  const [editing, setEditing] = useState(false);
  const [editedTextValue, setEditedTextValue] = useState(item.text);
  const [editedSumValue, setEditedSumValue] = useState(item.sum);

  return (
    <div className="item" id={item._id}>
      { editing ? <p>
          <input
            type="text"
            className="editText"
            value={editedTextValue}
            onChange={event => setEditedTextValue(event.target.value)}
          />
          <input
            type="number"
            className="editSum"
            value={editedSumValue}
            onChange={event => setEditedSumValue(event.target.value)}
          />
          <span className="buttons">
            <IconButton onClick={() => {
              onClickEdit( item, editedTextValue, editedSumValue );
              setEditing(false);
            }}>
              <DoneOutlineIcon />
            </IconButton>
            <IconButton onClick={() => onDeleteClick(item)}>
              <DeleteIcon />
            </IconButton>
          </span>
        </p> :
        <p>
          <span id={`text_${item._id}`} className="text">
            {index}) {item.text} {item.date}
          </span>
          <span id={`sum_${item._id}`} className="sum">
            {item.sum} р.
            <span className="buttons">
              <IconButton onClick={() => setEditing(true)}>
                <EditIcon />
              </IconButton>
              <IconButton onClick={onDeleteClick}>
                <DeleteIcon />
              </IconButton>
            </span>
          </span>
        </p> }
    </div>
  );
}

export default Item;
