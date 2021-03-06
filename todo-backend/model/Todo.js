const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
  title: String,
  completed: Boolean,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Todo', TodoSchema);
