const BASE_URL = 'http://localhost:8000';
// 'https://infinite-temple-24050.herokuapp.com';

class UserClient {
  static async regUser(regUserName, regUserPassword) {
    try {
      const response = await fetch(`${BASE_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify({
          login: regUserName,
          password: regUserPassword
          })
        });
      return await response.json();
    } catch (err) {
      console.log(err);
    }
  };
  static async loginUser(logInUsername, logInUserPassword) {
    try {
      const response = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify({
          login: logInUsername,
          password: logInUserPassword
        })
      });
      return await response.json();
    } catch (err) {
      console.log(err);
    }
  };
}

export default UserClient;
