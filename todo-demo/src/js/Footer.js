import React from 'react';
import { NavLink } from "react-router-dom";
import '../css/footer.css';

function Footer(props) {
  let clearButton = null;
  if (props.completedCount > 0) {
    clearButton = (
      <button
        className='clear-completed'
        onClick={props.onClearCompleted}
      >
        Clear completed
        </button>
    );
  }

  return (
    <footer className='footer'>
      <span className='todo-count'>
        <strong>{props.count}</strong>{props.count !== 1 ? 'items' : 'item'} left
        </span>
      <ul className='filters'>
        <li><NavLink exact to='/' activeClassName="selected">All</NavLink></li>
        {' '}
        <li><NavLink to='/active' activeClassName="selected">Active</NavLink></li>
        {' '}
        <li><NavLink to='/completed' activeClassName="selected">Completed</NavLink></li>
      </ul>
      {clearButton}
    </footer>
  );
}

export default Footer;