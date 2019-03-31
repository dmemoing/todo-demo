import React from 'react';

function Header(props) {
  return (
    <header className='header'>
      <h1>todos</h1>
      <input
        className='new-todo'
        placeholder='What do you want to do?'
        value={props.value}
        onKeyDown={props.handleKeyDown}
        onChange={props.handleChange}
        autoFocus={true}
      />
    </header>
  );
}

export default Header;