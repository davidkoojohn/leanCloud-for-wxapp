const AV = require('../utils/av-weapp')

class Todo extends AV.Object {}

AV.Object.register(Todo);

module.exports = Todo;
