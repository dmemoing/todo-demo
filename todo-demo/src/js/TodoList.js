import React from 'react';
import TodoItem from './TodoItem';
import '../css/todoList.css';

function TodoList(props) {
  const showTodos = props.todos.filter((todo) => {
    switch (props.nowShowing) {
      case 'active':
        return !todo.completed;
      case 'completed':
        return todo.completed;
      case 'all':
      default:
        return true;
    }
  })
  const todoItems = showTodos.map((todo) => {
    return (
      <TodoItem
        key={todo._id}
        todo={todo}
        onToggle={() => props.toggle(todo)}
        onDestroy={() => props.destroy(todo)}
        onSave={(val) => props.save(todo, val)}
      />
    );
  });

  return (
    <ul className='todo-list'>
      {todoItems}
    </ul>
  );
}

export default TodoList;