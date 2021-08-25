const BASE_URL = 'https://infinite-temple-24050.herokuapp.com';

class ItemsClient {
  static async getItems() {
    try {
      const response = await fetch(`${BASE_URL}/items`, {
        method: 'GET'
      });
      return await response.json();
    } catch (err) {
      console.log(err);
    }
  };

  static async postItem(firstValue, secondValue) {
    try {
      const response = await fetch(`${BASE_URL}/items`, {
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
      return await response.json();
    } catch (err) {
      console.log(err);
    }
  };

  static async patchItem(item, editedTextValue, editedSumValue) {
    try {
      const response = await fetch(`${BASE_URL}/items/${item._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify({
          text: editedTextValue,
          sum: editedSumValue
        })
      });
      return await response.json();
    } catch (err) {
      console.log(err);
    }
  };

  static async deleteItem(item) {
    try {
      const response = await fetch(`${BASE_URL}/items/${item._id}`, {
        method: 'DELETE'
      });
      return await response.json();
    } catch (err) {
      console.log(err);
    }
  };

}

export default ItemsClient;
