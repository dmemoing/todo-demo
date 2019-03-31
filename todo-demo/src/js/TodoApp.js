import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Header from './Header';
import TodoList from './TodoList';
import Footer from './Footer';
import * as Api from '../Api';
import '../css/app.css';

const ENTER_KEY = 13;

class TodoApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      newTodo: '',
      todos: [],
    };
  }

  componentDidMount() {
    Api.getAllTodos().then(res => this.setState({ todos: res.data }));
  }

  handleChange(event) {
    this.setState({ newTodo: event.target.value });
  }

  async handleNewTodoKeyDown(event) {
    if (event.keyCode !== ENTER_KEY) {
      return;
    }
    event.preventDefault();

    let val = this.state.newTodo.trim();
    if (val) {
      let newTodo = {
        title: val,
        completed: false
      };
      await Api.addTodo(newTodo);
      let res = await Api.getAllTodos();
      this.setState({
        newTodo: '',
        todos: res.data
      })
    }
  }

  async toggle(todoToggle) {
    let todo = Object.assign({}, todoToggle, { completed: !todoToggle.completed });
    await Api.editTodo(todo);
    let res = await Api.getAllTodos();
    this.setState({
      todos: res.data
    });
  }

  async destroy(todoDestroy) {
    await Api.deleteTodo(todoDestroy);
    let res = await Api.getAllTodos();
    this.setState({
      todos: res.data
    })
  }

  async save(todoSave, val) {
    let todo = Object.assign({}, todoSave, { title: val });
    await Api.editTodo(todo);
    let res = await Api.getAllTodos();
    this.setState({
      todos: res.data
    });
  }

  async clearCompleted() {
    let todos = this.state.todos.slice();
    for(let todo of todos){
      if(todo.completed){
        await Api.deleteTodo(todo);
      }
    }
    let res = await Api.getAllTodos();
    this.setState({
      todos: res.data
    })
  }

  render() {
    const todos = this.state.todos;
    const activeCount = todos.reduce((acNum, todo) => {
      return todo.completed ? acNum : acNum + 1;
    }, 0);
    const completedCount = todos.length - activeCount;

    let footer = null;
    if (activeCount || completedCount) {
      footer = (
        <Footer
          count={activeCount}
          completedCount={completedCount}
          onClearCompleted={this.clearCompleted.bind(this)}
        />
      );
    }
    return (
      <section className='todoapp'>
        <Header
          value={this.state.newTodo}
          handleKeyDown={this.handleNewTodoKeyDown.bind(this)}
          handleChange={this.handleChange.bind(this)}
        />
        <section className='main'>
          <Router>
            <Switch>
              <Route
                path='/active'
                render={props => (
                  <TodoList
                    {...props}
                    todos={this.state.todos}
                    toggle={this.toggle.bind(this)}
                    save={this.save.bind(this)}
                    destroy={this.destroy.bind(this)}
                    nowShowing='active'
                  />
                )}
              />
              <Route
                path='/completed'
                render={props => (
                  <TodoList
                    {...props}
                    todos={this.state.todos}
                    toggle={this.toggle.bind(this)}
                    save={this.save.bind(this)}
                    destroy={this.destroy.bind(this)}
                    nowShowing='completed'
                  />
                )}
              />
              <Route
                path='/'
                render={props => (
                  <TodoList
                    {...props}
                    todos={this.state.todos}
                    toggle={this.toggle.bind(this)}
                    save={this.save.bind(this)}
                    destroy={this.destroy.bind(this)}
                    nowShowing='all'
                  />
                )}
              />
            </Switch>
            {footer}
          </Router>
        </section>
      </section>
    )
  }
}

export default TodoApp;
