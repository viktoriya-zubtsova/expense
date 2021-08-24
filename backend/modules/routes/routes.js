const express = require('express');
const router = express.Router();

const {
  getAllItems,
  createNewItem,
  changeItemInfo,
  deleteItem
} = require('../controllers/item.controller');

router.get('/items', getAllItems);
router.post('/items', createNewItem);
router.patch('/items/:id', changeItemInfo);
router.delete('/items/:id', deleteItem);

module.exports = router;
