import axios from 'axios';

const server_address = "http://localhost:3030";

export const getAllTodos = () => {
  return axios.get(server_address + '/todos');
}

export const addTodo = (todo) => {
  return axios.post(server_address + '/todo', todo);
} 

export const deleteTodo = (todo) => {
  return axios.delete(server_address + `/todo/${todo._id}`);
}

export const editTodo = (todo) => {
  return axios.put(server_address + '/todo', todo);
}