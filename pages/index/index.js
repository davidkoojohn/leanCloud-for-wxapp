const AV = require('../../utils/av-weapp-min')
const Todo = require('../../model/todo')

Page({
  data: {
    todo: ''
  },

  updateTodo: function ({
    detail: {
      value
    }
  }) {
    this.setData({
      todo: value
    })
  },

  addTodo: function () {
    new Todo({
      content: this.data.todo,
      done: false
    }).save()
      .then(console.log)
      .catch(console.error)
  }
})
