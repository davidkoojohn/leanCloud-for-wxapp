const AV = require('../../utils/av-weapp-min')
const Todo = require('../../model/todo')

Page({
  data: {
    todo: '',
    list: []
  },

  onReady: function () {
    new AV.Query(Todo)
      .find()
      .then( list => this.setData({
        list
      }))
      .catch(console.error)
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
      .then(console.log('success'))
      .catch(console.error)
  }
})
