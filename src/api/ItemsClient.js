const BASE_URL ='https://infinite-temple-24050.herokuapp.com';
const token = localStorage.getItem('token') || '';

class ItemsClient {
  static async getItems(token) {
    try {
      const response = await fetch(`${BASE_URL}/items`, {
        method: 'GET',
        headers: {
          'authorization': 'Bearer ' + token
        }
      });
      return await response.json();
    } catch (err) {
      console.log(err);
    }
  };

  static async postItem( text, sum ) {
    try {
      const date = new Date().toLocaleString('ru', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric'
      });
      const response = await fetch(`${BASE_URL}/items`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
          text,
          sum,
          date
        })
      });
      return await response.json();;
    } catch (err) {
      console.log('qqqqqq', err);
    }
  };

  static async patchItem(item, editedTextValue, editedSumValue) {
    try {
      const response = await fetch(`${BASE_URL}/items/${item._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
          text: editedTextValue,
          sum: editedSumValue
        })
      });
      const a = await response.json();
      console.log(123, a)
      return a;
    } catch (err) {
      console.log(err);
    }
  };

  static async deleteItem(item) {
    try {
      const response = await fetch(`${BASE_URL}/items/${item._id}`, {
        method: 'DELETE',
        headers: {
          'authorization': 'Bearer ' + token
        }
      });
      return await response.json();
    } catch (err) {
      console.log(err);
    }
  };

}

export default ItemsClient;
