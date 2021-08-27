import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import Expense from '../Expense/Expense';
import User from '../User/User';
import './App.css';

function App() {

  return (
    <Router>
      <div className="wrap">
        <Route path='/expense' component={Expense} />
        <Route path='/' exact component={User} />
      </div>
    </Router>
  );
}

export default App;
