const router = require('koa-router')()
const Todo = require('../model/Todo');

router.get('/todos', async (ctx, next) => {
  let todos = await Todo.find();
  ctx.body = todos;
})

router.post('/todo', async (ctx, next) => {
  const todo = ctx.request.body;
  // console.log(todo);
  const todoData = new Todo(todo);
  try {
    await todoData.save();
    ctx.body = {success: true};
  } catch (err) {
    ctx.throw(500, err);
  }
})

router.put('/todo', async (ctx, next) => {
  let todo = ctx.request.body;
  try {
    await Todo.update({ _id: todo._id }, todo);
    ctx.body = {success: true};
  } catch (err) {
    ctx.throw(500, err);
  }
})

router.del('/todo/:id', async (ctx, next) => {
  let todo_id = ctx.params.id;
  try {
    await Todo.remove({ _id: todo_id });
    ctx.body = {success: true};
  } catch (err) {
    ctx.throw(500, err);
  }
})

module.exports = router
